"use client";
import { extendTheme } from "@chakra-ui/react";
import { colors } from "./foundations/colors";
import { inputStyles } from "./components/input";
import { buttonStyles } from "./components/button";

const theme = extendTheme({
  colors,
  components: {
    Input: inputStyles,
    Button: buttonStyles,
  },
});

export default theme;
