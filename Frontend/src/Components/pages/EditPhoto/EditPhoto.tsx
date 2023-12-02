import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { Cancel, Send } from "@mui/icons-material";
import { updatePhotoAction } from "../../redux/PhotosReducer";
import { store } from "../../redux/Store";
import { Photo } from "../../Modal/Photo";

function EditPhoto(): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();
  const previewStyle = {
    width: "100%", // Adjust the image width to fit its container
    height: "100%", // Adjust the image height to fit its container
    objectFit: "contain", // Prevent the image from breaking out of the box
  };
  const myDesign = { width: 300, height: 300 };

  // Fetch the photo with the given ID
  const initialPhoto = store
    .getState()
    .photos.allPhotos.find((item) => item.photo_id === Number(params.id));

  // Initialize the state with the found photo or an empty photo
  const [photo, setPhoto] = useState<Photo>(
    initialPhoto || new Photo(0, "", "", 0, "", "","")
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Destructure the 'name' and 'value' from the input field that triggered the event
    const { name, value } = event.target;

    // Update the 'photo' state using 'setPhoto' hook based on previous state ('prevPhoto')
    // Spread the previous state ('prevPhoto') and update the property indicated by [name] with the new 'value'
    setPhoto((prevPhoto) => ({ ...prevPhoto, [name]: value }));
  };

  const handleUpdate = () => {
    store.dispatch(updatePhotoAction(photo));
    const allPhotos = store.getState().photos.allPhotos; // Get all photos from the store
    const updatedPhoto = allPhotos.map((item) =>
      item.photo_id === photo.photo_id ? photo : item
    ); // Replace the modified photo
    localStorage.setItem("photos", JSON.stringify(updatedPhoto)); // Update the local storage with the updated photo data
    navigate("/");
  };

  // Fetch the photo if it changes in the Redux store
  useEffect(() => {
    const updatedPhoto = store
      .getState()
      .photos.allPhotos.find((item) => item.photo_id === Number(params.id));
    if (updatedPhoto) {
      setPhoto(updatedPhoto);
    }
  }, [params.id]);

  return (
    <div
      className="EditSong"
      style={{
        overflowY: "auto",
        maxHeight: "80vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="Box" style={{ width: 300, height: 300 }}>
        <Typography variant="h3" className="HeadLine">
          Edit photo
        </Typography>
        <hr />
        <TextField
          className="Headline"
          name="URL"
          value={photo.URL}
          onChange={handleInputChange}
          variant="outlined"
          type="url"
          placeholder="Photo URL"
        />
        <TextField
          className="Headline"
          name="description"
          value={photo.description}
          onChange={handleInputChange}
          variant="outlined"
          placeholder="Photo Description"
        />
        <br />
        <br />
        <ButtonGroup variant="contained" fullWidth>
          <Button onClick={handleUpdate} color="primary" startIcon={<Send />}>
            Update
          </Button>
          <Button
            onClick={() => navigate("/")}
            color="secondary"
            startIcon={<Cancel />}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </div>
      <br />
      <div className="Box" style={myDesign}>
        {photo.URL && (
          <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
            <h3>Image Preview</h3>
            <img src={photo.URL} alt={photo.URL} />
          </div>
        )}
      </div>
    </div>
  );
}

export default EditPhoto;
