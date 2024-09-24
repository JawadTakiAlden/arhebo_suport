import { Box, Button, Typography } from "@mui/material";
import React from "react";
import NavItem from "../NavItem/NavItem";
import ProfileSection from "../ProfileSection/ProfileSection";
import LanguageSwitcher from "../../../ui-components/Language";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: "#4AB37E",
        height: "80px",
        boxShadow: "0px 4px 7.5px 0px #00000021",
        px: { xs: 1, md: 4 },
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
      }}
    >
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: "600",
        }}
      >
        {t("Header.dashboard_title")}
      </Typography>

      <NavItem />
      <LanguageSwitcher />
      <ProfileSection />
      <Button
        onClick={() => {
          navigate("/");
          localStorage.removeItem("arhebo-token");
          localStorage.removeItem("arhebo-admin-profile");
        }}
        color="error"
        variant="contained"
      >
        Logout
      </Button>
    </Box>
  );
};

export default Header;
