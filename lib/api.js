// lib/api.js
import axios from 'axios';

const API_URL = 'https://tour.tourismofkashmir.com/get_posts.php'; // Update with your PHP API URL

export const fetchPosts = async (slug = '') => {
  try {
    const response = await axios.get(`${API_URL}?slug=${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error: 'Failed to fetch data' };
  }
};
