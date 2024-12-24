import { Router, Request, Response } from "express";
import { StatusEnum, postService, } from "../services/PostService";

const postRouter = Router();

// *** CREATE: Add a new post ***
postRouter.post("/post", async (req: Request, res: Response) => {
  const {
    authorId,
    title,
    content,
    status,
  } = req.body;

  // validate input
  const checkAuthorId = authorId && typeof authorId === 'string'
  const checkTitle = title && typeof title === 'string'
  const checkContent = content && typeof content === 'string'

  const checkStatus = status && status === StatusEnum.archived || status === StatusEnum.draft || status === StatusEnum.published

  const isValid = checkAuthorId && checkTitle && checkContent && checkStatus

  if (!isValid) {
    return res.status(400).json({ error: 'Wrong body' });
  }

  try {
    const post = await postService.createPost({
      authorId,
      title,
      content,
      status,
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// *** READ: Get all posts ***
postRouter.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await postService.getAllPosts(req.query);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// *** READ: Get a post by ID ***
postRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await postService.getPostById(id);
    if (!post) {
      res.status(404).json({ error: `Post[${id}] not found` });
      return;
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// *** DELETE: Delete a post by ID ***
postRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const message = await postService.deletePost(id);
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default postRouter;