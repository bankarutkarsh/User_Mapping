import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "UserSlice",
  initialState: {
    modal: false,
    users: [],
    user: null,
    members: true,
    addUserModal: false,
    detailsModal:false,
    editModal: false,
    selectedUser:[]
  },
  reducers: {
    setDetailsModal(state, action){
      state.detailsModal = action.payload;
    },
    setEditModal(state, action){
      state.editModal = action.payload;
    },
    setModal(state, action) {
      state.modal = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
    setMembers(state,action){
      state.members = action.payload;
    },
    setAddUserModal(state,action){
      state.addUserModal = action.payload;
    },
  },
});

export default UserSlice;

export const { setModal, setUsers, setUser, setAddUserModal, setDetailsModal, setEditModal, setMembers, setSelectedUser } = UserSlice.actions;
