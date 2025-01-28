import theme from "@/app/theme";
import { ChakraProvider } from "@chakra-ui/react";

const AppProvider = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default AppProvider;
