import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import useDynamicTextColorComponent from "./useDynamicTextColorComponent.js";
import useGetTextColorBasedOnRGB from "./useGetTextColorBasedOnRGB.js";
import pinkImage from "../../../../assets/download (1).jpeg";
import { EastOutlined, ImageOutlined } from "@mui/icons-material";

const PublicEventInfo = ({ data }) => {
  // const { r, g, b } = useDynamicTextColorComponent(data?.template);
  // const textColor = useGetTextColorBasedOnRGB([r, g, b]);
  return (
    <Box
      sx={{
        borderRadius: "8px",
        transition: "0.3s",
        backdropFilter: "blur(10px)",
        // backgroundImage: `linear-gradient(90deg , rgb(${r} , ${g} , ${b}) , rgb(${b} , ${g} , ${r}))`,
        height: "100%",
        backgroundImage:(theme) => `linear-gradient(90deg , ${theme.palette.success.light} , ${theme.palette.success.dark})`,
        position: "relative",
        overflow: "hidden",
        // color: `rgb(${textColor[0]} , ${textColor[1]} , ${textColor[2]})`,
        color : 'white',
        "& *": {
          color: "inherit",
        },
      }}
    >
      <Box
        sx={{
          backdropFilter: "blur(15px)",
          p: 2,
          width: "100%",
          height: "100%",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            right: "10px",
            top: "10px",
            // color: `rgb(${textColor[0]} , ${textColor[1]} , ${textColor[2]})`,
          }}
          component={"a"}
          href={data?.template}
          target="_blank"
        >
          <ImageOutlined />
        </IconButton>
        <Typography
          sx={{
            position: "relative",
            width: "fit-content",
            fontSize: "25px",
            fontWeight: "600",
            textTransform: "capitalize",
            mb: 4,
            "&::after": {
              content: "''",
              position: "absolute",
              width: "110%",
              bottom: "-10px",
              height: "2px",
              // backgroundColor: `rgb(${textColor[0]} , ${textColor[1]} , ${textColor[2]})`,
              left: 0,
            },
            "&::before": {
              content: "''",
              position: "absolute",
              width: "10px",
              bottom: "-14px",
              height: "10px",
              borderRadius: "50%",
              // backgroundColor: `rgb(${textColor[0]} , ${textColor[1]} , ${textColor[2]})`,
              right: "calc(-10% - 5px)",
            },
          }}
        >
          Public Event Information
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "70%" },
            }}
          >
            <Typography
              sx={{
                mb: 1,
              }}
            >
              Inviter : {data?.inviter}
            </Typography>
            <Typography
              sx={{
                mb: 1,
              }}
            >
              City : {data?.city || "Not Found"}
            </Typography>
            {/* <Typography
              sx={{
                mb: 1,
              }}
            >
              {data?.is_with_qr ? "With QR" : "Without QR"}
            </Typography> */}
            <Typography
              sx={{
                mb: 1,
              }}
            >
              Location :
              <a
                style={{ display: "inline-block", textDecoration: "underline" }}
                href={data?.location_link}
              >
                Open Link
              </a>
            </Typography>
            <Typography
              sx={{
                mb: 1,
              }}
            >
              Region : {data?.region || "Not Found"}
            </Typography>
            {data?.invitationInput?.map((obj) => (
              <Typography
                sx={{
                  mb: 1,
                }}
              >
                {obj?.name} : {obj?.value || "Not Found"}
              </Typography>
            ))}
          </Box>
          <Box
            sx={{
              width: { xs: "100%", sm: "30%" },
            }}
          >
            <Typography
              sx={{
                mb: 1,
              }}
            >
              Islamic Date : {data?.hijri_date}
            </Typography>
            <Typography
              sx={{
                mb: 1,
              }}
            >
              Gregorian Date : {data?.miladi_date}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {data?.from}&nbsp;&nbsp;&nbsp; <EastOutlined />
              &nbsp;&nbsp;&nbsp; {data?.to}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PublicEventInfo;
