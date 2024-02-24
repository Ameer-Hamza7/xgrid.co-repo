import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const columns = [
  { field: "id", headerName: "User ID", width: 70 },
  { field: "pid", headerName: "Post ID", width: 130 },
  { field: "title", headerName: "Title", width: 130 },
  { field: "body", headerName: "Body", width: 130 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "uname", headerName: "Username", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  { field: "addrs", headerName: "Address", width: 130 },
  { field: "phone", headerName: "Phone", width: 130 },
  { field: "web", headerName: "Website", width: 130 },
  { field: "comp", headerName: "Company", width: 130 },
];

// {
//   "userId": 1,
//   "id": 1,
//   "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//   "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
// }

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function App() {
  const styles = {
    dark: {
      background: "#0f1924",
      color: "white",
      border: "gray",
    },
    light: {
      background: "white",
      color: "black",
      border: "gray",
    },
  };
  const [theme, setThme] = useState("light");
  const [JsonPlaceHolderData, setJsonPlaceHolderData] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) =>
        json.map((eachPost) => {
          console.log("Each Post: ", eachPost);
          fetch(`https://jsonplaceholder.typicode.com/users/${eachPost.userId}`)
            .then((res) => res.json())
            .then((js) => {
              console.log("Each JsonPlaceHolderData: ", JsonPlaceHolderData);
              setJsonPlaceHolderData([
                ...JsonPlaceHolderData,
                {
                  id: eachPost.id,
                  title: eachPost.title,
                  body: eachPost.body,
                  uid: js.id,
                  addrs: `${js.address.suite} ${js.address.street} ${js.address.city}`,
                  email: js.email,
                  phone: js.phone,
                  uname: js.username,
                  web: js.website,
                  name: js.name,
                  comp: js.company.name,
                },
              ]);
            });
        })
      );
  }, []);

  return (
    <div
      style={{
        height: "100%",
        width: "cover",
        padding: 20,
        background: styles[theme].background,
      }}
    >
      <button
        onClick={() => (theme == "light" ? setThme("dark") : setThme("light"))}
      >
        Change Theme
      </button>
      {JsonPlaceHolderData
        ? console.log(JsonPlaceHolderData)
        : console.log("Nothing there! ")}
      {JsonPlaceHolderData.length ? (
        <DataGrid
          rows={JsonPlaceHolderData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          style={styles[theme]}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
