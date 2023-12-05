import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Explore.css";
import {
  Button,
  Container,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

interface PexelsImage {
  id: number;
  photographer: string;
  photographer_url: string;
  alt: string;
  src: {
    original: string;
  };
}

const photoStyle = {
  width: 200,
  height: 200,
};

function Explore(): JSX.Element {
  const [images, setImages] = useState<PexelsImage[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async (page: number) => {
    const apiKey = "OQ9XdBxhpTSqIJb7fvEGfw7uYXnDxrOSiPAooXzMiu8yQyen9aiGou7a";
    const apiUrl = "https://api.pexels.com/v1/curated";
    const perPage = 18;

    const axiosConfig = {
      headers: {
        Authorization: apiKey,
      },
      params: {
        per_page: perPage,
        page: page,
        order_by: "random",
        seed: Math.random(), // Add this line for random ordering
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
  

  return (
    <div className="Image-container">
      <h2>Explore</h2>
      <div>
        <Button variant="contained" onClick={handlePrevPage}>
          Previous
        </Button>
        <Button variant="contained" onClick={handleNextPage}>
          Next
        </Button>
      </div>
      <div className="Explore">
        <Container maxWidth="xl">
          <ImageList cols={3} gap={12}>
            {images.map((item) => (
              <ImageListItem key={item.id}>
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
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Container>
      </div>
      <div>
        <Button sx={{mr:"5px"}} variant="contained" onClick={handlePrevPage}>
          Previous
        </Button>
        
        <Button variant="contained" onClick={handleNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default Explore;
