import {
    Box,
    Heading,
    Flex,
    IconButton,
    useColorMode,
    useToast,
} from "@chakra-ui/react";
import { Moon, Sun } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import axios from "axios";

const StepOne = lazy(() => import("./StepOne"));
const StepTwo = lazy(() => import("./StepTwo"));

// Chakra + motion integration
const MotionBox = lazy(() =>
    import("framer-motion").then(mod => ({ default: mod.motion(Box) }))
);

// Define the shape of data coming from Step One
interface StepOneData {
    name: string;
    password: string;
    confirmPassword: string;
    interests: string[];
}

export default function RegistrationForm() {
    const [step, setStep] = useState(1); // Current form step 
    const [formData, setFormData] = useState<StepOneData | null>(null); // Data from Step One 
    const toast = useToast();
    const { colorMode, toggleColorMode } = useColorMode();

    // Called when Step One is completed successfully 
    const handleStepOneSubmit = (data: StepOneData) => {
        setFormData(data);
        setStep(2);
    };

    // Final submission of all data 
    const handleFinalSubmit = async (avatarFile: File | null) => {
        if (!formData) return;

        try {
            const formToSend = {
                ...formData,
                avatar: avatarFile?.name || null, // We only store the avatar filename 
            };

            await axios.post("http://localhost:3001/registrations", formToSend);

            toast({
                title: "Registration successful!",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
            });

            // Reset state after submission 
            setStep(1);
            setFormData(null);
        } catch (err) {
            toast({
                title: "Error submitting form",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex
            minHeight="100vh"
            width="100vw"
            align="center"
            justify="center"
            px={4}
        >
            <Suspense fallback={<Box>Loading...</Box>}>
                <MotionBox
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    p={{ base: 4, md: 6 }}
                    maxW={{ base: "100%", md: "500px" }}
                    w="100%"
                    borderRadius="lg"
                    boxShadow="lg"
                    bg="white"
                    _dark={{ bg: "gray.800" }}
                >
                    <Flex justify="space-between" align="center" mb={6}>
                        <Heading size="lg">User Registration</Heading>
                        <IconButton
                            aria-label="Toggle theme"
                            icon={colorMode === "light" ? <Moon size={18} /> : <Sun size={18} />}
                            onClick={toggleColorMode}
                            variant="ghost"
                        />
                    </Flex>

                    <Suspense fallback={null}>
                        {step === 1 && <StepOne onNext={handleStepOneSubmit} />}
                        {step === 2 && <StepTwo onSubmit={handleFinalSubmit} />}
                    </Suspense>

                </MotionBox>
            </Suspense>
        </Flex>
    );
}