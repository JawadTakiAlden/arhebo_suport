import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Tooltip, Typography, alpha, styled } from "@mui/material";

const SubText = styled('sub')(({ theme }) => ({
  color: theme.palette.error.main,
  fontWeight: '500',
  fontFamily: 'Lora',
}));

const InviteesDetails = ({ data }) => {
  const { t } = useTranslation();

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
        height: '100%',
        overflowY: 'auto',
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
        {t('inviteesDetails.statisticsTitle')}
      </Typography>
      <Box>
        <Typography
          sx={{
            mb: 1,
            "&:first-letter": {
              textTransform: 'capitalize',
              color: 'success.light',
              fontSize: '20px',
              fontFamily: 'cursive',
            },
          }}
        >
          {t('inviteesDetails.maximumInvitees')}: {data?.maximumNumberCanInvitee}
        </Typography>
        <Typography
          sx={{
            mb: 1,
            "&:first-letter": {
              textTransform: 'capitalize',
              color: 'success.light',
              fontSize: '20px',
              fontFamily: 'cursive',
            },
          }}
        >
          {t('inviteesDetails.remainingInvitations')}: {data?.remaining}{" "}
          <SubText>
            <Tooltip title={t('inviteesDetails.compensationTooltip')}>
              +{data?.compensation}
            </Tooltip>
          </SubText>
        </Typography>
        <Typography
          sx={{
            mb: 1,
            "&:first-letter": {
              textTransform: 'capitalize',
              color: 'success.light',
              fontSize: '20px',
              fontFamily: 'cursive',
            },
          }}
        >
          {t('inviteesDetails.waitingInvitations')}: {data?.waiting}
        </Typography>
        <Typography
          sx={{
            mb: 1,
            "&:first-letter": {
              textTransform: 'capitalize',
              color: 'success.light',
              fontSize: '20px',
              fontFamily: 'cursive',
            },
          }}
        >
          {t('inviteesDetails.confirmedInvitations')}: {data?.confirmed}
        </Typography>
        <Typography
          sx={{
            mb: 1,
            "&:first-letter": {
              textTransform: 'capitalize',
              color: 'success.light',
              fontSize: '20px',
              fontFamily: 'cursive',
            },
          }}
        >
          {t('inviteesDetails.rejectedInvitations')}: {data?.rejected}
        </Typography>
      </Box>
    </Box>
  );
};

export default InviteesDetails;
