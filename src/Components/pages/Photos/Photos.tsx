import { useParams } from "react-router-dom";
import { store } from "../../redux/Store";
import "./Photos.css";

function Photos(): JSX.Element {
  const params = useParams();
  const photoStyle = {
    width: 200,
    height: 200,
  };

  const showAllPhotos = () => {
    return store.getState().photos.allPhotos.map(item => (
      <div className="Box" style={{ width: 200, height: 230 }} key={item.id}>
        <img src={item.URL} style={photoStyle} alt={item.description} />
        <br />
        {item.description}
        <br />
        {item.date}
      </div>
    ));
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
        </div>
      ));
    }
    return showAllPhotos(); // Display all photos if no category is selected
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
