import React from "react";
import { StyleSheet, View } from "react-native";
import TodoList from "./components/TodoList";
import Header from "./components/common/Header";

export default function App() {
	return (
		<View style={styles.container}>
			<Header>Todo List App</Header>
			<TodoList />
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#E8EAED",
		paddingTop: 80,
		paddingHorizontal: 20,
	},
});
