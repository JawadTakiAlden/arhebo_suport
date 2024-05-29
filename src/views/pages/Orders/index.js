import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { gridSpacing } from "../../../constant";
import SearchBar from "./components/SearchBar/SearchBar";
import Customtable from "../../../layouts/CustomTable";

const Orders = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            color: "#222222",
            fontSize: "24px",
            fontWeight: "500",
            textTransform: "capitalize",
          }}
        >
          Orders
        </Typography>
      </Box>
      <Customtable />
    </Box>
  );
};

export default Orders;
