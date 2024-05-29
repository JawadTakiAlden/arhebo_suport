import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";

const InviteesInfo = ({ data }) => {
  const [status, setStatus] = useState(1);
  const dumyData = [
    {
      name: "jawad taki aldeen",
      status: 1,
      phone: "0948966979",
    },
    {
      name: "ali aldkak",
      status: 2,
      phone: "0948966979",
    },
    {
      name: "wesam suliman",
      status: 3,
      phone: "0948966979",
    },
  ];
  const statusMap = {
    1: "Accepted",
    2: "Watting",
    3: "Rejected",
  };

  const filterButtons = [
    {
      status: 1,
      name: "Accepted",
      color: "success",
    },
    {
      status: 2,
      name: "Watting",
      color: "warning",
    },
    {
      status: 3,
      name: "Rejected",
      color: "error",
    },
  ];
  return (
    <Box
      sx={{
        width: "100%",
        // height: "100%",
        maxHeight : '400px',
        backgroundColor: (theme) => theme.palette.common.white,
        borderRadius: "8px",
        p: 3,
        width: "100%",
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
              filter: `grayscale(${status === button.status ? "0%" : "100%"})`,
              transition: "width 0.3s",
            }}
            color={button.color}
          >
            {button.name}
          </Button>
        ))}
      </Box>
      <Typography color={"success.dark"} my={2}>
        Total Invittes : {data?.invited}
      </Typography>
      <Box
      // sx={{
      //   width: "100%",
      //   overflowX: "auto",
      // }}
      >
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
              Name
            </Grid>
            <Grid item xs={3}>
              phone
            </Grid>
            <Grid item xs={3}>
              Status
            </Grid>
            <Grid item xs={3}>
              message
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
            No Invited yet
          </Typography>
        )}
        {data?.allInvited
          .filter((invitee) => +invitee.status === status)
          .map((invitee) => (
            <Box
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
