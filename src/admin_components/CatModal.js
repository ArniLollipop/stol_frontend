import { Box, MenuItem, Typography } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import api from "../api";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const roles = ["Администратор", "Повар", "Раннер", "Бариста", "Кальянщик"];

function StaffModal(props) {
  const navigate = useNavigate();
  const { catModal, setCatModal } = props;
  const [title, setTitle] = React.useState("");
  const [role, setRole] = React.useState("Администратор");
  const [error, setError] = React.useState(false);
  const [disable, setDisable] = React.useState(true);

  function regFunc() {
    const formData = new FormData();
    formData.append("title", title);

    api
      .post("/addCat", formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((data) => {
        if (data.status === 200) {
          setCatModal(!catModal);
        }
      });
  }

  useEffect(() => {
    if (title.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [title]);

  return (
    <>
      <Box
        onClick={() => setCatModal(false)}
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
          onClick={() => setCatModal(!catModal)}
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
        <Typography className="text-center sm:text-2xl text-lg">
          Добавить новую Категорию
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            sx={{ mt: 0.5 }}
            size="small"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Название"
            name="login"
            autoComplete="login"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            disabled={disable}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1.5, mb: 2 }}
            onClick={() => regFunc()}
          >
            Добавить
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default StaffModal;
