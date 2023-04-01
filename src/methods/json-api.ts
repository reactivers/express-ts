import type { Request, Response } from "express";
import { getPostById, getTodoById } from "../functions/json-api";
import { getErrorMessage } from "../utils/functions";

export const getTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const todo = await getTodoById(id as string);
    return res.status(200).send(todo);
  } catch (error) {
    return res.status(400).send({
      message: getErrorMessage(error),
      error,
    });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const post = await getPostById(id as string);
    return res.status(200).send(post);
  } catch (error) {
    console.log("Invalid auth token", error);
    return res
      .status(403)
      .send({ message: "Invalid auth token provided.", error });
  }
};
