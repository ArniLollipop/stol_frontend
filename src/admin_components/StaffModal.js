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
  const { isStaff, setStaff } = props;
  const [login, setLogin] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("Администратор");
  const [error, setError] = React.useState(false);
  const [disable, setDisable] = React.useState(true);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  useEffect(() => {
    if (name.length > 0 && login.length > 0 && pass.length > 4) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  });

  function regFunc() {
    const formData = new FormData();
    formData.append("fullName", name);
    formData.append("userName", login);
    formData.append("password", pass);
    formData.append("role", role);

    api
      .post("/register", formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((data) => {
        if (data.status === 200) {
          setStaff(!isStaff);
        }
      })
      .catch((err) => {
        setError(true);
      });

    console.log(login, pass);
  }

  return (
    <>
      <Box
        onClick={() => setStaff(false)}
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
        className="max-w-[450px] min-w-[300px] fixed top-20"
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
          onClick={() => setStaff(!isStaff)}
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
          Добавить нового Сотрудника
        </Typography>
        <Box sx={{ mt: 0.5 }}>
          <TextField
            sx={{ mt: 0.5 }}
            size="small"
            margin="normal"
            required
            fullWidth
            id="name"
            label="ФИО"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            sx={{ mt: 0.5 }}
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
          <TextField
            sx={{ mt: 0.5, mb: 0 }}
            size="small"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
              setError(false);
            }}
          />
          {error && (
            <Typography
              sx={{ fontSize: "14px", color: "red", mt: 1, mb: 1, ml: 1.7 }}
            >
              Пароль должен быть минимум 5 символов
            </Typography>
          )}
          <Box sx={{ minWidth: 120, mt: 2 }}>
            <TextField
              id={"role"}
              select
              label={"Роль"}
              fullWidth
              value={role ?? "Администратор"}
            >
              {roles.map((item) => (
                <MenuItem key={item} value={item} onClick={() => setRole(item)}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Button
            disabled={disable}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
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
