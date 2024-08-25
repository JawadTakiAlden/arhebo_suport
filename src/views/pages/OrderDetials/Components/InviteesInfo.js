import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, Grid, Typography } from "@mui/material";

const InviteesInfo = ({ data }) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState(1);

  const statusMap = {
    1: t("inviteesInfo.accepted"),
    2: t("inviteesInfo.waiting"),
    3: t("inviteesInfo.rejected"),
  };

  const filterButtons = [
    {
      status: 1,
      name: t("inviteesInfo.accepted"),
      color: "success",
    },
    {
      status: 2,
      name: t("inviteesInfo.waiting"),
      color: "warning",
    },
    {
      status: 3,
      name: t("inviteesInfo.rejected"),
      color: "error",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "400px",
        backgroundColor: (theme) => theme.palette.common.white,
        borderRadius: "8px",
        p: 3,
        overflowX: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          mb: 2,
          width: "400px",
        }}
      >
        {filterButtons.map((button, i) => (
          <Button
            key={i}
            onClick={() => {
              setStatus(button.status);
            }}
            variant="contained"
            sx={{
              width: status === button.status ? "100%" : "50%",
              filter: `grayscale(${
                status === button.status ? "0%" : "100%"
              })`,
              transition: "width 0.3s",
            }}
            color={button.color}
          >
            {button.name}
          </Button>
        ))}
      </Box>
      <Typography color={"success.dark"} my={2}>
        {t("inviteesInfo.totalInvites")}: {data?.invited}
      </Typography>
      <Box>
        <Box
          sx={{
            p: 1,
            borderRadius: "4px",
            position: "relative",
            mb: 1,
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={3}>
              {t("inviteesInfo.name")}
            </Grid>
            <Grid item xs={3}>
              {t("inviteesInfo.phone")}
            </Grid>
            <Grid item xs={3}>
              {t("inviteesInfo.status")}
            </Grid>
            <Grid item xs={3}>
              {t("inviteesInfo.message")}
            </Grid>
          </Grid>
        </Box>
        {data?.allInvited?.length === 0 && (
          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            {t("inviteesInfo.noInvites")}
          </Typography>
        )}
        {data?.allInvited
          .filter((invitee) => +invitee.status === status)
          .map((invitee, index) => (
            <Box
              key={index}
              sx={{
                borderBottom: "1px solid #f1f1f1",
                p: 1,
                borderRadius: "4px",
                backgroundColor: (theme) => theme.palette.grey[200],
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.grey[300],
                },
                mb: 2,
              }}
            >
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  {invitee.name}
                </Grid>
                <Grid item xs={3}>
                  {invitee.phone}
                </Grid>
                <Grid item xs={3}>
                  {statusMap[invitee.status]}
                </Grid>
                <Grid item xs={3}>
                  {invitee?.message}
                </Grid>
              </Grid>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default InviteesInfo;
