import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "../Form";

export const getFormElements = () => {
  return {
    titleInput: screen.getByRole("textbox", { name: /title/i }),
    descriptionInput: screen.getByRole("textbox", { name: /description/i }),
    categorySelect: screen.getByRole("combobox", { name: /category/i }),
    submitButton: screen.getByRole("button", { name: /add task/i }),
  };
};

describe("Form Component", () => {
  let user: ReturnType<typeof userEvent.setup>;
  const mockOnSubmit = vi.fn();
  beforeEach(() => {
    user = userEvent.setup();
    mockOnSubmit.mockClear();
    render(<Form onSubmit={mockOnSubmit} />);
  });

  it("renders form with empty fields initially", () => {
    const { titleInput, descriptionInput, categorySelect } = getFormElements();

    expect(titleInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
    expect(categorySelect).toHaveValue("");
  });

  test("submit form with entered values", async () => {
    const { titleInput, descriptionInput, categorySelect, submitButton } =
      getFormElements();

    await user.type(titleInput, "Test Title");
    await user.type(descriptionInput, "Test Description");
    await user.selectOptions(categorySelect, "urgent");
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: "Test Title",
      description: "Test Description",
      category: "urgent",
    });
  });

  test('validates required fields', async () => {
    const { submitButton } = getFormElements();
    await user.click(submitButton);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('clears from after successful submission' , async () => {
    const { titleInput , descriptionInput , categorySelect , submitButton} = getFormElements();
    await user.type(titleInput , 'Test Title')
    await user.type(descriptionInput , 'Test Description')
    await user.selectOptions(categorySelect , 'urgent')
    await user.click(submitButton)

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    
    expect(titleInput).toHaveValue('');
    expect(descriptionInput).toHaveValue('');
    expect(categorySelect).toHaveValue('');
  })
});
