import { StyleSheet } from "react-native";

import colors from "./colors";
import size from "./size";

const GlobalStyles = StyleSheet.create({
  defaultText: {
    color: colors.secondary,
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    color: colors.primary,
    fontSize: size.width > 356 ? 28 : 23,
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  image: {
    width: size.width * 0.95,
    height: size.height * 0.4,
  },
});

export default GlobalStyles;
