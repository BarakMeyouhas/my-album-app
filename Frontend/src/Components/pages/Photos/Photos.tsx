import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { store } from "../../redux/Store";
import "./Photos.css";
import {
  deletePhotoAction,
  downloadPhotoAction,
} from "../../redux/PhotosReducer";
import { updatePhotoAction } from "../../redux/PhotosReducer";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function Photos(): JSX.Element {
  useEffect(() => {
    if (store.getState().photos.allPhotos.length < 1) {
      axios
        .get("http://localhost:4000/api/v1/album/photosList")
        .then((response) => response.data)
        .then((result) => {
          store.dispatch(downloadPhotoAction(result));
        });
    }
  }, []);

  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null); // Track the selected photo ID for deletion
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false); // State to control the visibility of the delete confirmation dialog

  const photoStyle = {
    width: 200,
    height: 200,
  };

  const handleEdit = (photoId: number) => {
    navigate(`/EditPhoto/${photoId}`);
  };

  const handleDeletePhoto = async (photoId: number) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/v1/album/deletePhotoById/${photoId}`
      );
      store.dispatch(deletePhotoAction(photoId));
      navigate(`/`);
    } catch (error) {
      console.error("Error deleting photo:", error);
    } finally {
      setDeleteDialogOpen(false); // Close the delete confirmation dialog
    }
  };

  const showPhotosByCategory = () => {
    const photos = store.getState().photos.allPhotos;
    const filteredPhotos = photos.filter(
      (item) =>
        !params.categoryName || item.categoryName === params.categoryName
    );

    return filteredPhotos.map((item) => (
      <div
        key={item.photo_id}
        className="Box"
        style={{ width: 200, height: 230 }}
      >
        <img src={item.URL} style={photoStyle} alt={item.description} />
        <br />
        <br />
        {item.description}
        <br />
        {item.date}
        <div>
          <div>
            <strong>Category: {item.categoryName}</strong>
          </div>
          <button onClick={() => handleEdit(item.photo_id)}>Edit</button>
          <Chip
            label="Delete"
            deleteIcon={<DeleteIcon />}
            onClick={() => {
              setSelectedPhotoId(item.photo_id); // Set the selected photo ID before opening the dialog
              setDeleteDialogOpen(true);
            }}
            variant="outlined"
          />
        </div>
      </div>
    ));
  };

  return (
    <div className="Photos" style={{ overflowY: "auto", maxHeight: "80vh" }}>
      {params.categoryName && <h2>{params.categoryName}</h2>}
      <hr />
      {showPhotosByCategory()}

      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this photo?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeletePhoto(selectedPhotoId!)}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Photos;
