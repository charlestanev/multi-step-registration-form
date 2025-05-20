import './App.css'
import { ChakraProvider } from "@chakra-ui/react";
import FormFirstOne from './components/forms/FormFirstOne';

function App() {
  const handleNext = (data: any) => {
    console.log("Data:", data);
  };

  return (
    <>
      <FormFirstOne onNext={handleNext} />
    </>
  );

}

export default App
