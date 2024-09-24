import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  guests: [],
  initialState: {
    name: "",
    number: "",
    count: 1,
    message: "",
    nickname: "",
  },
  save: true,
};

const GuestSlice = createSlice({
  name: "guests",
  initialState,
  reducers: {
    SET_GUESTS: (state, action) => {
      state.guests = action.payload;
    },
    Add_Guest: (state, action) => {
      const maxId = Math.max(...state.guests.map((guest) => guest.id), 0);
      state.guests.push({
        id: maxId + 1,
        ...action.payload,
      });
      // state.save = false;
    },
    Update_Guest_Name: (state, action) => {
      const requestedObject = state.guests.filter(
        (obj) => obj.id === action.payload.id
      )[0];
      requestedObject.name = action.payload.name;
      // state.save = false;
    },
    Update_Guest_Number: (state, action) => {
      const requestedObject = state.guests.filter(
        (obj) => obj.id === action.payload.id
      )[0];
      requestedObject.number = action.payload.number;
    },
    Update_Guest_Count: (state, action) => {
      const requestedObject = state.guests.filter(
        (obj) => obj.id === action.payload.id
      )[0];
      requestedObject.count = action.payload.count;
    },
    Set_Initial_State: (state, action) => {
      state.initialState = action.payload;
    },
    Save_Guest: (state) => {
      state.save = true;
    },
    Delete_Guest: (state, action) => {
      state.guests = state.guests.filter(
        (obj) => obj.id !== +action.payload.id
      );
    },
  },
});

export default GuestSlice;

export const {
  Add_Guest,
  Update_Guest_Name,
  Update_Guest_Number,
  Update_Guest_Count,
  Save_Guest,
  Delete_Guest,
  Set_Initial_State,
  SET_GUESTS,
} = GuestSlice.actions;
