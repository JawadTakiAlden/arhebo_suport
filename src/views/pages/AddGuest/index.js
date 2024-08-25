import { AddOutlined, ArrowBack, SendOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import React from "react";
import RenderGuestInputs from "./Components/RenderGuestInputs";
import { useDispatch } from "react-redux";
import { Add_Guest, Save_Guest } from "../../../store/GuestsSlice";
import SendInvitationButton from "./Components/RenderGuestInputs/SendInvitationButton";
import { useNavigate } from "react-router-dom";

const AddGuest = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const naviagte = useNavigate();
  return (
    <Box>
      <IconButton onClick={() => naviagte(-1)}>
        <ArrowBack />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1,
        }}
      >
        <Box
          sx={{
            flexGrow: 8,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                flex: 1,
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  width: "100%",
                  borderRadius: "15px",
                  backgroundColor: "#fff",
                  boxShadow:
                    "2px 2px 10px 0px #0000001A inset , -2px -2px 10px 0px #0000001A inset",
                  py: 2,
                  textTransform: "uppercase",
                  color: "#4AB37E",
                  fontWeight: "600",
                }}
              >
                name
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  width: "100%",
                  borderRadius: "15px",
                  backgroundColor: "#fff",
                  boxShadow:
                    "2px 2px 10px 0px #0000001A inset , -2px -2px 10px 0px #0000001A inset",
                  py: 2,
                  textTransform: "uppercase",
                  color: "#4AB37E",
                  fontWeight: "600",
                }}
              >
                number
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  width: "100%",
                  borderRadius: "15px",
                  backgroundColor: "#fff",
                  boxShadow:
                    "2px 2px 10px 0px #0000001A inset , -2px -2px 10px 0px #0000001A inset",
                  py: 2,
                  textTransform: "uppercase",
                  color: "#4AB37E",
                  fontWeight: "600",
                }}
              >
                count
              </Typography>
            </Box>
          </Box>
          <RenderGuestInputs />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            position: { xs: "sticky", sm: "initial" },
            backgroundColor: theme.palette.background.default,
            zIndex: 100,
            padding: { xs: "15px", sm: "0" },
            bottom: "0",
          }}
        >
          <SendInvitationButton />
        </Box>
      </Box>
    </Box>
  );
};

export default AddGuest;
