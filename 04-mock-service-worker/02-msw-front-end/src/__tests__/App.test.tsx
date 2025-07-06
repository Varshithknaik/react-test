import { render, screen, within } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { getFormElements } from "./Form.test";
import { b } from "vitest/dist/chunks/suite.BMWOKiTe.js";
import { posts } from "../mocks/handlers";

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
});
