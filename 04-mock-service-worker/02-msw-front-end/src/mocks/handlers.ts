import { http, HttpResponse } from "msw";
import { type Post } from "../hooks/usePosts";

const url = "http://localhost:4000/posts";

export let posts: Post[] = [
  { id: "1", title: "First Post", likes: 5 },
  { id: "2", title: "Second Post", likes: 10 },
];

export const handlers = [
  http.get(url, async () => {
    return HttpResponse.json(posts);
  }),

  http.post(url, async ({ request }) => {
    const newPost = (await request.json()) as Post;
    newPost.id = Date.now().toString();
    posts.push(newPost);
    return HttpResponse.json(newPost, { status: 201 });
  }),

  http.put(`${url}/:id`, async ({ params, request }) => {
    const { id } = params;

    const updatedPost = (await request.json()) as Post;
    const index = posts.findIndex((post) => post.id === id);
    posts[index] = updatedPost;

    return HttpResponse.json(updatedPost, { status: 201 });
  }),

  http.delete(`${url}/:id`, ({ params }) => {
    const { id } = params;
    posts = posts.filter((post) => post.id !== id);
    return HttpResponse.json(null, { status: 201 });
  }),
];

export const getErrorHandler = [
  http.get(url, () => {
    return HttpResponse.json(
      { message: "failed to fetch posts" },
      { status: 500 }
    );
  }),
];

export const createErrorHandler = [
  http.post(url, () => {
    return HttpResponse.json(
      { message: "failed to create posts" },
      { status: 400 }
    );
  }),
];

export const updateErrorHandler = [
  http.put(`${url}/:id`, () => {
    return HttpResponse.json(
      { message: "failed to update posts" },
      { status: 400 }
    );
  }),
];

export const deleteErrorHandler = [
  http.delete(`${url}/:id`, () => {
    return HttpResponse.json(
      { message: "failed to delete posts" },
      { status: 400 }
    );
  }),
];
