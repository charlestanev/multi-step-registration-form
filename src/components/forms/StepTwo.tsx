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
                    <Input type="file" accept="image/*" onChange={handleFileChange} />
                    <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>

                {previewUrl && (
                    <Box mb={4}>
                        <Image src={previewUrl} alt="Preview" maxH="200px" />
                    </Box>
                )}

                <Button type="submit" colorScheme="teal" width="full">
                    Submit
                </Button>
            </form>
        </Box>
    );
}