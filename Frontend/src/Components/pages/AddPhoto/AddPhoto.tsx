import { useEffect, useState } from "react";
import { store } from "../../redux/Store";
import "./AddPhoto.css";
import { useForm } from "react-hook-form";
import { Photo } from "../../Modal/Photo";
import { addPhotoAction } from "../../redux/PhotosReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddPhoto(): JSX.Element {
  const [refresh, setRefresh] = useState(false);
  const [clock, setClock] = useState("");
  const [imageURL, setURL] = useState("");
  const navigate = useNavigate();
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
    try {
      const selectedCategory = store.getState().category.categories.find(
        (category) => category.category_id === Number(data.category_id)
      );
  
      if (!selectedCategory) {
        console.error("Selected category not found.");
        return;
      }
  
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
  
      const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
  
      const response = await axios.post(
        "http://localhost:4000/api/v1/album/addPhoto",
        {
          URL: data.URL,
          description: data.description,
          category_id: selectedCategory.category_id.toString(),
          date: formattedDate,
          time: formattedTime,
        }
      );
  
      const addedPhoto: Photo = response.data;
  
      // Dispatch the action to update the state
      store.dispatch(addPhotoAction(addedPhoto));
      // Navigate after dispatching the action
      navigate("/");
    } catch (error) {
      console.error("Error adding photo:", error);
    }
  };
  
  

  useEffect(() => {
    setInterval(() => {
      setClock(new Date().toLocaleTimeString());
    }, 900);
  }, []);

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
            placeholder="enter image url"
            {...register("URL", { required: "URL is required" })}
            onBlur={(e) => setURL(e.target.value)}
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
              <option key={item.category_id} value={item.category_id}>{item.name}</option>
            ))}
          </select>
          <br />
          {new Date().toDateString()} <br />
          {clock}
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
