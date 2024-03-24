import { TodoData, Todo } from "./types/Todo";
import { Result } from "./types/Result";
import * as TodoAPI from "./services/TodoAPI";

/**
 * Get all todos
 */
export const getTodos = async (): Promise<Result<Todo[]>> => {
	// get todos
	try {
		let todos = await TodoAPI.getTodos();

		return {
			success: true,
			data: todos,
		};
	} catch (err) {
		return {
			success: false,
			error: "Could not get todos",
		};
	}
};

/**
 * Add a new todo
 *
 * @param title Title of the todo
 */
export const addTodo = async (title: string): Promise<Result<Todo>> => {
	// check if title is empty
	if (title === "") {
		return {
			success: false,
			error: "Title cannot be empty",
		};
	}

	// check if title isn't long enough
	if (title.length < 3) {
		return {
			success: false,
			error: "Title must be at least 3 characters long",
		};
	}

	// create payload
	const newTodo: TodoData = {
		title,
		completed: false,
	};

	// create todo
	try {
		const data = await TodoAPI.createTodo(newTodo);

		return {
			success: true,
			data,
		};
	} catch (err) {
		return {
			success: false,
			error: "Could not create todo",
		};
	}
};

/**
 * Toggle todo completed-status
 *
 * @param id Id of the todo
 */
export const toggleTodo = async (id: number): Promise<Result<Todo>> => {
	let todo: Todo;

	// get todo
	try {
		todo = await TodoAPI.getTodo(id);
	} catch (err) {
		return {
			success: false,
			error: "Todo not found",
		};
	}

	// update todo
	try {
		const data = await TodoAPI.updateTodo(id, {
			completed: !todo.completed,
		});

		return {
			success: true,
			data,
		};
	} catch (err) {
		return {
			success: false,
			error: "Could not update todo",
		};
	}
};

/**
 * Delete todo
 *
 * @param id Id of the todo
 * @param todos Todos-array
 */
export const deleteTodo = async (id: number): Promise<Result> => {
	// delete todo
	try {
		const data = await TodoAPI.deleteTodo(id);

		return {
			success: true,
			data,
		};
	} catch (err) {
		return {
			success: false,
			error: "Could not delete todo",
		};
	}
};
