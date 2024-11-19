import { MovieApiResponse } from "@/types/movie";
import axios from "axios";

// const ApiKey = process.env.NEXT_PUBLIC_API_KEY;
// console.log(ApiKey);
// `https://api.themoviedb.org/3/movie/now_playing?api_key=abc5f689798415ed3cbe004c78a01b2b`

export const fetchMovieList = async (): Promise<MovieApiResponse> => {
  try {
    const response = await axios.get<MovieApiResponse>(
      `https://api.themoviedb.org/3/discover/movie?api_key=abc5f689798415ed3cbe004c78a01b2b`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
