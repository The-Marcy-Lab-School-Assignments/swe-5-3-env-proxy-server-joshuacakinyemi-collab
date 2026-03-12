

export const getTrendingGifs = async () => {
  try {
    const response = await fetch(`/api/gifs`);

    if (!response.ok) {
      throw new Error(`Fetch failed with status - ${response.status}, ${response.statusText}`);
    }

    const responseData = await response.json();

    return { data: responseData, error: null };
  } catch (error) {
    console.warn(error);
    return { data: null, error };
  }
};

export const getGifsBySearch = async (searchTerm) => {
  try {
    const response = await fetch(`/api/gifs?searchTerm=${searchTerm}`);

    if (!response.ok) {
      throw new Error(`Fetch failed with status - ${response.status}, ${response.statusText}`);
    }

    const responseData = await response.json();

    return { data: responseData, error: null };
  } catch (error) {
    console.warn(error);
    return { data: null, error };
  }
};
