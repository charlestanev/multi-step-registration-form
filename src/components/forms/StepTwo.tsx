import { Box, Button, FormControl, FormLabel, Input, Image, FormErrorMessage } from "@chakra-ui/react";
import { useState } from "react";

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
                        <Image
                            src={previewUrl}
                            alt="Preview"
                            objectFit="cover"
                            maxW="100%"
                            maxH="300px"
                            borderRadius="md"
                            boxShadow="md"
                        />
                    </Box>
                )}

                <Button type="submit" colorScheme="teal" width="full">
                    Submit
                </Button>
            </form>
        </Box>
    );
}