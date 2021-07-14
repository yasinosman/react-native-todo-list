import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
	children?: JSX.Element | string;
	completed?: boolean;
	toggleTodo: () => void;
	deleteTodo: () => void;
};

const Todo: React.FC<Props> = ({ children, completed, toggleTodo, deleteTodo }) => {
	return (
		<TouchableOpacity onPress={toggleTodo}>
			<View style={[styles.todoContainer, completed && styles.completedView]}>
				<View style={styles.todoLeft}>
					<TouchableOpacity onPress={toggleTodo}>
						<View style={[styles.toggleTodo, completed && styles.completedToggle]}>
							<Text> {completed ? "✔" : ""} </Text>
						</View>
					</TouchableOpacity>
					<Text style={[styles.todoText, completed ? styles.completedText : null]}>{children}</Text>
				</View>
				<TouchableOpacity onPress={deleteTodo}>
					<View style={styles.deleteTodo}>
						<Text>🗑</Text>
					</View>
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	todoContainer: {
		backgroundColor: "#FFF",
		padding: 15,
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	todoLeft: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
	},
	todoText: {
		maxWidth: "90%",
	},
	completedView: {
		backgroundColor: "#D8D8D8",
	},
	completedText: {
		textDecorationLine: "line-through",
		textDecorationStyle: "solid",
	},
	completedToggle: {
		backgroundColor: "#92F3A8",
	},
	toggleTodo: {
		width: 24,
		height: 24,
		backgroundColor: "#55BCF6",
		opacity: 0.4,
		borderRadius: 5,
		marginRight: 15,
		textAlign: "center",
		lineHeight: 24,
	},
	deleteTodo: {
		width: 24,
		height: 24,
	},
});

export default Todo;
