import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { Box, Heading, useToast } from "@chakra-ui/react";
import axios from "axios";

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
    const [avatar, setAvatar] = useState<File | null>(null); // Uploaded avatar 
    const toast = useToast();

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
            });

            // Reset state after submission 
            setStep(1);
            setFormData(null);
            setAvatar(null);
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
        <Box p={4}>
            <Heading size="md" mb={4}>User Registration</Heading>

            {step === 1 && <StepOne onNext={handleStepOneSubmit} />}
            {step === 2 && <StepTwo onSubmit={handleFinalSubmit} />}
        </Box>
    );
}