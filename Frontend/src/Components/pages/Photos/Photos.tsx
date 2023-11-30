import { useNavigate, useParams } from "react-router-dom";
import { store } from "../../redux/Store";
import "./Photos.css";
import { deletePhotoAction } from "../../redux/PhotosReducer";
import { updatePhotoAction } from "../../redux/PhotosReducer";
import { useEffect, useState } from "react";

function Photos(): JSX.Element {
  useEffect(() => {}, []);

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
    const filteredPhotos = photos.filter(
      (item) =>
        !params.categoryName || item.categoryName === params.categoryName
    );

    return filteredPhotos.map((item) => (
      <div key={item.id} className="Box" style={{ width: 200, height: 230 }}>
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
          <button onClick={() => handleEdit(item.id)}>Edit</button>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      </div>
    ));
  };

  return (
    <div className="Photos" style={{ overflowY: "auto", maxHeight: "80vh" }}>
      {params.categoryName && <h2>{params.categoryName}</h2>}
      <hr />
      {showPhotosByCategory()}
    </div>
  );
}

export default Photos;
