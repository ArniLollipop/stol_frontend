import { Box, Button, Typography, TextField, MenuItem } from "@mui/material";
import React, { useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import api from "../api";
import { useEffect } from "react";
import HistoryIcon from "@mui/icons-material/History";

const roles = [
  "Администратор",
  "Повар",
  "Раннер",
  "Бариста",
  "Кальянщик",
  "Все",
];

function Staff(props) {
  const [staffs, setStaffs] = React.useState([]);
  const [role, setRole] = React.useState("");
  const [search, setSearch] = useState("");
  const { isStaff, setStaff, isLeft, setLeft, del, setDel } = props;

  React.useEffect(() => {
    api.get("/getAll").then(({ data }) => {
      setStaffs(data);
    });
  }, [isStaff, del]);

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

  function roleFilter(filt) {
    if (role === "Все") {
      return filt.role.includes("");
    } else if (filt.role.includes(role)) {
      return filt.role.includes(role);
    }
  }

  // function delFunc(userName) {
  //   const formData = new FormData();
  //   formData.append("userName", userName);

  //   api.post("/remove", formData, {
  //     headers: { "Content-Type": "application/json" },
  //   });
  // }

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
              Сотрудники
            </Typography>
          </Box>
          <Button
            className="lg:px-6 px-3 sm:text-base text-sm"
            onClick={() => {
              setStaff(!isStaff);
              setLeft(false);
            }}
            sx={newclass}
          >
            Добавить Сотрудника
          </Button>
        </Box>
        <Box onClick={() => setLeft(false)}>
          <Typography
            className="lg:text-[40px] sm:text-[30px] text-[30px] font-bold mt-4 sm:hidden"
            sx={{ fontFamily: "700", fontSize: "40px" }}
          >
            Сотрудники
          </Typography>
          <Box className="mt-6 flex items-center gap-x-2">
            <TextField
              className="min-w-[150px]"
              id={"role"}
              select
              size="small"
              label={"Роль"}
              value={role ?? "Администратор"}
            >
              {roles.map((item) => (
                <MenuItem key={item} value={item} onClick={() => setRole(item)}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="filled-hidden-label-small"
              label="Поиск по Фио"
              variant="outlined"
              size="small"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
          <Box onClick={() => setLeft(false)} className=" mt-4">
            <div className="grid grid-cols-3 pl-[12px]">
              <Typography className="col-span-1 sm:block hidden">
                ФИО
              </Typography>
              <Typography className="sm:col-span-1 sm:block hidden">
                User
              </Typography>
              <Typography className="sm:col-span-1 sm:block hidden">
                Роль
              </Typography>
            </div>
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
              {staffs
                .filter((filt) => roleFilter(filt))
                .filter((filt) =>
                  filt.fullName.toLowerCase().includes(search.toLowerCase())
                )
                .map((el) => {
                  return (
                    <Box
                      key={el._id}
                      className="w-full relative sm:py-5 py-2 last:border-0 border-b-2 border-black pl-[10px]"
                      sx={{ borderBottom: "2px solid #16172d" }}
                    >
                      <Box className="w-full sm:grid grid-cols-3">
                        <Typography className="sm:col-span-1 col-span-3">
                          {el.fullName}
                        </Typography>
                        <Typography className="sm:col-span-1 w-fit">
                          {el.username}
                        </Typography>
                        <Typography className="sm:col-span-1 w-fit">
                          {el.role}
                        </Typography>
                      </Box>
                      <Box className="absolute sm:top-5 top-8 right-4 flex items-center gap-2">
                        <Button
                          color="primary"
                          sx={{ minWidth: "0px", padding: "0" }}
                        >
                          <HistoryIcon />
                        </Button>
                        <Button
                          onClick={() => setDel(!del)}
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

export default Staff;
