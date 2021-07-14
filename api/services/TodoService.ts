import Todo, { ITodo } from "../models/Todo";
import IStorageStrategy from "./IStorageStrategy";

type TodoServiceParameters = {
	storageStrategy: IStorageStrategy;
};

export default class TodoService {
	private readonly storageStrategy: IStorageStrategy;
	private readonly storageKey: string;

	constructor({ storageStrategy }: TodoServiceParameters) {
		this.storageStrategy = storageStrategy;
		this.storageKey = "ykb-react-native/todos";
	}

	getAllTodos(): Promise<Array<Todo>> {
		return new Promise(async (resolve, reject) => {
			let result: Array<Todo> = [];

			try {
				const res = await this.storageStrategy.get(this.storageKey);

				if (res !== null) {
					const todos = JSON.parse(res);

					todos.forEach((todo: ITodo) => {
						result.push(new Todo({ ...todo }));
					});
				}

				return resolve(result);
			} catch (error) {
				console.log(error);
			} finally {
				return resolve(result);
			}
		});
	}

	addTodo(newTodo: Todo): Promise<Todo> {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await this.storageStrategy.get(this.storageKey);

				const currentTodos = res !== null ? JSON.parse(res) : [];

				currentTodos.push(newTodo);

				await this.storageStrategy.set(this.storageKey, currentTodos);

				return resolve(newTodo);
			} catch (error) {
				return reject(error);
			}
		});
	}

	toggleTodo(todo: Todo): Promise<Todo> {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await this.storageStrategy.get(this.storageKey);

				if (res !== null) {
					const currentTodos = JSON.parse(res);

					const updatedTodos = currentTodos.map((t: ITodo) =>
						t.id === todo.id ? { ...t, isComplete: !t.isComplete } : t
					);

					await this.storageStrategy.set(this.storageKey, updatedTodos);

					return resolve(todo);
				}
			} catch (error) {
				return reject(error);
			}
		});
	}

	deleteTodo(todo: Todo): Promise<Todo> {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await this.storageStrategy.get(this.storageKey);

				if (res !== null) {
					const currentTodos = JSON.parse(res);

					const updatedTodos = currentTodos.filter((t: ITodo) => t.id !== todo.id);

					await this.storageStrategy.set(this.storageKey, updatedTodos);

					return resolve(todo);
				}
			} catch (error) {
				return reject(error);
			}
		});
	}
}
