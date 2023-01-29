import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Staff from "../admin_components/Staff";
import Category from "../admin_components/Category";
import CatModal from "../admin_components/CatModal";
import StaffModal from "../admin_components/StaffModal";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import TableBarIcon from "@mui/icons-material/TableBar";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DeleteModal from "../admin_components/DeleteModal";
import RemoveCatModal from "../admin_components/RemoveCatModal";
import UpdateCat from "../admin_components/UpdateCat";
import Menu from "../admin_components/Menu";
import AddMenuModal from "../admin_components/AddMenuModal";
import api from "../api";

function Admin(props) {
  const { admin, setAdmin } = props;
  const navigate = useNavigate();
  const btnClass = {
    width: "100%",
    color: "#dcdaeb",
    mt: "15px",
    border: "0px solid black",
    textAlign: "start",
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    gap: "4px",
    ":hover": {
      backgroundColor: "rgba(192, 139, 255, 0.16)",
      border: "0px solid rgba(192, 139, 255, 0.16)",
      color: "#c696ff",
    },
  };
  const [catModal, setCatModal] = useState(false);
  const [tabs, setTabs] = useState(1);
  const [isStaff, setStaff] = useState(false);
  const [isLeft, setLeft] = useState(false);
  const [del, setDel] = useState(false);
  const [delCat, setDelCat] = useState(false);
  const [updateCat, setUpdateCat] = useState(false);
  const [catName, setCatName] = useState("");
  const [menu, setMenu] = useState(false);
  const [cat, setCat] = React.useState([]);

  useEffect(() => {
    if (!admin) {
      navigate("/login");
    }
  }, [admin]);

  function Tabs(id) {}

  const leftClass =
    "fixed w-fit lg:h-auto z-10 lg:relative lg:w-fit transition-all duration-500 ease-in-out left-0 lg:left-0";

  React.useEffect(() => {
    api.get("/allCat").then(({ data }) => {
      setCat(data);
    });
  }, [catModal, delCat, updateCat]);

  return (
    <div className="w-full overflow-hidden">
      {catModal && <CatModal catModal={catModal} setCatModal={setCatModal} />}
      {isStaff && <StaffModal isStaff={isStaff} setStaff={setStaff} />}
      {del && <DeleteModal del={del} setDel={setDel} />}
      {delCat && <RemoveCatModal delCat={delCat} setDelCat={setDelCat} />}
      {updateCat && (
        <UpdateCat
          catName={catName}
          setCatName={setCatName}
          updateCat={updateCat}
          setUpdateCat={setUpdateCat}
        />
      )}
      {menu && <AddMenuModal menu={menu} setMenu={setMenu} />}
      <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
        <div
          className={
            isLeft ? leftClass : leftClass + "w-0 -left-[100%] lg:left-0"
          }
        >
          <Box
            className={
              "w-fit pl-0 lg:pl-2 lg:pt-4 pt-10 pr-3 rounded-r-[15px] lg:rounded-none h-full"
            }
            sx={{
              backgroundColor: "#16172d",
              minHeight: "100vh",
              color: "white",
              paddingX: "30px",
              paddingY: "20px",
              zIndex: 0,
            }}
          >
            <Button
              size="medium"
              onClick={() => {
                setTabs(1);
                setLeft(false);
              }}
              variant="outlined"
              sx={btnClass}
            >
              <PersonIcon sx={{ mt: "-2px" }} />
              Сотрудники
            </Button>
            <Button
              size="medium"
              onClick={() => {
                setTabs(2);
                setLeft(false);
              }}
              variant="outlined"
              sx={btnClass}
            >
              <CategoryIcon sx={{ mt: "-2px" }} />
              Категории
            </Button>
            <Button
              size="medium"
              onClick={() => {
                setTabs(3);
                setLeft(false);
              }}
              variant="outlined"
              sx={btnClass}
            >
              <RestaurantMenuIcon sx={{ mt: "-2px" }} />
              Меню
            </Button>
            <Button
              size="medium"
              onClick={() => {
                setTabs(4);
                setLeft(false);
              }}
              variant="outlined"
              sx={btnClass}
            >
              <PendingActionsIcon sx={{ mt: "-2px" }} />
              Заказы
            </Button>
            <Button
              size="medium"
              onClick={() => {
                setTabs(5);
                setLeft(false);
              }}
              variant="outlined"
              sx={btnClass}
            >
              <TrendingUpIcon sx={{ mt: "-2px" }} />
              Аналитика
            </Button>
            <Button
              size="medium"
              onClick={() => {
                setTabs(6);
                setLeft(false);
              }}
              variant="outlined"
              sx={btnClass}
            >
              <TableBarIcon sx={{ mt: "-2px" }} />
              Столы
            </Button>
            <Button
              size="medium"
              onClick={() => {
                setAdmin(false);
                window.localStorage.setItem("token", false);
              }}
              variant="outlined"
              sx={btnClass}
            >
              Выйти
            </Button>
          </Box>
        </div>
        <Box className="lg:w-full w-full lg:p-5 p-2">
          {tabs === 1 && (
            <Staff
              isDel={del}
              setDel={setDel}
              isLeft={isLeft}
              setLeft={setLeft}
              isStaff={isStaff}
              setStaff={setStaff}
            />
          )}
          {tabs === 2 && (
            <Category
              catName={catName}
              setCatName={setCatName}
              updateCat={updateCat}
              setUpdateCat={setUpdateCat}
              catModal={catModal}
              setCatModal={setCatModal}
              delCat={delCat}
              setDelCat={setDelCat}
              isLeft={isLeft}
              setLeft={setLeft}
              cat={cat}
              setCat={setCat}
            />
          )}
          {tabs === 3 && (
            <Menu
              cat={cat}
              setCat={setCat}
              isLeft={isLeft}
              setLeft={setLeft}
              menu={menu}
              setMenu={setMenu}
            />
          )}
          {tabs === 4 && <>Заказы</>}
          {tabs === 5 && <>Аналитика</>}
          {tabs === 6 && <>Столы</>}
        </Box>
      </Box>
    </div>
  );
}

export default Admin;
