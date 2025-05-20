import { ChakraProvider } from "@chakra-ui/react";
import RegistrationForm from "./components/forms/RegistrationForm";

// Main App component
function App() {
  return (
    <ChakraProvider>
      <RegistrationForm />
    </ChakraProvider>
  );
}

export default App;