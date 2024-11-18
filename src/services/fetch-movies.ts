import axios from "axios";

// const ApiKey = process.env.NEXT_PUBLIC_API_KEY;
// console.log(ApiKey);

export const fetchMovieList = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=abc5f689798415ed3cbe004c78a01b2b`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
