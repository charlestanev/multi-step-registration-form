import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import RegistrationForm from "./components/forms/RegistrationForm";
import theme from "./components/ui/theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RegistrationForm />
    </ChakraProvider>
  );
}

export default App;