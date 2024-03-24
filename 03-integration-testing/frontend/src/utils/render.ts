import { getTodos } from "../functions";
import { Todo } from "../types/Todo";
import { showError } from "./error";

// get and render todos
export const getAndRenderTodos = async () => {
	// get todos
	const result = await getTodos();

	// check if successful
	if (!result.success) {
		// render error
		showError(result.error);
		return;
	}

	// render todos
	renderTodos(result.data);
};

// render output to an HTML element
export const render = (element: HTMLElement, html: string) => {
	element.innerHTML = html;
};

// render todos
export const renderTodos = (todos: Todo[]) => {
	render(
		document.querySelector<HTMLUListElement>("#todos")!,
		transformTodosToHtml(todos)
	);
};

// transform todos to HTML(-string)
export const transformTodosToHtml = (todos: Todo[]) => {
	return todos
		.map((todo) =>
			`<li class="list-group-item todo ${todo.completed ? 'completed' : ''}" data-todo-id="${todo.id}">
				<span class="todo-title">${todo.title}</span>
				${todo.completed
					? '<span class="delete-todo" role="button" title="Delete todo">🗑️</span>'
					: ''
				}
			</li>`
		)
		.join("");
};
