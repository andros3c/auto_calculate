import theme from "@/app/theme";
import { ChakraProvider } from "@chakra-ui/react";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default AppProvider;
