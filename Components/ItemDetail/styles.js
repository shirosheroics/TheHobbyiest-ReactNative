import { StyleSheet } from "react-native";
import { Font } from "expo";

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 15,
    marginLeft: 16,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "open-sans-regular"
  },
  title: {
    color: "white",
    fontFamily: "open-sans-bold",
    backgroundColor: "#000",
    justifyContent: "flex-start",
    padding: 16
  },
  item: {
    color: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000"
  }
});

export default styles;
