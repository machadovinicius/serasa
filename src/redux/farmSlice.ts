import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Farm } from '../Models/Farm';
import axios from 'axios';

interface FarmsState {
  farms: Farm[];
  selectedFarm: Farm | null;
  loading: boolean;
}

const initialState: FarmsState = {
  farms: [],
  selectedFarm: null,
  loading: false,
};

export const fetchFarms = createAsyncThunk('farms/fetchFarms', async () => {
  const response = await axios.get('http://localhost:5000/farms');
  return response.data as Farm[];
});

export const deleteFarmAsync = createAsyncThunk(
  'farms/deleteFarm',
  async (id: string) => {
    await axios.delete(`http://localhost:5000/farms/${id}`);
    return id;
  }
);

const farmsSlice = createSlice({
  name: 'farms',
  initialState,
  reducers: {
    addFarm(state, action: PayloadAction<Farm>) {
      state.farms.push(action.payload);
    },
    updateFarm(state, action: PayloadAction<Farm>) {
      const index = state.farms.findIndex(
        (farm) => farm.id === action.payload.id
      );
      if (index !== -1) {
        state.farms[index] = action.payload;
      }
    },
    selectFarmToEdit(state, action: PayloadAction<Farm>) {
      state.selectedFarm = action.payload;
    },
    clearSelectedFarm(state) {
      state.selectedFarm = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFarms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFarms.fulfilled, (state, action: PayloadAction<Farm[]>) => {
        state.farms = action.payload;
        state.loading = false;
      })
      .addCase(fetchFarms.rejected, (state) => {
        state.loading = false;
      })
      .addCase(
        deleteFarmAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.farms = state.farms.filter(
            (farm) => farm.id !== action.payload
          );
        }
      );
  },
});

export const { addFarm, updateFarm, selectFarmToEdit, clearSelectedFarm } =
  farmsSlice.actions;

export default farmsSlice.reducer;
