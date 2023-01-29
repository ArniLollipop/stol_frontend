import { Box, Button, Typography, TextField, MenuItem } from "@mui/material";
import React, { useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import api from "../api";
import { useEffect } from "react";
import SettingsIcon from "@mui/icons-material/Settings";

function Category(props) {
  const {
    catModal,
    setCatModal,
    isLeft,
    setLeft,
    delCat,
    setDelCat,
    updateCat,
    setUpdateCat,
    catName,
    setCatName,
    cat,
    setCat,
  } = props;

  const [category, setCategory] = React.useState("");
  const [search, setSearch] = useState("");

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
              Категории
            </Typography>
          </Box>
          <Button
            className="lg:px-6 px-3 sm:text-base text-sm"
            onClick={() => {
              setCatModal(!catModal);
              setLeft(false);
            }}
            sx={newclass}
          >
            Добавить Категорию
          </Button>
        </Box>
        <Box onClick={() => setLeft(false)}>
          <Typography
            className="lg:text-[40px] sm:text-[30px] text-[30px] font-bold mt-4 sm:hidden"
            sx={{ fontFamily: "700", fontSize: "40px" }}
          >
            Категории
          </Typography>
          <Box className="sm:mt-6 mt-2 w-[200px]">
            <TextField
              className="w-[200px]"
              id="filled-hidden-label-small"
              label="Поиск по Названию"
              variant="outlined"
              size="small"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
          <Box onClick={() => setLeft(false)} className=" mt-4">
            <div className="grid grid-cols-3 pl-[12px]"></div>
            <Box
              sx={{
                width: "100%",
                border: "2px solid #16172d",
                borderRadius: "6px",
                fontSize: "18px",
                justifyContent: "space-between",
                mt: "5px",
              }}
            >
              {cat
                .filter((filt) =>
                  filt.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((el) => {
                  return (
                    <Box
                      key={el._id}
                      className="w-full relative sm:py-5 py-2 last:border-0 border-b-2 border-black pl-[10px]"
                      sx={{ borderBottom: "2px solid #16172d" }}
                    >
                      <Box className="w-full sm:grid grid-cols-3">
                        <Typography className="sm:col-span-1 col-span-3 pl-1">
                          {el.title}
                        </Typography>
                      </Box>
                      <Box className="absolute sm:top-5 top-2 right-4 flex items-center gap-2">
                        <Button
                          onClick={() => {
                            setUpdateCat(!updateCat);
                            setCatName(el.title);
                          }}
                          color="primary"
                          sx={{ minWidth: "0px", padding: "0" }}
                        >
                          <SettingsIcon />
                        </Button>
                        <Button
                          onClick={() => setDelCat(!delCat)}
                          color="error"
                          sx={{ minWidth: "0px", padding: "0" }}
                        >
                          <RemoveCircleOutlineIcon />
                        </Button>
                      </Box>
                    </Box>
                  );
                })}
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default Category;
