import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Explore.css";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate, useParams } from "react-router-dom";

interface PexelsImage {
  id: number;
  photographer: string;
  photographer_url: string;
  alt: string;
  src: {
    original: string;
    portrait: string;
    small: string;
    tiny: string;
    large: string;
    medium: string;
  };
}

const photoStyle = {
  width: 200,
  height: 200,
};

function Explore(): JSX.Element {
  const [images, setImages] = useState<PexelsImage[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<PexelsImage | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { params } = useParams();
  const navigate = useNavigate();


  const fetchData = async (page: number) => {
    const apiKey = "OQ9XdBxhpTSqIJb7fvEGfw7uYXnDxrOSiPAooXzMiu8yQyen9aiGou7a";
    const apiUrl = "https://api.pexels.com/v1/curated";
    const perPage = 80;

    const axiosConfig = {
      headers: {
        Authorization: apiKey,
      },
      params: {
        per_page: perPage,
        page: page,
        order_by: "random",
        seed: Math.random(),
      },
    };

    try {
      const response = await axios.get(apiUrl, axiosConfig);
      setImages(response.data.photos);
      console.log(response.data.photos);
    } catch (error) {
      console.error("Error fetching data from Pexels API:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleImageClick = (image: PexelsImage) => {
    setSelectedImage(image);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleAddPhoto = () => {
    if (selectedImage) {
      // Navigate to the addPhoto component with the selected image URL as a parameter
      navigate(`/addPhoto?params=${encodeURIComponent(selectedImage.src.original)}`);
      var imageURL = selectedImage.src.original;
      console.log("image url from explore:" +  imageURL);
    }
  };

  return (
    <Container
      style={{ overflowY: "auto", maxHeight: "80vh" }}
      className="Image-container"
    >
      <h2>Explore</h2>
      <div>
        <Button sx={{ mr: "5px" }} variant="contained" onClick={handlePrevPage}>
          Previous
        </Button>
        <Button variant="contained" onClick={handleNextPage}>
          Next
        </Button>
      </div>
      <div className="Explore">
        <Container maxWidth="xl">
          <ImageList cols={4} gap={10}>
            {images.map((item) => (
              <ImageListItem
                key={item.id}
                onClick={() => handleImageClick(item)}
              >
                <img
                  srcSet={`${item.src.original}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.src.original}?w=248&fit=crop&auto=format`}
                  alt={item.alt}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.alt}
                  subtitle={item.photographer}
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${item.photographer}`}
                    ></IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Container>
      </div>
      <div>
        <Button sx={{ mr: "5px" }} variant="contained" onClick={handlePrevPage}>
          Previous
        </Button>

        <Button variant="contained" onClick={handleNextPage}>
          Next
        </Button>
      </div>
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Image Details</DialogTitle>
        <DialogContent>
          {selectedImage && (
            <Paper>
              <img
                src={selectedImage.src.original}
                alt={selectedImage.alt}
                style={{ maxWidth: "500px", maxHeight: "350px" }}
              />
            </Paper>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
          <Button onClick={handleAddPhoto}>Add Photo</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Explore;
