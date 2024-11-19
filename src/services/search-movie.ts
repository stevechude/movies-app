import { MovieApiResponse } from "@/types/movie";
import axios from "axios";

export const searchMovies = async (
  query: string
): Promise<MovieApiResponse> => {
  if (!query.trim()) {
    console.warn("Empty search query, skipping request.");
    return { results: [], page: 1, total_pages: 0, total_results: 0 };
  }

  try {
    const response = await axios.get<MovieApiResponse>(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          api_key: "abc5f689798415ed3cbe004c78a01b2b", // Include your API key here
          query: query.trim(), // Pass the query string as a key-value pair
        },
      }
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw new Error("Failed to fetch search results");
  }
};
