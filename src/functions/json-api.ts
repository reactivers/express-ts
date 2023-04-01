import axios from "axios";
import { REST_API } from "../utils/constants";
import { IPost, ITodo } from "../utils/types";

export const getTodoById: (id: string) => Promise<ITodo> = async (id) => {
  if (!id) throw new Error("Invalid id");
  const url = `${REST_API}/todos/${id}`;
  const todo = await axios.get<ITodo>(url);
  return todo.data;
};

export const getPostById: (id: string) => Promise<IPost> = async (id) => {
  if (!id) throw new Error("Invalid id");
  const url = `${REST_API}/posts/${id}`;
  const response = await axios.get<IPost>(url);
  return response.data;
};
