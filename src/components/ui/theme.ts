import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// Define theme config for color mode
const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

// Extend the default theme with config and global styles
const theme = extendTheme({
    config,
    styles: {
        global: {
            body: {
                bg: "gray.50",
                color: "gray.800",
                _dark: {
                    bg: "gray.900",
                    color: "gray.100",
                },
            },
        },
    },
});

export default theme;