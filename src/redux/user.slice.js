import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "UserSlice",
  initialState: {
    modal: false,
    users: [],
    user: null,
    members: true,
    detailModal: false
  },
  reducers: {
    setModal(state, action) {
      state.modal = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setMembers(state,action){
      state.members = action.payload;
    },
    setDetailModal(state,action){
      state.detailModal = action.payload;
    },
  },
});

export default UserSlice;

export const { setModal, setUsers, setUser, setDetailModal, setMembers } = UserSlice.actions;
