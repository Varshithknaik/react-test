import { render , screen } from "@testing-library/react"
import Sandbox from "./Sandbox"
import userEvent, { UserEvent } from "@testing-library/user-event";

const getFormElements = () => {
  const elements = {
    emailInputElement: screen.getByRole('textbox', { name: /email/i }),
    passwordInputElement: screen.getByLabelText('Password'),
    confirmPasswordInputElement: screen.getByLabelText(/confirm password/i),
    submitButton: screen.getByRole('button', { name: /submit/i }),
  }

  return elements;
}

describe('05-form-testing', () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
    render(<Sandbox />)
  })

  test('inputs shpuld be initially empty', () => {

    const elements = getFormElements();
    expect(elements.emailInputElement).toHaveValue('');
    expect(elements.passwordInputElement).toHaveValue('');
    expect(elements.confirmPasswordInputElement).toHaveValue('');
  })


  test('should be able to type in the inputs', async () => {
    const elements = getFormElements();
    await user.type(elements.emailInputElement , 'test@test.com')
    expect(elements.emailInputElement).toHaveValue('test@test.com');

    await user.type(elements.passwordInputElement , 'test')
    expect(elements.passwordInputElement).toHaveValue('test');

    const confirmPasswordInputElement = screen.getByLabelText('Confirm Password');
    await user.type(confirmPasswordInputElement , 'test')
    expect(confirmPasswordInputElement).toHaveValue('test');
  })

  test("should show email error if email isinvalid" , async () => {
    const { emailInputElement , submitButton  } = getFormElements();
    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();

   await user.type(emailInputElement , 'invalid');
   await user.click(submitButton);

   expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  })

  test("should show password error if password length is less than 5" , async () => {
    const { emailInputElement , submitButton , passwordInputElement } = getFormElements();
    expect(screen.queryByText(/password must be at least 5 characters/i)).not.toBeInTheDocument();

   await user.type(emailInputElement , 'test@test.com');
   await user.type(passwordInputElement , 'abcd');
   await user.click(submitButton);

   expect(screen.getByText(/password must be at least 5 characters/i)).toBeInTheDocument();
  })

  test("should show error if passwords do not match" , async () => {
    const { emailInputElement , submitButton , passwordInputElement , confirmPasswordInputElement } = getFormElements();
    expect(screen.queryByText(/passwords do not match/i)).not.toBeInTheDocument();

   await user.type(emailInputElement , 'test@test.com');
   await user.type(passwordInputElement , 'abcde');
   await user.type(confirmPasswordInputElement , 'abce');

   await user.click(submitButton);

   expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  })

  test("valid inputs show no errors and clear fields " , async () => {
    const { emailInputElement , submitButton , passwordInputElement , confirmPasswordInputElement } = getFormElements();

    await user.type(emailInputElement , 'test@test.com');
    await user.type(passwordInputElement , 'secret');
    await user.type(confirmPasswordInputElement , 'secret');

    await user.click(submitButton);

    expect(emailInputElement).toHaveValue('');
    expect(passwordInputElement).toHaveValue('');
    expect(confirmPasswordInputElement).toHaveValue('');

    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/password must be at least 5 characters/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/passwords do not match/i)).not.toBeInTheDocument();
  })
})