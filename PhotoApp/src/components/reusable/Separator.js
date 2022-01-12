import React from "react";
import { View, StyleSheet } from "react-native";
import theme from "../../../assets/themes";

const Separator = () => {
  return <View style={styles.separtor} />;
};

const styles = StyleSheet.create({
  separtor: {
    marginTop: theme.spacing.m,
    marginHorizontal: theme.spacing.m,
    height: theme.borderRadius.xs,
    backgroundColor: theme.colors.gray,
  },
});

export default Separator;
