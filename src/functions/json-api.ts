import { REST_API } from "../utils/constants";
import { fetch } from "../utils/functions";
import { IPost, ITodo } from "../utils/types";

export const getTodoById: (id: string) => Promise<ITodo> = async (id) => {
    if (!id) throw new Error("Invalid id");
    const url = `${REST_API}/todos/${id}`
    const promise = await fetch(url)
    const json: ITodo = await promise.json()
    return json;
}

export const getPostById: (id: string) => Promise<IPost> = async (id) => {
    if (!id) throw new Error("Invalid id");
    const url = `${REST_API}/posts/${id}`
    const promise = await fetch(url)
    const json: IPost = await promise.json()
    return json;
}