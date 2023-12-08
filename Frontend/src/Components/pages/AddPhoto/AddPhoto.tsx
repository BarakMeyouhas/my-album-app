import { useEffect, useState } from "react";
import { store } from "../../redux/Store";
import "./AddPhoto.css";
import { useForm } from "react-hook-form";
import { Photo } from "../../Modal/Photo";
import { addPhotoAction } from "../../redux/PhotosReducer";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField } from "@mui/material";

function AddPhoto(): JSX.Element {
  const [imageURL, setURL] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const url = new URL(window.location.href);
    const imageUrlParam = url.searchParams.get("params");
    if (imageUrlParam) {
      setURL(imageUrlParam);
      console.log("image url: " + imageUrlParam);
    } else {
      console.log("there is no image");
    }
  }, [location]);

  const previewStyle = {
    width: 300,
    margin: 10,
  };
  //form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Photo>();

  const send = async (data: Photo) => {
    if (!imageURL) {
      console.error("URL is required");
      return;
    }
    console.log(imageURL);

    try {
      const selectedCategory = store
        .getState()
        .category.categories.find(
          (category) => category.category_id === Number(data.category_id)
        );

      if (!selectedCategory) {
        console.error("Selected category not found.");
        return;
      }

      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${(
        currentDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${currentDate
        .getDate()
        .toString()
        .padStart(2, "0")}`;

      const formattedTime = `${currentDate
        .getHours()
        .toString()
        .padStart(2, "0")}:${currentDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${currentDate
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;

      const response = await axios.post(
        "http://localhost:4000/api/v1/album/addPhoto",
        {
          URL: imageURL,
          description: data.description,
          category_id: selectedCategory.category_id.toString(),
          date: formattedDate,
          time: formattedTime,
        }
      );

      const addedPhoto: Photo = response.data;
      store.dispatch(addPhotoAction(addedPhoto));
      navigate("/");
      console.log(addedPhoto);
    } catch (error) {
      console.error("Error adding photo:", error);
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center" }}
      className="AddPhoto"
    >
      <div className="Box">
        <form onSubmit={handleSubmit(send)}>
          <h3>Add Photo</h3>
          <hr />
          <TextField
            id="imageUrl"
            type="text"
            placeholder="enter image url"
            {...register("URL")}
            onChange={(e) => setURL(e.target.value)}
            value={imageURL}
          />
          <br />
          <textarea
            placeholder="enter image description"
            rows={3}
            style={{ width: 300 }}
            {...register("description")}
          />
          <br />
          <select required {...register("category_id")}>
            <option disabled>Choose Category</option>
            {store.getState().category.categories.map((item) => (
              <option key={item.category_id} value={item.category_id}>
                {item.name}
              </option>
            ))}
          </select>
          <br />
          {new Date().toDateString()} <br />
          <br />
          <button>Add Photo</button>
        </form>
      </div>
      <div className="Box">
        {imageURL && (
          <div>
            <h3>Image Preview</h3>
            <img src={imageURL} alt={imageURL} style={previewStyle} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddPhoto;
