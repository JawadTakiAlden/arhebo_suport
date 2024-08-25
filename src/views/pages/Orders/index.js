import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { gridSpacing } from "../../../constant";
import SearchBar from "./components/SearchBar/SearchBar";
import Customtable from "../../../layouts/CustomTable";
import { useTranslation } from "react-i18next";

const Orders = () => {
  const {t} = useTranslation()
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
          {t('Orders.header')}
        </Typography>
      </Box>
      <Customtable />
    </Box>
  );
};

export default Orders;
