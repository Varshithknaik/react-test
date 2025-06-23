import { render, screen } from "@testing-library/react";
import { FlowProvider } from "../FlowContext";
import AppWithContext from "../AppWithContext";
import userEvent, { UserEvent } from "@testing-library/user-event";

const getFormElements = () => {
  return {
    titleInput: screen.getByRole("textbox", { name: /title/i }),
    descriptionInput: screen.getByRole("textbox", { name: /description/i }),
    categorySelect: screen.getByRole("combobox", { name: /category/i }),
    submitButton: screen.getByRole("button", { name: /add task/i }),
  };
};

const customRenderAppWithContext = () => {
  return render(
    <FlowProvider>
      <AppWithContext />
    </FlowProvider>
  );
};

const addTestItem = async (user: UserEvent) => {
  const { titleInput, descriptionInput, categorySelect, submitButton } =
    getFormElements();

  await user.type(titleInput, "Test Title");
  await user.type(descriptionInput, "Test Content");
  await user.selectOptions(categorySelect, "urgent");
  await user.click(submitButton);
};

describe("AppWithContext", () => {
  let user: UserEvent;

  beforeEach(() => {
    vi.clearAllMocks();
    user = userEvent.setup();
    customRenderAppWithContext();
  });

  test("remders form with empty fields initially", () => {
    expect(
      screen.getByRole("heading", { name: /focus flow/i })
    ).toBeInTheDocument();
    const { titleInput, descriptionInput, categorySelect } = getFormElements();
    expect(titleInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
    expect(categorySelect).toHaveValue("");
  });

  test("handles adding an item", async () => {
    const cardsBefore = screen.queryAllByRole("article");
    expect(cardsBefore).toHaveLength(0);
    await addTestItem(user);

    const cardsAfter = screen.getAllByRole("article");
    expect(cardsAfter).toHaveLength(1);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByText("urgent")).toBeInTheDocument();
  });

  test('handles deleting an item' , async () => {
    await addTestItem(user)
    const cardsBefore = screen.getAllByRole('article')
    expect(cardsBefore).toHaveLength(1)

    const deleteButton = screen.getByRole('button' , { name: /delete/i})
    await user.click(deleteButton)
    const cardsAfter = screen.queryAllByRole('article')
    expect(cardsAfter).toHaveLength(0)      
  })
});
