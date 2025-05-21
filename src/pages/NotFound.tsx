import {
    Box,
    Heading,
    Text,
    Button,
    useColorModeValue,
    Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
    const bg = useColorModeValue("gray.100", "gray.900");
    const boxBg = useColorModeValue("white", "gray.800");

    return (
        <Flex
            minH="100vh"
            width="100vw"
            align="center"
            justify="center"
            bg={bg}
            px={4}
        >
            <Box
                textAlign="center"
                py={10}
                px={6}
                bg={boxBg}
                boxShadow="lg"
                borderRadius="lg"
                maxW="md"
                width="100%"
            >
                <Heading as="h1" size="2xl" mb={2}>
                    404
                </Heading>
                <Text fontSize="lg" mb={6}>
                    The page you're looking for doesn't exist.
                </Text>
                <Button as={Link} to="/" colorScheme="teal" size="md">
                    Go Home
                </Button>
            </Box>
        </Flex>
    );
}