import { render, screen } from '@testing-library/react';
import { describe, test, vi } from 'vitest';
import ItemCard from '../ItemCard';
import { Item } from '../../utils';
import userEvent from '@testing-library/user-event';


type MockProps = Item & { onDelete: () => void };

describe('ItemCard Component', () => {
  const mockProps: MockProps = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    category: 'urgent',
    onDelete: vi.fn(),
  };


  test('renders card with correct content', () => {
    render(<ItemCard {...mockProps}/>)
    expect(screen.getByRole('heading', { name: /test task/i}));
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('urgent')).toBeInTheDocument();

  })

  test('calls onDelete when delete button is clicked', async () => {
    const user = userEvent.setup()
   
    render(<ItemCard {...mockProps}/>)
    const deleteButton = screen.getByRole('button', { name: /delete/i })
    expect(deleteButton).toBeInTheDocument()
    await user.click(deleteButton)
    expect(mockProps.onDelete).toHaveBeenCalledTimes(1)
  })
})