import { Box, Tooltip, Typography, alpha, styled } from "@mui/material";
import React from "react";

const SubText = styled("sub")(({ theme }) => ({
  color: theme.palette.success.main,
  fontFamily: "monospace",
}));

const ExtraFeatuerInfo = ({data}) => {
  // const data = [
  //   {
  //     type: "withValue",
  //     quantity: 3,
  //     name: "Resiption to scan QR code",
  //     description: "lorem ipsum ",
  //   },
  //   {
  //     type: "withoutValue",
  //     quantity: null,
  //     name: "Nigh Lighs on the room",
  //     description: "lorem ipsum ",
  //   },
  // ];
  return (
    <Box
      sx={{
        boxShadow: "1px 1px 10px -5px rgba(0,0,0,0.2)",
        p: 2,
        borderRadius: "4px",
        height: "100%",
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "-1px -1px 15px -5px rgba(0,0,0,0.5)",
        },
      }}
    >
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
            backgroundColor: (theme) => theme.palette.success.main,
            left: 0,
          },
          "&::before": {
            content: "''",
            position: "absolute",
            width: "10px",
            bottom: "-14px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: (theme) => theme.palette.success.main,
            right: "calc(-10% - 5px)",
          },
        }}
      >
        Extra Features
      </Typography>
      {
        data?.extraFeature?.length === 0 && <Typography>No Extra Feature Paied Yet</Typography>
      }
      {data?.extraFeature.map((extraFeature, i) => (
        <Typography
          key={i}
          sx={{
            mb: data.length - 1 === i ? 0 : 1,
          }}
        >
          <Tooltip title={extraFeature.description}>
            {extraFeature.name}
          </Tooltip>{" "}
          {extraFeature.type === "withValue" && (
            <SubText>Qun : {extraFeature.quantity} </SubText>
          )}
        </Typography>
      ))}
    </Box>
  );
};

export default ExtraFeatuerInfo;
