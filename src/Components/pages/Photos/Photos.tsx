import { useNavigate, useParams } from "react-router-dom";
import { store } from "../../redux/Store";
import "./Photos.css";
import { deletePhotoAction } from "../../redux/PhotosReducer";
import { updatePhotoAction } from '../../redux/PhotosReducer';

import { useState } from "react";

function Photos(): JSX.Element {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const params = useParams();
  const photoStyle = {
    width: 200,
    height: 200,
  };

  const handleEdit = (photoId: number) => {
      navigate(`/EditPhoto/${photoId}`);
  };

  const handleDelete = (photoId: number) => {
    store.dispatch(deletePhotoAction(photoId));
    setRefresh(!refresh);
  };

  const showPhotosByCategory = () => {
    const photos = store.getState().photos.allPhotos;
    if (params.catName) {
      const filteredPhotos = photos.filter(item => item.category === params.catName);
      return filteredPhotos.map(item => (
        <div className="Box" style={{ width: 200, height: 230 }} key={item.id}>
          <img src={item.URL} style={photoStyle} alt={item.description} />
          <br />
          {item.description}
          <br />
          {item.date}
          <div>
            <button onClick={() => handleEdit(item.id)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        </div>
      ));
    }
    return photos.map(item => (
      <div className="Box" style={{ width: 200, height: 230 }} key={item.id}>
        <img src={item.URL} style={photoStyle} alt={item.description} />
        <br />
        {item.description}
        <br />
        {item.date}
        <div>
          <button onClick={() => handleEdit(item.id)}>Edit</button>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      </div>
    ));
  };

  return (
    <div className="Photos">
      {params.catName && <h2>{params.catName}</h2>}
      <hr />
      {showPhotosByCategory()}
    </div>
  );
}

export default Photos;
