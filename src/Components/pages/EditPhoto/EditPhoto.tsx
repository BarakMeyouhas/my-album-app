import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, ButtonGroup, TextField, Typography } from '@mui/material';
import { Cancel, Send } from '@mui/icons-material';
import { updatePhotoAction } from '../../redux/PhotosReducer';
import { store } from '../../redux/Store';
import { Photo } from '../../Modal/Photo';

function EditPhoto(): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();

  // Fetch the photo with the given ID
  const initialPhoto = store.getState().photos.allPhotos.find(item => item.id === Number(params.id));

  // Initialize the state with the found photo or an empty photo
  const [photo, setPhoto] = useState<Photo>(initialPhoto || new Photo(0, '', '', '', '', ''));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPhoto((prevPhoto) => ({ ...prevPhoto, [name]: value }));
  };

  const handleUpdate = () => {
    store.dispatch(updatePhotoAction(photo));
    navigate('/');
  };

  // Fetch the photo if it changes in the Redux store
  useEffect(() => {
    const updatedPhoto = store.getState().photos.allPhotos.find(item => item.id === Number(params.id));
    if (updatedPhoto) {
      setPhoto(updatedPhoto);
    }
  }, [params.id]);

  return (
    <div className="EditSong">
      <div className="Box" style={{ width: 300 }}>
        <Typography variant="h3" className="HeadLine">
          Edit photo
        </Typography>
        <hr />
        <TextField
          name="URL"
          value={photo.URL}
          onChange={handleInputChange}
          variant="outlined"
          className="TextBox"
          type="url"
          placeholder="Photo URL"
        />
        <TextField
          name="description"
          value={photo.description}
          onChange={handleInputChange}
          variant="outlined"
          className="TextBox"
          placeholder="Photo Description"
        />
        <br />
        <br />
        <ButtonGroup variant="contained" fullWidth>
          <Button onClick={handleUpdate} color="primary" startIcon={<Send />}>
            Update
          </Button>
          <Button onClick={() => navigate('/Photos')} color="secondary" startIcon={<Cancel />}>
            Cancel
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default EditPhoto;
