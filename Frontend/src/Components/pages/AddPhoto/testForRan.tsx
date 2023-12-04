import { useEffect, useState } from "react";
import { store } from "../../redux/Store";
import "./AddPhoto.css";
import { useForm } from "react-hook-form";
import { Photo } from "../../Modal/Photo";
import { addPhotoAction } from "../../redux/PhotosReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Category } from "../../Modal/Category";

function AddPhoto(): JSX.Element {
  const [refresh, setRefresh] = useState(false);
  const [imageURL, setURL] = useState("");
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

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

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setURL(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const send = async (data: Photo) => {
    try {
      const submittedURL = data.URL || imageURL;
      const selectedCategory = store
        .getState()
        .category.categories.find(
          (category) => category.category_id === Number(data.category_id)
        );

      // Handle case where selectedCategory is not found
      if (!selectedCategory) {
        console.error(
          "Selected category not found. Using default category or providing an error message."
        );
        // You can set a default category or show an error message here
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
          URL: submittedURL,
          description: data.description,
          category_id: selectedCategory.category_id.toString(),
          date: formattedDate,
          time: formattedTime,
        }
      );
      const addedPhoto: Photo = response.data;
      store.dispatch(addPhotoAction(addedPhoto));
      navigate("/");
    } catch (error) {
      console.error("Error adding photo:", error);
    }
  };

  const myDesign = { marginTop: 50, width: 300 };

  return (
    <div
      style={{ display: "flex", justifyContent: "center" }}
      className="AddPhoto"
    >
      <div className="Box" style={myDesign}>
        <form onSubmit={handleSubmit(send)}>
          <h3>Add Photo</h3>
          <hr />
          <input
            type="url"
            placeholder="Enter image URL"
            {...register("URL")}
            onBlur={(e) => setURL(e.target.value)}
          />
          <br />
          {/* File input for image upload */}
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
          <br />
          <textarea
            placeholder="Enter image description"
            rows={3}
            style={{ width: 300 }}
            {...register("description")}
          />
          <br />
          <select required {...register("category_id")} onChange={(e) => setSelectedCategory(store.getState().category.categories.find(category => category.category_id === Number(e.target.value)) || null)}>
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
      <div className="Box" style={myDesign}>
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
