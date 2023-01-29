import React, { useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import api from "../api";

function DeleteModal(props) {
  const { del, setDel } = props;
  const [login, setLogin] = React.useState("");
  const [err, setErr] = React.useState(false);
  const [disable, setDisable] = React.useState(true);

  function delFunc() {
    const formData = new FormData();
    formData.append("userName", login);
    api
      .post("/remove", formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((data) => {
        if (data.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        setErr(true);
      });
  }

  useEffect(() => {
    if (login.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [login]);

  return (
    <>
      <Box
        onClick={() => setDel(false)}
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
          onClick={() => setDel(false)}
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
        <Typography className="text-center mt-4">
          Вы точно хотите удалить этого Сотрудника? <br />
          Введите его логин для потверждения
        </Typography>
        <TextField
          sx={{ mt: 3 }}
          size="small"
          margin="normal"
          required
          fullWidth
          id="login"
          label="Логин"
          name="login"
          autoComplete="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        {err && (
          <Typography color="red" fontSize={"14px"} className="w-full">
            Неправильный логин
          </Typography>
        )}
        <Button
          disabled={disable}
          onClick={() => delFunc()}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
        >
          Подтвердить
        </Button>
      </Box>
    </>
  );
}

export default DeleteModal;
