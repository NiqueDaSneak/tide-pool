import axios from 'axios';
import { Cruise } from './types';

const API_URL = 'https://www.gmrt.org/services/GmrtCruises.php';

export const fetchCruises = async (): Promise<Cruise[]> => {
  try {
    const response = await axios.get<Cruise[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching cruises:', error);
    return [];
  }
};
