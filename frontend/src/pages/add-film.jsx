import { useState } from "react";
import { Box, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import axiosInstance from "../utils/axiosInstance"; // Ensure axios is connected to the correct backend
import { useRouter } from "next/router"; // Import useRouter from Next.js
import Navbar from "@/component/navbar";

const AddFilm = () => {
  const [form, setForm] = useState({
    title: "",
    genre: "",
    year: "",
    image: null,
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Get token from local storage
      if (!token) {
        setError("You must be logged in to add a film");
        return;
      }

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("genre", form.genre);
      formData.append("year", form.year);
      if (form.image) {
        formData.append("image", form.image);
      }

      await axiosInstance.post("/movies", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Film added successfully");
      router.push("/films"); // Redirect to films page after successful submission
    } catch (error) {
      console.error("Add film error:", error);
      setError("Error adding film");
    }
  };

  return (
    <>
      <Navbar />
      <Box maxW="md" mx="auto" mt="10">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mt="4">
            <FormLabel>Genre</FormLabel>
            <Input
              name="genre"
              value={form.genre}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mt="4">
            <FormLabel>Year</FormLabel>
            <Input
              name="year"
              value={form.year}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mt="4">
            <FormLabel>Image</FormLabel>
            <Input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
            />
          </FormControl>
          {error && (
            <Box color="red.500" mt="4">
              {error}
            </Box>
          )}
          <Button mt="4" colorScheme="teal" type="submit">
            Add Film
          </Button>
        </form>
      </Box>
    </>
  );
};

export default AddFilm;
