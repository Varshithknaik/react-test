import { render , screen } from "@testing-library/react";
import { Post } from "../hooks/usePosts";
import userEvent from "@testing-library/user-event";
import Item from "../components/Item";

const mockPosts: Post =
  { id: '1' , title: 'testing library', likes: 5 }


const mockOnLike = vi.fn();
const mockOnDelete = vi.fn();

describe('Item Component', () => {
  let user: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    user = userEvent.setup();
    vi.clearAllMocks();
    render( <Item post={mockPosts} onLike={mockOnLike} onDelete={mockOnDelete} /> );
  });

  test('renders post title correctly', async () => {
    const titleElement = await screen.findByText('testing library');
    expect(titleElement).toBeInTheDocument();
  })

  test('renders post likes correctly', async () => {
    const likesElement = screen.getByRole('button' , { name: `👍 ${mockPosts.likes}` });
    await user.click(likesElement);
    expect(mockOnLike).toHaveBeenCalledTimes(1);
    expect(mockOnLike).toHaveBeenCalledWith(mockPosts.id);
  })

  test('renders delete button correctly', async () => {
    const deleteButton = screen.getByRole('button' , { name: 'Delete' });
    await user.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(mockPosts.id);
  })

})