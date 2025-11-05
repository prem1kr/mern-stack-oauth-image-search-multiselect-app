import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const UNSPLASH_BASE = "https://api.unsplash.com";

export const unsplash = axios.create({
  baseURL: UNSPLASH_BASE,
  headers: {
    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
  },
});



export const searchPhotos = async (term, options = { per_page: 40, page: 1 }) => {
  const { data } = await unsplash.get("/search/photos", {
    params: {
      query: term,
      per_page: options.per_page,
      page: options.page,
    },
  });
  return data; 
};
