import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const postAllDogs = createAsyncThunk(
  'allDogsReducer/postAllDogs',
  async () => {
    try {
      const AllDogs = await axios.post('http://localhost:8000/GetAllDogs');
      const data = await AllDogs.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const postAvilable = createAsyncThunk(
  'allDogsReducer/postAvilable',
  async ({ obj, avilable }) => {
    console.log(obj._id);
    try {
      const result = await axios.post('http://localhost:8000/Avilable', {
        id: obj._id,
        avilable: avilable,
      });
      const data = await result.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const allDogsSlice = createSlice({
  name: 'allDogsReducer',
  initialState: {
    obj: [],
    status: null,
  },
  reducers: {
    setObj: (state, action) => {
      state.obj = action.payload;
    },
    //Settimg for values by key of employeer_reducer.
    setValuesByKey: (state, action) => {
      if (action.payload['key'] !== 'adoption')
        state.obj[action.payload['key']] = action.payload['value'];
    },
    setValuesByKey1: (state, action) => {
      state.obj[action.payload['key']].avilable = action.payload['value'];
    },
  },
  extraReducers: {
    //_____________________________________
    [postAllDogs.pending]: (state, action) => {
      state.status = 'loading';
    },
    [postAllDogs.fulfilled]: (state, { payload }) => {
      state.obj = payload;
      state.status = 'success';
    },
    [postAllDogs.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export const { setValuesByKey, setValuesByKey1, setObj } = allDogsSlice.actions;
export default allDogsSlice.reducer;
