import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const userConnection = createAsyncThunk(
  'users/userConnection',
  async ({ email, password }, { dispatch, getState }) => {
    console.log(email, password);

    const user = await axios.post('http://localhost:8000/UserConnection', {
      type: 'User',
      obj: {
        email: email,
        password: password,
      },
    });
    console.log(user.data);
    return user.data;
  }
);
export const updateDogsList = createAsyncThunk(
  'users/updateDogsList',
  async ({ email, dog }) => {
    console.log(email, dog);

    const user = await axios.post('http://localhost:8000/UpdateDogsList', {
      email: email,
      dog: dog,
    });
    console.log(user.data);
    return user.data;
  }
);
export const removeDogFromDogList = createAsyncThunk(
  'users/removeDogFromDogList',
  async ({ email, pos }) => {
    console.log(email, pos);

    const user = await axios.post(
      'http://localhost:8000/RemoveDogFromDogList',
      {
        email: email,
        pos: pos,
      }
    );
    console.log(user.data);
    return user.data;
  }
);
export const userConnSlice = createSlice({
  name: 'users',
  initialState: {
    obj: {
      email: '',
      password: '',
      dogsList: [],
    },
    status: null,
  },
  reducers: {
    addDog: (state, { payload }) => {
      console.log(payload);
      state.obj.dogsList.push(payload);
      state.status = 'success';
    },
    removeDog: (state, { payload }) => {
      state.obj.dogsList = state.obj.dogsList.filter((x, i) => i != payload);
      state.status = 'success';
    },
    logIn: (state, { payload }) => {
      state.obj.email = payload.email;
      state.obj.password = payload.password;
      state.obj.dogsList = payload.dogsList;
      state.status = 'success';
    },
    logOut: (state) => {
      state.obj.email = '';
      state.obj.password = '';
      state.obj.dogsList = [];
      state.status = null;
    },
  },
  extraReducers: {
    [userConnection.pending]: (state) => {
      state.status = 'loading';
    },
    [userConnection.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.obj.email = payload.email;
        state.obj.password = payload.password;
        state.obj.dogsList = payload.dogsList;
        state.status = 'success';
      } else state.status = 'noUsers';
    },
    [userConnection.rejected]: (state, { payload }) => {
      state.status = 'failed';
    },
    [updateDogsList.pending]: (state) => {
      state.status = 'loading';
    },
    [updateDogsList.fulfilled]: (state, { payload }) => {
      state.obj.email = payload.email;
      state.obj.password = payload.password;
      state.obj.dogsList = payload.dogsList;
      state.status = 'success';
    },
    [updateDogsList.rejected]: (state, { payload }) => {
      state.status = 'failed';
    },
    [removeDogFromDogList.pending]: (state) => {
      state.status = 'loading';
    },
    [removeDogFromDogList.fulfilled]: (state, { payload }) => {
      state.obj.email = payload.email;
      state.obj.password = payload.password;
      state.obj.dogsList = payload.dogsList;
      state.status = 'success';
    },
    [removeDogFromDogList.rejected]: (state, { payload }) => {
      state.status = 'failed';
    },
  },
});
export const { clearState, logOut, logIn, addDog, removeDog } =
  userConnSlice.actions;
export default userConnSlice.reducer;
