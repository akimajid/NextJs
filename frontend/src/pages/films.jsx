import { useState, useEffect } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  FormControl,
  FormLabel,
  Input,
  Image,
} from "@chakra-ui/react";
import axios from "../utils/axios"; // Pastikan axios sudah terhubung dengan backend yang benar
import Navbar from "@/component/navbar";

const Films = () => {
  const [films, setFilms] = useState([]);
  const [editForm, setEditForm] = useState({
    id: "",
    title: "",
    genre: "",
    year: "",
    image: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get("/movies");
        setFilms(response.data);
      } catch (error) {
        setError("Error fetching films");
      }
    };

    fetchFilms();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Ambil token dari local storage
      if (!token) {
        throw new Error("Token not found"); // Atur penanganan jika token tidak ditemukan
      }

      await axios.delete(`/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFilms(films.filter((film) => film.id !== id));
    } catch (error) {
      console.error("Error deleting film", error);
      setError("Error deleting film");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", editForm.title);
      formData.append("genre", editForm.genre);
      formData.append("year", editForm.year);
      if (editForm.image) {
        formData.append("image", editForm.image);
      }

      const token = localStorage.getItem("token"); // Ambil token dari local storage
      if (!token) {
        throw new Error("Token not found"); // Atur penanganan jika token tidak ditemukan
      }

      await axios.put(`/movies/${editForm.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setFilms(
        films.map((film) => (film.id === editForm.id ? editForm : film))
      );
      setEditForm({ id: "", title: "", genre: "", year: "", image: null });
    } catch (error) {
      console.error("Error editing film", error);
      setError("Error editing film");
    }
  };

  const startEdit = (film) => {
    setEditForm(film);
  };

  const cancelEdit = () => {
    setEditForm({ id: "", title: "", genre: "", year: "", image: null });
  };

  const handleImageChange = (e) => {
    setEditForm({ ...editForm, image: e.target.files[0] });
  };

  return (
    <>
      <Navbar />
      <Box maxW="md" mx="auto" mt="10">
        {error && (
          <Box color="red.500" mb="4">
            {error}
          </Box>
        )}
        <List spacing={3}>
          {films.map((film) => (
            <ListItem key={film.id}>
              <Box>
                <Box fontWeight="bold">{film.title}</Box>
                <Box>Genre: {film.genre}</Box>
                <Box>Year: {film.year}</Box>
                {film.image && (
                  <Box mt="2">
                    <Image src={film.image} alt={film.title} maxW="100px" />
                  </Box>
                )}
              </Box>
              <Button colorScheme="teal" ml="4" onClick={() => startEdit(film)}>
                Edit
              </Button>
              <Button
                colorScheme="red"
                ml="2"
                onClick={() => handleDelete(film.id)}
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
        {editForm.id && (
          <Box mt="10">
            <form onSubmit={handleEdit}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  required
                />
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Genre</FormLabel>
                <Input
                  name="genre"
                  value={editForm.genre}
                  onChange={(e) =>
                    setEditForm({ ...editForm, genre: e.target.value })
                  }
                  required
                />
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Year</FormLabel>
                <Input
                  name="year"
                  value={editForm.year}
                  onChange={(e) =>
                    setEditForm({ ...editForm, year: e.target.value })
                  }
                  required
                />
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Image</FormLabel>
                <Input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </FormControl>
              {editForm.image && (
                <Box mt="2">
                  <Image
                    src={URL.createObjectURL(editForm.image)}
                    alt={editForm.title}
                    maxW="100px"
                  />
                </Box>
              )}
              <Box mt="4" display="flex" justifyContent="space-between">
                <Button colorScheme="teal" type="submit">
                  Save
                </Button>
                <Button colorScheme="gray" onClick={cancelEdit}>
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Films;
