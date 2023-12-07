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
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Photo } from "../../Modal/Photo";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";



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
    console.log(store.getState().photos.allPhotos);
  }, []);

  const navigate = useNavigate();
  const params = useParams();
  const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null); // Track the selected photo ID for deletion
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false); // State to control the visibility of the delete confirmation dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editDialogData, setEditDialogData] = useState<Photo | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );

  const handleCategoryChange = (event: SelectChangeEvent<number>) => {
    console.log("Selected Category:", event.target.value);
    setSelectedCategory(event.target.value as number);
  };

  const photoStyle = {
    width: 200,
    height: 200,
  };

  const handleEdit = (photoId: number) => {
    const selectedPhoto = store
      .getState()
      .photos.allPhotos.find((item) => item.photo_id === photoId);

    if (selectedPhoto) {
      setEditDialogData(selectedPhoto);
      setEditDialogOpen(true);
    }
  };
  const handleSaveEdit = async () => {
    try {
      if (!editDialogData) {
        console.error("Edit data is missing.");
        return;
      }

      const updatedDescription =
        (document.getElementById("photoDescription") as HTMLInputElement)
          ?.value || editDialogData.description;

      const updatedCategory = store
        .getState()
        .category.categories.find(
          (category) => category.category_id === selectedCategory
        );

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split("T")[0];

      const updatedData: Photo = {
        photo_id: editDialogData.photo_id,
        URL: editDialogData.URL,
        category_id: selectedCategory,
        date: formattedDate,
        description: updatedDescription,
        categoryName: updatedCategory ? updatedCategory.name : "",
      };

      const response = await axios.put(
        `http://localhost:4000/api/v1/album/updatePhoto/`,
        updatedData
      );
      store.dispatch(updatePhotoAction(updatedData));

      setEditDialogOpen(false);
    } catch (error) {}
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
      setDeleteDialogOpen(false);
    }
  };

  const showPhotosByCategory = () => {
    const photos = store.getState().photos.allPhotos;
    const filteredPhotos = photos.filter(
      (item) =>
        !params.categoryName || item.categoryName === params.categoryName
    );

    return (
      <Container maxWidth="md">
        <ImageList cols={3} gap={12}>
          {filteredPhotos.map((item) => (
            <ImageListItem key={item.photo_id}>
              <img
                srcSet={`${item.URL}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.URL}?w=248&fit=crop&auto=format`}
                alt={item.description}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.description}
                subtitle={item.categoryName}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item.description}`}
                  >
                    <InfoIcon />
                    <Grid
                      onClick={() => handleEdit(item.photo_id)}
                      sx={{ color: "white" }}
                    >
                      <EditIcon />
                    </Grid>
                    <Grid
                      onClick={() => {
                        setSelectedPhotoId(item.photo_id); // Set the selected photo ID before opening the dialog
                        setDeleteDialogOpen(true);
                      }}
                      item
                      xs={8}
                    >
                      <DeleteForeverIcon />
                    </Grid>
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    );
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

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Photo Details</DialogTitle>
        <DialogContent>
          {editDialogData && (
            <>
              <img
                src={editDialogData.URL}
                alt={editDialogData.description}
                style={photoStyle}
              />
              <FormControl fullWidth sx={{ mt: 2, mx: "auto" }}>
                <TextField
                  label="Description"
                  placeholder="Enter description"
                  id="photoDescription"
                  defaultValue={editDialogData.description}
                  fullWidth
                  sx={{ width: "60%" }}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2, mx: "auto" }}>
                <InputLabel htmlFor="category-select">Category</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Category"
                  id="photoCategory"
                  fullWidth
                  onChange={handleCategoryChange}
                  sx={{ width: "60%" }}
                >
                  {store.getState().category.categories.map((category) => (
                    <MenuItem
                      key={category.category_id}
                      value={category.category_id}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Close
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Photos;
