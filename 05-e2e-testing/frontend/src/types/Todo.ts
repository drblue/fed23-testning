export type Todo = {
	id: number;
	title: string;
	completed: boolean;
};

export type TodoData = Omit<Todo, "id">;
