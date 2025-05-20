import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import { useState } from "react";
import { lazy, Suspense } from "react";

// Lazy load the motion component only when needed
const MotionImg = lazy(() =>
    import("framer-motion").then(mod => ({ default: mod.motion.img }))
);

// Define the shape of the props for StepTwo
interface Props {
    onSubmit: (avatar: File | null) => void;
}

export default function StepTwo({ onSubmit }: Props) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
        setError(""); // Clear error on change 

        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedFile) {
            setError("Please upload an avatar before submitting.");
            return;
        }

        onSubmit(selectedFile);
    };

    return (
        <Box maxW="400px" mx="auto">
            <form onSubmit={handleSubmit}>
                <FormControl isInvalid={!!error} mb={4}>
                    <FormLabel>Upload Avatar</FormLabel>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        variant="unstyled"
                        w="100%"
                        px={3}
                        py={2}
                        bg="gray.700"
                        _dark={{ bg: "gray.700" }}
                        color="white"
                        _hover={{ cursor: "pointer", bg: "gray.600" }}
                        _focus={{ outline: "none" }}
                        borderRadius="md"
                    />
                    <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>

                {previewUrl && (
                    <Box my={4} display="flex" justifyContent="center">
                        <Suspense fallback={null}>
                            <MotionImg
                                src={previewUrl}
                                alt="Preview"
                                style={{
                                    borderRadius: "8px",
                                    maxWidth: "100%",
                                    maxHeight: "300px",
                                    boxShadow: "var(--chakra-shadows-md)",
                                }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            />
                        </Suspense>
                    </Box>
                )}

                <Button type="submit" colorScheme="teal" width="full">
                    Submit
                </Button>
            </form>
        </Box>
    );
}