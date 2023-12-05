import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Explore.css";

interface PexelsImage {
  id: number;
  photographer: string;
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
    const perPage = 30;

    const axiosConfig = {
      headers: {
        Authorization: apiKey,
      },
      params: {
        per_page: perPage,
        page: page,
        order_by: "random", // Add this line for random ordering
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
      <div className="">
        {images.map((image) => (
          <div
            key={image.id}
            style={{ width: 200, height: 230 }}
            className="Box"
          >
            <br />
            <img
              src={image.src.original}
              style={photoStyle}
              alt={image.photographer}
            />
            <p>{image.photographer}</p>
          </div>
        ))}
      </div>
      <div>
        <button onClick={handlePrevPage}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
}

export default Explore;
