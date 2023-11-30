import { useEffect, useState } from "react";
import Categories from "../Categories/Categories";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import "./MainLayout.css";
import { store } from "../../redux/Store";
import { downloadCategoriesAction } from "../../redux/CategoriesReducer";
import { downloadPhotoAction } from "../../redux/PhotosReducer";
import MainRoutes from "../../Routs/MainRouts/MainRouts";
import axios from "axios";
//test

function MainLayout(): JSX.Element {
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    if (store.getState().category.categories.length < 1) {
      axios
        .get("http://localhost:4000/api/v1/album/catList")
        .then((response) => response.data)
        .then((result) => {
          store.dispatch(downloadCategoriesAction(result));
          setRefresh(true);
        });
    }
    if (store.getState().photos.allPhotos.length < 1) {
      axios
        .get("http://localhost:4000/api/v1/album/PhotosList")
        .then((response) => response.data)
        .then((result) => {
          store.dispatch(downloadPhotoAction(result));
          setRefresh(true);
        });
    }
  }, []);
  return (
    <div className="MainLayout">
      <header>
        <Header />
      </header>
      <div className="categories">
        <Categories />
      </div>
      <aside>
        <Menu />
      </aside>
      <main>
        <MainRoutes />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default MainLayout;
