import { Router, Request, Response } from "express";
import { StatusEnum, postService, } from "../services/PostService";
import { body, validationResult } from 'express-validator';

const postRouter = Router();

// *** VALIDATE CREATE Post 
export const createPostValidation = [
  body('authorId', 'Invalid field: name required').not().isEmpty(),
  body('authorId', 'Invalid field: name mast be string').isNumeric(),
  body('title', 'Invalid field: title required').not().isEmpty(),
  body('title', 'Invalid field: title mast be string').isString(),
  body('content', 'Invalid field: content required').not().isEmpty(),
  body('content', 'Invalid field: content mast be string').isString(),
  body('status', 'Invalid field: status required').not().isEmpty(),
  body('status', 'Invalid field: status mast be Enum').notEmpty()
    .isIn([StatusEnum.archived, StatusEnum.draft, StatusEnum.published]),
]

// *** CREATE: Add a new post ***
postRouter.post("/", createPostValidation, async (req: Request, res: Response) => {
  try {
    const {
      authorId,
      title,
      content,
      status,
    } = req.body;

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      const post = await postService.createPost({
        authorId,
        title,
        content,
        status,
      });

      res.status(200).json(post);
      return
    }

    res.status(400).json({ errors: errors.array() });
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


// *** VALIDATE UPDATE User 
export const putPostValidation = [
  body('authorId', 'Invalid field: name mast be string').optional().isString(),
  body('title', 'Invalid field: title mast be string').optional().isString(),
  body('content', 'Invalid field: content mast be string').optional().isString(),
  body('status', 'Invalid field: status mast be string').optional()
    .isIn([StatusEnum.archived, StatusEnum.draft, StatusEnum.published]),
]

// *** UPDATE: Update a user by ID ***
postRouter.put("/:id", putPostValidation, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { authorId, title, content, status } = req.body;
  try {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      await postService.updatePostById(id, { authorId, title, content, status });

      res.status(200).json({ status: "Updated", id });
      return
    }

    res.status(422).json({ errors: errors.array() })
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