import { Box, Tooltip, Typography, alpha, styled } from "@mui/material";
import React from "react";

const SubText = styled('sub')(({theme}) => ({
    color : theme.palette.error.main,
    fontWeight : '500',
    fontFamily : 'Lora'
}))

const InviteesDetails = ({data}) => {
  return (
    <Box
      sx={{
        backgroundImage: (theme) =>
          `linear-gradient(90deg , ${alpha(
            theme.palette.grey[400],
            0.2
          )} , #fff)`,
        p: 2,
        borderRadius: "8px",
        height : '100%',
        overflowY : 'auto'
      }}
    >
      <Typography
        sx={{
          color: "success.dark",
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontWeight: "500",
          borderBottom: "1px solid",
          borderBottomColor: "success.light",
          width: "fit-content",
          mb: 2,
        }}
      >
        Invitee statistics
      </Typography>
      <Box>
        <Typography sx={{
            mb : 1,
            "&:first-letter" : {
                textTransform : 'capitalize',
                color : 'success.light',
                fontSize : '20px',
                fontFamily : 'cursive'
            }
        }}>Maximum number of invitees : {data?.maximumNumberCanInvitee}</Typography>
        <Typography sx={{
            mb : 1,
            "&:first-letter" : {
                textTransform : 'capitalize',
                color : 'success.light',
                fontSize : '20px',
                fontFamily : 'cursive'
            }
        }}>Number of invitations available now : {data?.remaining} <SubText><Tooltip title={"Compensation for those rejected"}>+{data?.compensation}</Tooltip></SubText></Typography>
        <Typography sx={{
            mb : 1,
            "&:first-letter" : {
                textTransform : 'capitalize',
                color : 'success.light',
                fontSize : '20px',
                fontFamily : 'cursive'
            }
        }}>Number of invitations watting : {data?.waiting}</Typography>
        <Typography sx={{
            mb : 1,
            "&:first-letter" : {
                textTransform : 'capitalize',
                color : 'success.light',
                fontSize : '20px',
                fontFamily : 'cursive'
            }
        }}>Number of invitations accepted : {data?.confirmed}</Typography>
        <Typography sx={{
            mb : 1,
            "&:first-letter" : {
                textTransform : 'capitalize',
                color : 'success.light',
                fontSize : '20px',
                fontFamily : 'cursive'
            }
        }}>Number of invitations rejected : {data?.rejected}</Typography>
      </Box>
    </Box>
  );
};

export default InviteesDetails;
