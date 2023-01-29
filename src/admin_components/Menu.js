import { Box, Button, Typography, TextField, MenuItem } from "@mui/material";
import React, { useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import api from "../api";
import MenuCard from "../general/MenuCard";

function Menu(props) {
  const { isLeft, setLeft, menu, setMenu, cat, setCat } = props;
  const [menus, setMenus] = useState([]);
  const [isCat, setIsCat] = useState("");
  const [search, setSearch] = useState("");

  React.useEffect(() => {
    api.get("/getAllMenu").then(({ data }) => {
      setMenus(data);
    });
  }, [menu]);

  const newclass = {
    backgroundColor: "#16172d",
    color: "white",
    paddingX: "24px",
    zIndex: "0",
    ":hover": {
      backgroundColor: "#16172d",
      color: "white",
    },
  };

  function leftState() {
    setLeft(false);
  }

  function catFilter(filt) {
    if (isCat === "Все") {
      return filt.catTitle.includes("");
    } else if (filt.catTitle === isCat) {
      return filt.catTitle === isCat;
    } else if (isCat === "") {
      return filt.catTitle.includes("");
    }
  }

  return (
    <div>
      <div>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box className="flex items-center gap-x-2">
            <Button
              onClick={() => setLeft(!isLeft)}
              className="border-0 z-20 bg-transparent lg:hidden bg-[#16172d] p-1 rounded-3xl flex items-center justify-center"
            >
              <MenuIcon className="text-white w-7 h-7" />
            </Button>
            <Typography
              className="lg:text-[40px] sm:text-[30px] text-[20px] font-bold sm:block hidden"
              sx={{ fontFamily: "700", fontSize: "40px" }}
            >
              Меню
            </Typography>
          </Box>
          <Button
            className="lg:px-6 px-3 sm:text-base text-sm"
            onClick={() => {
              setLeft(false);
              setMenu(!menu);
            }}
            sx={newclass}
          >
            Добавить Меню
          </Button>
        </Box>
        <Box onClick={() => setLeft(false)}>
          <Typography
            className="lg:text-[40px] sm:text-[30px] text-[30px] font-bold mt-4 sm:hidden"
            sx={{ fontFamily: "700", fontSize: "40px" }}
          >
            Меню
          </Typography>
          <Box className="mt-2 flex items-center gap-x-2">
            <TextField
              className="min-w-[150px]"
              id={"role"}
              select
              size="small"
              label={"Категория"}
              value={isCat ?? "Все"}
            >
              {cat.map((item) => (
                <MenuItem
                  key={item.title}
                  value={item.title}
                  onClick={() => setIsCat(item.title)}
                >
                  {item.title}
                </MenuItem>
              ))}
              <MenuItem key="Все" value="Все" onClick={() => setIsCat("Все")}>
                Все
              </MenuItem>
            </TextField>
            <TextField
              id="filled-hidden-label-small"
              label="По Названию"
              variant="outlined"
              size="small"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
          <div className="grid grid-cols-2 gap-5 px-1 sm:grid-cols-3 mt-4 pb-5">
            {menus
              .filter((filt) => catFilter(filt))
              .filter((filt) =>
                filt.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((el) => {
                return <MenuCard key={el.id} el={el} className="col-span-1" />;
              })}
          </div>
        </Box>
      </div>
    </div>
  );
}

export default Menu;
