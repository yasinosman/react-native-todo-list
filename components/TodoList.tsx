import React from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import TodoView from "./Todo";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import TodoService from "../api/services/TodoService";
import AsyncStorageStrategy from "../api/services/AsyncStorageStrategy";
import Todo, { ITodo } from "../api/models/Todo";

export default function TodoList() {
	let todoService = new TodoService({ storageStrategy: new AsyncStorageStrategy() });

	const [todoInput, setTodoInput] = React.useState("");
	const [todos, setTodos] = React.useState<Array<ITodo>>([]);

	//Read todos from todo service
	React.useEffect(() => {
		getTodosAndUpdateState();
	}, []);

	const getTodosAndUpdateState = async () => {
		todoService
			.getAllTodos()
			.then((todos: Array<ITodo>) => {
				setTodos(todos);
			})
			.catch((e) => console.log(e));
	};

	const handleAddTodo = () => {
		if (todoInput !== "") {
			Keyboard.dismiss();
			const todo = new Todo({ text: todoInput, isComplete: false, id: uuid() });

			todoService
				.addTodo(todo)
				.catch((e) => {
					console.log(e);
				})
				.finally(() => getTodosAndUpdateState());

			setTodoInput("");
		}
	};

	const handleToggleTodo = (todo: ITodo) => {
		todoService
			.toggleTodo(todo)
			.catch((e) => {
				console.log(e);
			})
			.finally(() => getTodosAndUpdateState());
	};

	const handleDeleteTodo = (todo: ITodo) => {
		todoService
			.deleteTodo(todo)
			.catch((e) => {
				console.log(e);
			})
			.finally(() => getTodosAndUpdateState());
	};

	return (
		<React.Fragment>
			<View style={styles.todos}>
				<ScrollView style={styles.scrollView}>
					{todos.map((todo) => (
						<TodoView
							deleteTodo={() => handleDeleteTodo(todo)}
							key={todo.id}
							toggleTodo={() => handleToggleTodo(todo)}
							completed={todo.isComplete}
						>
							{todo.text}
						</TodoView>
					))}
				</ScrollView>
			</View>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.createTodoContainer}
			>
				<TextInput
					onChangeText={(text) => setTodoInput(text)}
					value={todoInput}
					style={styles.createTodoInput}
					placeholder="Add a Todo"
				></TextInput>
				<TouchableOpacity onPress={() => handleAddTodo()}>
					<View style={styles.submitContainer}>
						<Text style={styles.submitText}>Add</Text>
					</View>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	todos: {
		marginTop: 30,
	},
	scrollView: {
		height: "80%",
	},
	createTodoContainer: {
		position: "absolute",
		bottom: 30,
		left: 15,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	createTodoInput: {
		paddingVertical: 15,
		paddingHorizontal: 15,
		backgroundColor: "#FFF",
		borderRadius: 60,
		borderColor: "#C0C0C0",
		borderWidth: 1,
		width: 250,
	},
	submitContainer: {
		width: 60,
		height: 60,
		backgroundColor: "#FFF",
		borderRadius: 60,
		justifyContent: "center",
		alignItems: "center",
		borderColor: "#C0C0C0",
		borderWidth: 1,
	},
	submitText: {},
});
