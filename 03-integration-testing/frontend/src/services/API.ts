/**
 * THIS IS NOT IN USE AND ONLY FOR DEMONSTRATING
 * THE DIFFERENCE BETWEEN fetch AND axios
 *
 * + some TypeScript haxxing
 */

import axios from "axios";
import { Todo } from "../types/Todo";

const getData = async <T>(url: string) => {
	const res = await axios.get<T>(url);
	return res.data;
}

// @ts-ignore no-unused-vars
const postData = async <ResultType, PayloadType>(url: string, payload: PayloadType) => {
	const res = await axios.patch<ResultType>(url, payload);
	return res.data;
}

// @ts-ignore no-unused-vars
const getTodos = async () => {
//    ^?
	return getData<Todo[]>("http://localhost:3001/todos");
}

// @ts-ignore no-unused-vars
const getTodo = async (id: number) => {
//    ^?
	return getData<Todo>("http://localhost:3001/todos/" + id);
}

// @ts-ignore no-unused-vars
const fetchGetData = async <T>(url: string) => {
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error("I'm no OK");
	}

	const data = await res.json() as T;
	return data;
}

// @ts-ignore no-unused-vars
const fetchPostData = async <ResultType, PayloadType>(url: string, payload: PayloadType) => {
	const res = await fetch(url, { method: "POST", body: JSON.stringify(payload) });

	if (!res.ok) {
		throw new Error("I'm no OK");
	}

	const data = await res.json() as ResultType;
	return data;
}

// @ts-ignore no-unused-vars
const postres = await fetchPostData<Todo, string>("http://localhost:3001/todos", "🤯" );
//      ^?
