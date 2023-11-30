import { categories } from "../Models/Category";
import dal_mysql from "../Utils/dal_mysql";
import { OkPacket } from "mysql";

//photos logic
const getAllPhotos = async () => {
  const SQLcmd = `
    SELECT photos.*, categories.name as categoryName
    FROM photos
    LEFT JOIN categories ON photos.category_id = categories.category_id
  `;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};

//categories logic
const getAllCategories = async () => {
  const SQLcmd = `SELECT * FROM categories`;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};

const addCat = async (newCat: categories) => {
  const SQLcmd = `
        INSERT INTO categories
        (name)
        VALUES
        ('${newCat.name}')
    `;
  console.log(SQLcmd);
  const result: OkPacket = await dal_mysql.execute(SQLcmd);
  return result.insertId;
};

const updateCat = async (cat: categories) => {
  const SQLcmd = `
  UPDATE categories 
  SET name = '${cat.name}'
  WHERE category_id = ${cat.category_id};
  `;
  await dal_mysql.execute(SQLcmd);
  return true;
};

const deleteCatById = async (id: number) => {
  console.log(`delete cat id ${id}`);
  const SQLcmd = `DELETE FROM categories WHERE category_id=${id}`;
  await dal_mysql.execute(SQLcmd);
};

export { getAllPhotos, getAllCategories, addCat, updateCat, deleteCatById };
