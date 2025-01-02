import { Router, Request, Response } from "express";
import { userService, } from "../services/UserService";

const userRouter = Router();

// *** CREATE: Add a new user ***
userRouter.post("/user", async (req: Request, res: Response) => {
  const { name, email, age } = req.body;
  try {
    // validate input
    const checkName = name && typeof name === 'string';
    const checkEmail = email && typeof email === 'string';
    const checkAge = age && typeof age === 'number';
    const isValid = checkName && checkEmail && checkAge;

    if (!isValid) {
      res.status(400).json({ error: 'Wrong body' });
    }

    const user = await userService.createUser({ name, email, age });
    res.status(201).json(user);
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
    const user = await userService.getUserById(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// *** READ: Get a posts by user ID ***
userRouter.get("/:id/posts", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
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

// *** UPDATE: Update a user by ID ***
userRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const user = await userService.updateUserByyId(id, { name, email, age });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// *** DELETE: Delete a user by ID ***
userRouter.delete("/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const message = await userService.deleteUser(id);
    res.json(message);
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