import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import Image from "../images/p04tx3m6.jpg";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function MenuCard(props) {
  const { el } = props;
  return (
    <Card className=" rounded-xl shadow-md">
      <CardActionArea>
        <CardMedia
          component="img"
          image={`http://localhost:4444/${el.imageUrl}`}
          alt="green iguana"
          className="h-[100px] sm:h-[150px]"
        />
        {el.catName}
        <CardContent className="px-2 pt-1 pb-2">
          <Typography
            variant="h6"
            component="div"
            className="font-bold text-sm"
          >
            {el.title}
          </Typography>
          <Box className="flex items-center gap-x-2">
            <Box className="flex items-center gap-[1px] text-green-500">
              <AccessTimeIcon className="w-4 h-5" />
              <Typography className="text-xs mt-[1px] font-semibold">
                {el.time}
              </Typography>
            </Box>
            <Box className="flex items-center gap-[2px] text-red-500">
              <StarBorderIcon className="w-4 h-5" />
              <Typography className="text-xs mt-[1px] font-semibold">
                {el.rating}
              </Typography>
            </Box>
          </Box>
          <Typography className=" font-extrabold mt-[2px] text-sm">
            {el.price}тг
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
