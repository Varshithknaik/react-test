import { render , screen } from '@testing-library/react';
import List from '../List';
import { Review } from '../Sandbox';

const mockReviews: Review[] = [
  { email: 'test@example.com', rating: '4', text: 'Great product!'},
  { email: 'user@example.com', rating: '5', text: 'Excellent service!'}
]



describe("List Component", () => {


  // beforeEach(() => {
  //   render(<List reviews={mockReviews} />)
  // })

  test("renders heading", () => {
    render(<List reviews={[]} /> );
    expect(screen.getByRole('heading', { level: 2 , name: /reviews/i })).toBeInTheDocument();

  })

  test("displays 'No Reviews yet' when reviews array is empty", () => {
    render(<List reviews={[]} /> );
    expect(screen.getByText(/no reviews yet/i)).toBeInTheDocument();
  })
    

  test('Renders reviews correctly when provided', () => {
    render(<List reviews={mockReviews} /> );
    mockReviews.forEach((review) => {
      expect(screen.getByText(review.email)).toBeInTheDocument();
      expect(screen.getByText(review.text)).toBeInTheDocument();

      const starts = '⭐'.repeat(Number(review.rating));
      expect(screen.getByText(starts)).toBeInTheDocument();
    })
  })
})