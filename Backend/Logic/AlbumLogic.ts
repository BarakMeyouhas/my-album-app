import dal_mysql from "../Utils/dal_mysql";
import { OkPacket } from "mysql";

const getAllPhotos = async () => {
  const SQLcmd = `
    SELECT photos.*, categories.name as categoryName
    FROM photos
    LEFT JOIN categories ON photos.category_id = categories.category_id
  `;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};

const getAllCategories = async () => {
  const SQLcmd = `SELECT * FROM categories`;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};

export { getAllPhotos, getAllCategories };
