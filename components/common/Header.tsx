import React from "react";

import { StyleSheet, Text } from "react-native";

type Props = {
	children?: JSX.Element | string;
};

const Header = ({ children }: Props) => {
	return <Text style={styles.header}>{children}</Text>;
};

const styles = StyleSheet.create({
	header: {
		fontSize: 24,
		fontWeight: "bold",
	},
});

export default Header;
