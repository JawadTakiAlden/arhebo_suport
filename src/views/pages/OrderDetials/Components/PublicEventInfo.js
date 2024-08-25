import React from "react";
import { useTranslation } from 'react-i18next';
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { EastOutlined, ImageOutlined } from "@mui/icons-material";
import pinkImage from "../../../../assets/download (1).jpeg";

const PublicEventInfo = ({ data }) => {
  const { t ,  i18n} = useTranslation();

  return (
    <Box
      sx={{
        borderRadius: "8px",
        transition: "0.3s",
        backdropFilter: "blur(10px)",
        height: "100%",
        backgroundImage: (theme) => `linear-gradient(90deg , ${theme.palette.success.light} , ${theme.palette.success.dark})`,
        position: "relative",
        overflow: "hidden",
        color: 'white',
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
        <Tooltip title={t('publicEventInfo.openImageTooltip')}>
          <IconButton
            sx={{
              position: "absolute",
              right: "10px",
              top: "10px",
            }}
            component={"a"}
            href={data?.template}
            target="_blank"
          >
            <ImageOutlined />
          </IconButton>
        </Tooltip>
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
              left: 0,
            },
            "&::before": {
              content: "''",
              position: "absolute",
              width: "10px",
              bottom: "-14px",
              height: "10px",
              borderRadius: "50%",
              right: "calc(-10% - 5px)",
            },
          }}
        >
          {t('publicEventInfo.title')}
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
            <Typography sx={{ mb: 1 }}>
              {t('publicEventInfo.inviter')}: {data?.inviter}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              {t('publicEventInfo.city')}: {data?.city || t('publicEventInfo.notFound')}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              {t('publicEventInfo.location')}:
              <a
                style={{ display: "inline-block", textDecoration: "underline" }}
                href={data?.location_link}
              >
                {t('publicEventInfo.openLink')}
              </a>
            </Typography>
            <Typography sx={{ mb: 1 }}>
              {t('publicEventInfo.region')}: {data?.region || t('publicEventInfo.notFound')}
            </Typography>
            {data?.invitationInput?.map((obj, index) => (
              <Typography key={index} sx={{ mb: 1 }}>
                {i18n.language === 'ar' ? obj.name_ar : obj.name} : {obj?.value}
              </Typography>
            ))}
          </Box>
          <Box
            sx={{
              width: { xs: "100%", sm: "30%" },
            }}
          >
            <Typography sx={{ mb: 1 }}>
              {t('publicEventInfo.islamicDate')}: {data?.hijri_date}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              {t('publicEventInfo.gregorianDate')}: {data?.miladi_date}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {data?.from} &nbsp;&nbsp;&nbsp; <EastOutlined /> &nbsp;&nbsp;&nbsp; {data?.to}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PublicEventInfo;
