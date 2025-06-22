import { render , screen } from "@testing-library/react";
import { Item } from "../../utils";
import List from "../List";

vi.mock('../components/ItemCard' , () => {
  return {default: () => <article>item Card</article> }
})

describe("List Component" , () => {
    const mockItems: Item[] = [
    {
      id: '1',
      title: 'Test Item 1',
      description: 'Content 1',
      category: 'urgent',
    },
    {
      id: '2',
      title: 'Test Item 2',
      description: 'Content 2',
      category: 'normal',
    },
  ];
  const mockOnDelete = vi.fn();

  test('renders the flow board heading' , () => {
    render( <List items={mockItems} onDelete={mockOnDelete} />)
    expect(screen.getByRole('heading' , {level: 2 , name: 'Flow Board'})).toBeInTheDocument()
  })
})