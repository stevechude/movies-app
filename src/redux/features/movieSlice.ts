import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "@/types/movie";

interface MovieState {
  searchData: Movie[];
  searchQuery: string;
  loading: boolean;
}

const initialState: MovieState = {
  searchData: [],
  searchQuery: "",
  loading: false,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchData: (state, action: PayloadAction<Movie[]>) => {
      state.searchData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setSearchData, setSearchQuery, setLoading } = movieSlice.actions;

export default movieSlice.reducer;
