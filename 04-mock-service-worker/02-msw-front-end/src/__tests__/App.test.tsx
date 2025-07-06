import { render, screen, within } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { getFormElements } from "./Form.test";
import {
  posts,
  getErrorHandler,
  createErrorHandler,
  updateErrorHandler,
  deleteErrorHandler,
} from "../mocks/handlers";
import server from "../mocks/server";

describe("App Component", () => {
  test("renders the App component", () => {
    render(<App />);
    expect(screen.getByText(/posts manager/i)).toBeInTheDocument();
  });

  test("fetches posts on mounts", async () => {
    render(<App />);
    expect(await screen.findByText(/first post/i)).toBeInTheDocument();
    expect(await screen.findByText(/second post/i)).toBeInTheDocument();
  });

  test("create an new post", async () => {
    const user = userEvent.setup();
    render(<App />);

    const { inputElement, button } = getFormElements();
    await user.type(inputElement, "New Posts");
    await user.click(button);

    expect(await screen.findByText(/new posts/i)).toBeInTheDocument();
  });
  test("update post", async () => {
    const user = userEvent.setup();
    render(<App />);

    const likeBtn = await screen.findByRole("button", {
      name: `👍 ${posts[0].likes}`,
    });
    await user.click(likeBtn);

    expect(
      await screen.findByRole("button", {
        name: `👍 ${posts[0].likes}`,
      })
    ).toBeInTheDocument();
  });
  test("deletes the posts", async () => {
    const user = userEvent.setup();
    render(<App />);

    const initialPosts = await screen.findAllByRole("article");
    expect(initialPosts).toHaveLength(3);
    const lastPost = initialPosts[2];
    const deleteBtn = within(lastPost).getByRole("button", { name: /delete/i });

    await user.click(deleteBtn);
    const postsAfterDelete = await screen.findAllByRole("article");
    expect(postsAfterDelete).toHaveLength(2);
  });

  test("shows error message when fetching posts fails", async () => {
    server.use(...getErrorHandler);
    render(<App />);
    expect(
      await screen.findByText(/failed to fetch posts/i)
    ).toBeInTheDocument();
  });

  test("shows error message when creting posts fails", async () => {
    server.use(...createErrorHandler);
    const user = userEvent.setup();
    render(<App />);

    const { inputElement, button } = getFormElements();
    await user.type(inputElement, "New Posts");
    await user.click(button);

    expect(
      await screen.findByText(/failed to create post/i)
    ).toBeInTheDocument();
  });

  test("shows error message when updating posts fails", async () => {
    server.use(...updateErrorHandler);
    const user = userEvent.setup();
    render(<App />);

    const likeBtn = await screen.findByRole("button", {
      name: `👍 ${posts[0].likes}`,
    });
    await user.click(likeBtn);

    expect(await screen.findByText(/Failed to like post/i)).toBeInTheDocument();
  });
  test("displays error message when deleting post fails", async () => {
    const user = userEvent.setup();
    server.use(...deleteErrorHandler);
    render(<App />);

    const allPosts = await screen.findAllByRole("article");
    const firstPost = allPosts[0];
    const deleteBtn = within(firstPost).getByRole("button", {
      name: /delete/i,
    });

    await user.click(deleteBtn);

    expect(
      await screen.findByText("Failed to delete post")
    ).toBeInTheDocument();
  });
});
