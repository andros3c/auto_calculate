"use client";
import { extendTheme } from "@chakra-ui/react";

import { inputStyles } from "./components/input";
import { buttonStyles } from "./components/button";
import { colors } from "./foundations/colors";

const theme = extendTheme({
  colors,
  components: {
    Input: inputStyles,
    Button: buttonStyles,
  },
});

export default theme;
