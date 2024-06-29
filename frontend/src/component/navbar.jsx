// components/Navbar.jsx
import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Periksa keberadaan token atau kondisi autentikasi lainnya di sini
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Hapus token dari local storage
    router.push("/"); // Redirect ke halaman utama setelah logout
  };

  return (
    <Box bg="blue.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <NextLink href="/">
            <Button colorScheme="whiteAlpha">Home</Button>
          </NextLink>
        </Box>
        <Spacer />
        <Box>
          {isLoggedIn ? (
            <>
              <NextLink href="/add-film">
                <Button colorScheme="whiteAlpha" mr={4}>
                  Add Film
                </Button>
              </NextLink>
              <Button onClick={handleLogout} colorScheme="whiteAlpha">
                Logout
              </Button>
            </>
          ) : (
            <NextLink href="/login">
              <Button colorScheme="whiteAlpha">Login</Button>
            </NextLink>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
