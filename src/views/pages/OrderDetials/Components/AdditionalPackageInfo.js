import { Box, Tooltip, Typography, alpha, styled } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const AdditionalPackageInfo = ({ data }) => {
  const { t } = useTranslation();

  const SubText = styled("sub")(({ theme }) => ({
    color: theme.palette.success.main,
    fontFamily: "monospace",
  }));

  return (
    <Box
      sx={{
        boxShadow: "1px 1px 10px -5px rgba(0,0,0,0.2)",
        p: 2,
        borderRadius: "4px",
        transition: "0.3s",
        height: "100%",
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
        {t('additionalPackageInfo.packageTitle')}
      </Typography>
      {data?.additionalPackage?.length === 0 && (
        <Typography>{t('additionalPackageInfo.noAdditionalPackage')}</Typography>
      )}
      {data?.additionalPackage.map((additional, i) => (
        <Typography
          key={i}
          sx={{
            mb: data.length - 1 === i ? 0 : 1,
          }}
        >
          <Tooltip title={additional.created_at}>
            {additional.number_of_invitees} {t('additionalPackageInfo.invitees')}
          </Tooltip>{" "}
          <SubText>{additional.price} SAR</SubText>
        </Typography>
      ))}
    </Box>
  );
};

export default AdditionalPackageInfo;
