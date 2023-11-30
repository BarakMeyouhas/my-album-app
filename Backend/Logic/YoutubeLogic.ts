//add song, update song, delete song by id, getSongById, getAllSongs

import dal_mysql from "../Utils/dal_mysql";
import Song from "../Models/Song";
import { OkPacket } from "mysql";
import { Category } from "../../Frontend/src/Components/modal/Category";

const getAllSongs = async () => {
  //const SQLcmd = "SELECT * FROM songs";
  const SQLcmd = `
    SELECT songs.*, category.name as categoryName
    FROM songs JOIN category
    ON songs.category = category.id
  `;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};

const getSongById = async (id: number) => {
  // const SQLcmd =
  // `
  //   SELECT songs.*, category.name as categoryName
  //   FROM songs JOIN category
  //   ON songs.category = category.id
  //   WHERE id=${id}
  // `;
  const SQLcmd = `SELECT * FROM songs WHERE id=${id}`;

  const data = await dal_mysql.execute(SQLcmd);
  return data;
};

const deleteSongById = async (id: number) => {
  console.log(`delete song id ${id}`);
  const SQLcmd = `DELETE FROM songs WHERE id=${id}`;
  await dal_mysql.execute(SQLcmd);
};

const addSong = async (newSong: Song) => {
  const SQLcmd = `
    INSERT INTO songs
    (description, img, title, url, category)
    VALUES
    ('${newSong.description}', '${newSong.img}', '${newSong.title}', '${newSong.url}', ${newSong.category})
  `;
  console.log(SQLcmd);
  const result: OkPacket = await dal_mysql.execute(SQLcmd);
  return result.insertId;
};

const updateSong = async (song: Song) => {
  const SQLcmd = `
    UPDATE songs 
    SET description = '${song.description}', img = '${song.img}', title = '${song.title}', category = '${song.category}'
    WHERE id = ${song.id};
  `;
  await dal_mysql.execute(SQLcmd);
  return true;
};

const catList = async () => {
  const SQLcmd = "SELECT * FROM category";
  const data = await dal_mysql.execute(SQLcmd);

  return data;
};

const getCatById = async (id: number) => {
  const SQLcmd = `SELECT * FROM category WHERE id=${id}`;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};

const deleteCatById = async (id: number) => {
  console.log(`delete cat id ${id}`);
  const SQLcmd = `DELETE FROM category WHERE id=${id}`;
  await dal_mysql.execute(SQLcmd);
};

const addCat = async (newCat: Category) => {
  const SQLcmd = `
        INSERT INTO category
        (name)
        VALUES
        ('${newCat.name}')
    `;
  console.log(SQLcmd);
  const result: OkPacket = await dal_mysql.execute(SQLcmd);
  return result.insertId;
};

const updateCat = async (cat: Category) => {
  const SQLcmd = `
  UPDATE category 
  SET name = '${cat.name}'
  WHERE id = ${cat.id};
  `;
  await dal_mysql.execute(SQLcmd);
  return true;
};

const updateFavoriteStatus = async (songId: number, favorite: boolean) => {
  const SQLcmd = `
    UPDATE Songs
    SET favorite = ${favorite ? 1 : 0}
    WHERE id = ${songId};
  `;

  await dal_mysql.execute(SQLcmd);
  return true;
};

const getFavoriteSongs = async () => {
  const SQLcmd = `
    SELECT * FROM Songs
    WHERE favorite = 1;
  `;

  const result = await dal_mysql.execute(SQLcmd);
  return result;
};

export {
  getAllSongs,
  getSongById,
  deleteSongById,
  addSong,
  updateSong,
  catList,
  getCatById,
  deleteCatById,
  addCat,
  updateCat,
  updateFavoriteStatus,
  getFavoriteSongs,
};
