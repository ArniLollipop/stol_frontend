import { Box, Input, MenuItem, Typography } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import api from "../api";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function AddMenuModal(props) {
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const [price, setPrice] = React.useState();
  const [disable, setDisable] = React.useState(true);
  const { menu, setMenu } = props;
  const [cats, setCats] = React.useState([]);
  const [image, setImage] = React.useState("");
  const [cat, setCat] = React.useState("");
  const [time, setTime] = React.useState();
  const inputRef = useRef(null);

  function regFunc() {
    const formData = new FormData();
    formData.append("imageUrl", image);
    formData.append("catTitle", cat);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("time", time);
    formData.append("composition", text);
    api
      .post("/addMenu", formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((data) => {
        if (data.status === 200) {
          setMenu(!menu);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    api.get("/allCat").then(({ data }) => {
      setCats(data);
    });
  }, [menu]);

  React.useEffect(() => {
    if (
      image.length > 0 &&
      cat.length > 0 &&
      time > 0 &&
      price > 0 &&
      text.length > 0 &&
      title.length > 0
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [image, cat, time, price, text, title]);

  const newclass = {
    backgroundColor: "#16172d",
    color: "white",
    paddingX: "24px",
    zIndex: "0",
    mt: 1,
    mb: 1,
    ":hover": {
      backgroundColor: "#16172d",
      color: "white",
    },
  };

  const newFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    await api.post("/upload", formData).then((data) => setImage(data.data.url));
  };

  return (
    <>
      <Box
        onClick={() => setMenu(false)}
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
          onClick={() => setMenu(!menu)}
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
          Добавить новое меню
        </Typography>
        <Box sx={{ minWidth: 120, mt: 1 }}>
          <TextField
            id={"role"}
            select
            label={"Категория"}
            size="small"
            fullWidth
            value={cat}
          >
            {cats.map((item) => (
              <MenuItem
                key={item.id}
                value={item.title}
                onClick={() => setCat(item.title)}
              >
                {item.title}
              </MenuItem>
            ))}
          </TextField>
        </Box>
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
          <TextField
            sx={{ mt: 0.5, height: "fit-content" }}
            size="small"
            margin="normal"
            required
            fullWidth
            id="description"
            label="Описание"
            name="description"
            autoComplete="description"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <TextField
            sx={{ mt: 0.5, height: "fit-content" }}
            type="number"
            size="small"
            margin="normal"
            required
            fullWidth
            id="time"
            label="Время готовки"
            name="time"
            autoComplete="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <TextField
            sx={{ mt: 0.5 }}
            type="number"
            size="small"
            margin="normal"
            required
            fullWidth
            id="price"
            label="Цена"
            name="price"
            autoComplete="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button
            onClick={() => inputRef.current.click()}
            type="submit"
            fullWidth
            variant="contained"
            sx={newclass}
          >
            Добавить картинку
          </Button>
          {image !== "" && (
            <Typography sx={{ fontSize: "14px", color: "gray" }}>
              Картинка загрузилась!
            </Typography>
          )}
          <input
            ref={inputRef}
            type="file"
            onChange={newFile}
            className="hidden"
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

export default AddMenuModal;
