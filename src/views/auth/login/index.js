import React from "react";
import LoginForm from "./LoginForm";
import { Box, Typography } from "@mui/material";
import { exporter } from "../../../assets/exporter";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { md: "row", xs: "column" },
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          flex: { md: 1 },
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "48px",
            color: "#222222",
            textAlign: "center",
            mb: 3,
          }}
        >
          {t("Login.title")}
        </Typography>

        <Typography
          sx={{
            fontWeight: "400",
            fontSize: "20",
            color: "#777777",
            textAlign: "center",
            mb: 3,
          }}
        >
          {t("Login.main_title")}
        </Typography>

        <LoginForm />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "block" },
        }}
      >
        <img src={exporter.Login} alt="login" style={{ maxWidth: "100%" }} />
      </Box>
    </Box>
  );
};

export default Login;
