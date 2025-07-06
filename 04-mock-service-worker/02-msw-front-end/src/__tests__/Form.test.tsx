import { render , screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "../components/Form";


export const getFormElements = () => {
  return {
    inputElement: screen.getByRole("textbox" ,{ name: /title/i}),
    button: screen.getByRole("button" ,{ name: /add post/i}),
  }
}

describe('Form Component', () => {
  const mockOnSubmit = vi.fn();

  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup();
    mockOnSubmit.mockClear();
    render(<Form  onSubmit={mockOnSubmit} />)
  })

  test('renders correctly' , () => {
    const { inputElement , button } = getFormElements();
    expect(inputElement).toHaveValue('');
    expect(button).toBeInTheDocument();
  })

  test('updates input value on change' , async() => {
    const { inputElement } = getFormElements();
    await user.type(inputElement , 'New Post');
    expect(inputElement).toHaveValue('New Post');

  })

  test('required title input before submission', async () => {
    const { button } = getFormElements();
    await user.click(button);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  })

  test('submits the form with correct data' , async () => {
    const { inputElement , button } = getFormElements();

    await user.type(inputElement , 'New Post');
    await user.click(button);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({ likes: 0 , title: 'New Post'}  )
  })

  test('clears input field after submission' , async () => {
    const { inputElement , button } = getFormElements();
    await user.type(inputElement , 'New Post');
    await user.click(button);
    expect(inputElement).toHaveValue('');
  })

})