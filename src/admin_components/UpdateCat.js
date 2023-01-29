import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import api from "../api";

function UpdateCat(props) {
  const { updateCat, setUpdateCat, catName, setCatName } = props;
  const [name, setName] = useState(catName);

  function updateFunc() {
    const formData = new FormData();
    formData.append("lastTitle", catName);
    formData.append("newTitle", name);
    api
      .post("/updateCat", formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((data) => {
        if (data.status === 200) {
          setUpdateCat(false);
        }
      });
  }

  useEffect(() => {
    if (!updateCat) {
      updateFunc();
    }
  }, [updateCat]);

  return (
    <>
      <Box
        onClick={() => setUpdateCat(false)}
        className="p-2 lg:p-0"
        sx={{
          position: "fixed",
          background: "rgba(0, 0, 0, 0.7) !important",
          width: "100%",
          height: "100%",
          zIndex: "30",
        }}
      ></Box>
      <Box
        className="max-w-[450px] min-w-[300px] fixed top-32"
        sx={{
          padding: "20px",
          paddingTop: "50px",
          borderRadius: "10px",
          backgroundColor: "white",
          zIndex: "10",
          position: "relative",
          top: "15%",
          left: "50%",
          translate: "-50%",
          zIndex: "40",
        }}
      >
        <Button
          onClick={() => setUpdateCat(false)}
          color="primary"
          sx={{
            position: "absolute",
            top: "20px",
            right: "20px",
            padding: "0px 0px",
          }}
        >
          <CloseIcon />
        </Button>
        <Typography className="text-center mt-4 text-xl">
          Изменить Название
        </Typography>
        <TextField
          sx={{ mt: 3 }}
          size="small"
          margin="normal"
          required
          fullWidth
          id="login"
          label="Название"
          name="login"
          autoComplete="login"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          onClick={() => updateFunc()}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
        >
          Сохранить
        </Button>
      </Box>
    </>
  );
}

export default UpdateCat;
