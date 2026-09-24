import { StyleSheet } from "react-native";

export const createStyles = () =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
    ball: {
      position: "absolute",
      width: "100%",
      height: "100%",
    },
    content: {
      position: "absolute",
      width: "100%",
      height: "100%",
      transformOrigin: "bottom",
    },
  });
