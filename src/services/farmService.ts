import axios from 'axios';
import { Farm } from '../Models/Farm';

const API_URL = 'http://localhost:5000/farms';

export const fetchFarms = async (): Promise<Farm[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createFarm = async (farm: Farm): Promise<Farm> => {
  const response = await axios.post(API_URL, farm);
  return response.data;
};

export const updateFarmService = async (
  id: number,
  farm: Farm
): Promise<Farm> => {
  const response = await axios.put(`${API_URL}/${id}`, farm);
  return response.data;
};

export const deleteFarmService = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
