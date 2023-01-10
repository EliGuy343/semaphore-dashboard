import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../components/Header";
import { db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let usersQuery = query(
      collection(db, 'users')
    )

    getDocs(usersQuery).then(result => {
      setUsers(result.docs);
    });
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1
    }
  ]
  return (
    <Box m="20px">
      <Header title="Users" subtitle="Managing Users" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={
            users.map((user)=> ({
              id:user.id,
              email: user.data().email,
              name: user.data().name,
              location: user.data().location
            }))}
          columns={columns}
        />
      </Box>
    </Box>
  )
}

export default Users;