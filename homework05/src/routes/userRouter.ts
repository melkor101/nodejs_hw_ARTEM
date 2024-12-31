import { Router, Request, Response } from "express";
import { userService, } from "../services/UserService";
import { body, validationResult } from 'express-validator';

const userRouter = Router();

// *** VALIDATE CREATE User 
export const createUserValidation = [
  body('name', 'Invalid field: name required').not().isEmpty(),
  body('email', 'Invalid field: email required').not().isEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('age', 'Invalid field: age required').not().isEmpty(),
  body('age', 'Invalid field: age mast be number').isInt(),
]

// *** CREATE: Add a new user ***
userRouter.post("/", createUserValidation, async (req: Request, res: Response) => {
  const { name, email, age } = req.body;

  try {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      const user = await userService.createUser({ name, email, age });
      res.status(200).json(user);
      return
    }

    res.status(422).json({ errors: errors.array() })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// *** READ: Get all users ***
userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers(req.query);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// *** READ: Get a user by ID ***
userRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!id) {
      res.status(400).json('Wrong request: id required');
      return
    }
    const user = await userService.getUserById(id);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return
    }

    res.status(200).json(user);
    return
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// *** READ: Get a posts by user ID ***
userRouter.get("/:id/posts", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).json('Wrong request: id required');
      return
    }

    const posts = await userService.getPostsByUserId(id) || [];

    if (!posts) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// *** VALIDATE UPDATE User 
export const putUserValidation = [
  body('name', 'Invalid email').optional().isString(),
  body('email', 'Invalid email').optional().isEmail(),
  body('age', 'Invalid field: age mast be number').optional().isInt(),
]

// *** UPDATE: Update a user by ID ***
userRouter.put("/:id", putUserValidation, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      await userService.updateUserByyId(id, { name, email, age });

      res.status(200).json({ status: "Updated", id });
      return
    }

    res.status(422).json({ errors: errors.array() })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// *** DELETE: Delete a user by ID ***
userRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const message = await userService.deleteUser(id);
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default userRouter;