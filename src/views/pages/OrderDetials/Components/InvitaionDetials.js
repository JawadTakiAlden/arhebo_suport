import { Box, Grid, Skeleton, Typography } from "@mui/material";
import React from "react";
import { gridSpacing } from "../../../../constant";
import { CalendarToday, PendingActionsRounded } from "@mui/icons-material";

const FieldInfo = ({ title, value, icon }) => {
  return (
    <>
      <Typography
        sx={{
          mb: 1,
          color: "#222222",
          fontWeight: "500",
          fontSize: "16px",
          textTransform: "capitalize",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          borderRadius: "8px",
          border: "1px solid #EBEBEB",
          boxShadow: "0px 0px 10px 0px #00000008",
          backgroundColor: "#FDFDFD",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "nowrap",
          py: 2,
          px: 2,
        }}
      >
        {value} {icon}
      </Typography>
    </>
  );
};

const InvitaionDetials = ({ data }) => {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={6}>
        <Grid container direction={"column"} spacing={gridSpacing}>
          <Grid item xs={12}>
            <FieldInfo title={"Event Name"} value={data.city} />
          </Grid>
          <Grid item xs={12}>
            <FieldInfo title={"Inviter"} value={data.inviter} />
          </Grid>
          <Grid item xs={12}>
            <FieldInfo title={"City"} value={data.city} />
          </Grid>
          <Grid item xs={12}>
            <FieldInfo title={"Invitation Text"} value={data.invitation_text} />
          </Grid>
          <Grid item xs={12}>
            <FieldInfo title={"Location Name"} value={data.location_name} />
          </Grid>
          <Grid item xs={12}>
            <FieldInfo title={"Location Link"} value={data.location_link} />
          </Grid>
          <Grid item xs={12}>
            <FieldInfo title={"Region"} value={data.region} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid container direction={"column"} spacing={gridSpacing}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} md={6}>
                <FieldInfo
                  title={"Hijri Date"}
                  value={data.hijri_date}
                  icon={<CalendarToday />}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FieldInfo
                  title={"Miladi Date"}
                  value={data.miladi_date}
                  icon={<CalendarToday />}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} md={6}>
                <FieldInfo
                  title={"From"}
                  value={data.from}
                  icon={<PendingActionsRounded />}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FieldInfo
                  title={"To"}
                  value={data.to}
                  icon={<PendingActionsRounded />}
                />
              </Grid>
            </Grid>
          </Grid>
          {data.invitationInput.map((input , i) => {
            return (
              <Grid key={id} item xs={12} md={6}>
                <FieldInfo title={input.name} value={input.value} />
              </Grid>
            );
          })}
          <Grid item xs={12}>
            <Box
              sx={{
                borderRadius: "12px",
                border: "1px solid #fc0000",
                p: 3,
              }}
            >
              <Typography
                sx={{
                  my: 2,
                  textAlign: "center",
                  color: "#fc0000",
                  textTransform: "uppercase",
                  fontSize: "26px",
                }}
              >
                Danger Zone
              </Typography>
              {data.prohibitedThings.map((thing , i) => {
                return (
                  <Typography
                  key={i}
                    sx={{
                      boxShadow: "1px 1px 10px -6px",
                      py: 1,
                      px: 2,
                      borderRadius: "12px",
                    }}
                  >
                    {thing.name}
                  </Typography>
                );
              })}
            </Box>
          </Grid>
          {
            data.message_when_delete_invitation && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    borderRadius: "12px",
                    border: `1px solid #fc0000`,
                    p: 3,
                  }}
                >
                  <Typography
                    sx={{
                      my: 2,
                      textAlign: "center",
                      color: "#fc0000",
                      textTransform: "uppercase",
                      fontSize: "26px",
                    }}
                  >
                    Delete Zone
                  </Typography>
                  <Typography
                    sx={{
                      boxShadow: "1px 1px 10px -6px",
                      py: 1,
                      px: 2,
                      borderRadius: "12px",
                    }}
                  >
                    {data.message_when_delete_invitation || "this order not deleted"}
                  </Typography>
                </Box>
              </Grid>
            )
          }
          {
            data.message_when_update_invitation.length !== 0 && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    borderRadius: "12px",
                    border: `1px solid #f5a600`,
                    p: 3,
                  }}
                >
                  <Typography
                    sx={{
                      my: 2,
                      textAlign: "center",
                      color: "#f5a600",
                      textTransform: "uppercase",
                      fontSize: "26px",
                    }}
                  >
                    Update Zone
                  </Typography>
                  
                    {data.message_when_update_invitation.map((message) => (
                      <Typography
                      sx={{
                        boxShadow: "1px 1px 10px -6px",
                        py: 1,
                        px: 2,
                        borderRadius: "12px",
                      }}
                      key={message.id}
                    >
                      {message.title}
                      </Typography>
                    ))}
                  
                </Box>
              </Grid>
            )
          }
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InvitaionDetials;
