import Sandbox from './Sandbox';
import { logRoles, render , screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe('04-user-interactions' , () => {
  test('Screen Debug' , () => {
    const { container } = render(<Sandbox />)
    screen.debug();
    logRoles(container);
  });

  test('should increment and decrement count using fireEvent', async () => {
    render(<Sandbox />);
    const user = userEvent.setup();
    const increaseButton = screen.getByRole('button', { name: 'Increase' });
    const decreaseButton = screen.getByRole('button', { name: 'Decrease' });

    expect(screen.getByText('Count: 0')).toBeInTheDocument();

    await user.click(increaseButton);
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  
    
    await user.click(decreaseButton);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  })

  test('toggles between like and unlike buttons when clicked', async () => {

    render(<Sandbox />);
    const user = userEvent.setup();
    const unlikeButton = screen.getByRole('button', { name: 'unlike button' });
    expect(unlikeButton).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'like button' })).not.toBeInTheDocument();
  
    await user.click(unlikeButton);
    
    expect(screen.queryByRole('button', { name: 'unlike button' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'like button' })).toBeInTheDocument();

  })
})