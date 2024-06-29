import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#f0f0f0",
        color: "#333",
      },
    },
  },
});

export default theme;
