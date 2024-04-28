import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { setDetailModal, setModal, setUser } from "../redux/user.slice";
import { TablePagination } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "../Styles/admin.scss";
import Details from "./Details";

function Admin() {
    const chunckArray = (array, size) => {
        let newArray = [];
        for(let i=0; i<array.length; i += size){
            newArray.push(array.slice(i,i+size))
        };
        return newArray;
      }
    
  let dispatch = useDispatch();
  let { modal, users, detailModal } = useSelector((state) => state.userApp);
   
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  let elem = chunckArray(users, rowsPerPage);
  const [elements,setElements] = useState(elem[0]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setElements(elem[newPage])
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };


  return (
    <div className="column">
      <div className="dashboard">
        <div className="dashboard__content">
          <div className="header">
            <div>
              <p className="title is-5 is-pulled-left font-color-dark">
                Team Members
              </p>
              <p className="control">
                <button className="button has-text-weight-bold font-color-primary">
                  Add User
                </button>
              </p>
            </div>
          </div>
          <div className="font-color-dark">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead className="tablhead has-text-weight-bold">
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Title</TableCell>
                    <TableCell align="right">City</TableCell>
                    <TableCell align="right">Username</TableCell>
                    <TableCell align="right">Locate on Map</TableCell>
                    <TableCell align="right">View Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="tablbody">
                  {elements.map((user) => (
                    <TableRow
                      key={user._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" className="is-uppercase" >
                        {user.name.firstname + " " + user.name.lastname}
                      </TableCell>
                      <TableCell align="right">{user.title}</TableCell>
                      <TableCell align="right">{user.address.city}</TableCell>
                      <TableCell align="right">{user.username}</TableCell>
                      <TableCell className="locIcon" align="right"><LocationOnIcon /></TableCell>
                      <TableCell align="right" className="details" onClick={() => {dispatch(setDetailModal(true)); dispatch(setUser(user))}}>Details</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination className="tablebottom"
              rowsPerPageOptions={[7,5]}
              component={Paper}
              count={users.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
      {detailModal && <Details />}
      {/* {modal && <MapModal />} */}
    </div>
  );
}

export default Admin;
