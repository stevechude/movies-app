export const getStoredFavorites = () => {
  if (typeof window !== "undefined") {
    const favs = localStorage.getItem("favorites");
    return favs ? JSON.parse(favs) : [];
  }
  return [];
};
