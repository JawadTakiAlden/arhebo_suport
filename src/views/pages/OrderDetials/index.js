import {
  Box,
  Button,
  Grid,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import useShowOrder from "../../../api/useShowOrder";
import { gridSpacing } from "../../../constant";
import { useNavigate } from "react-router-dom";
import PackageDetails from "./Components/PackageDetails";
import InviteesDetails from "./Components/InviteesDetails";
import InviteesInfo from "./Components/InviteesInfo";
import AdditionalPackageInfo from "./Components/AdditionalPackageInfo";
import ExtraFeatuerInfo from "./Components/ExtraFeatuerInfo";
import MessageInfo from "./Components/MessageInfo";
import ProhibitedThings from "./Components/ProhibitedThings";
import PublicEventInfo from "./Components/PublicEventInfo";
import InvitationImage from "./Components/InvitationImage";
import { Add } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import PreAddedGuests from "../AddGuest/Components/PreAddedGuests";

const SkeltonLoader = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: "500px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <Skeleton
            variant="rectangular"
            width={500}
            height={300}
            animation="wave"
          />
        </Box>
      </Box>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={6}>
          <Grid container direction={"column"} spacing={gridSpacing}>
            <Grid item xs={12}>
              <Skeleton variant="text" width="100%" height={20} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="text" width="100%" height={20} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="text" width="100%" height={20} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="text" width="100%" height={20} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="text" width="100%" height={20} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container direction={"column"} spacing={gridSpacing}>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={6}>
                  <Skeleton variant="text" width="100%" height={20} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Skeleton variant="text" width="100%" height={20} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={6}>
                  <Skeleton variant="text" width="100%" height={20} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Skeleton variant="text" width="100%" height={20} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="text" width="100%" height={20} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="text" width="100%" height={20} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const OrderDetials = () => {
  const orderInforamtion = useShowOrder();
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  if (orderInforamtion.isLoading) {
    return <SkeltonLoader />;
  }
  const withCustom = orderInforamtion?.data?.data?.attribute
    ?.map((obj) => obj.key)
    .includes("withCustom");

  const withoutNumber = orderInforamtion?.data?.data?.attribute
    ?.map((obj) => obj.key)
    .includes("withoutNumber");

  return (
    <Box>
      <Typography
        sx={{
          position: "relative",
          width: "fit-content",
          fontSize: "30px",
          fontWeight: "600",
          textTransform: "capitalize",
          mb: 4,
          "&::after": {
            content: "''",
            position: "absolute",
            width: "150%",
            bottom: "-10px",
            height: "2px",
            backgroundColor: theme.palette.success.main,
            left: 0,
          },
          "&::before": {
            content: "''",
            position: "absolute",
            width: "10px",
            bottom: "-14px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: theme.palette.success.main,
            right: "calc(-50% - 5px)",
          },
        }}
      >
        {orderInforamtion?.data?.data?.event_name}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PublicEventInfo data={orderInforamtion?.data?.data} />
        </Grid>
          <Grid item xs={12}>
            <InvitationImage data={orderInforamtion?.data?.data} />
          </Grid>
        {/* )} */}
        <Grid item xs={12} sm={6} md={9}>
          <PackageDetails data={orderInforamtion?.data?.data} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InviteesDetails data={orderInforamtion?.data?.data} />
        </Grid>
        <Grid item xs={12}>
          <InviteesInfo data={orderInforamtion?.data?.data} />
        </Grid>
        <Grid item xs={12} md={4}>
          <AdditionalPackageInfo data={orderInforamtion?.data?.data} />
        </Grid>
        <Grid item xs={12} md={4}>
          <ExtraFeatuerInfo data={orderInforamtion?.data?.data} />
        </Grid>
        <Grid item xs={12} md={4}>
          <MessageInfo data={orderInforamtion?.data?.data} />
        </Grid>
        <Grid item xs={12} md={4}>
          <ProhibitedThings data={orderInforamtion?.data?.data} />
        </Grid>

        {withoutNumber && orderInforamtion?.data?.data?.image && (
          <Grid item xs={12}>
            <Button
              startIcon={<Add />}
              onClick={() =>
                navigate(
                  `/dashboard/orders/add-guests/${orderInforamtion?.data?.data?.id}`
                )
              }
              color="success"
              variant="contained"
              size="medium"
            >
              {t("CustomTable.add_guests")}
            </Button>
          </Grid>
        )}
        {withCustom && (
          <Grid item xs={12}>
            <PreAddedGuests
              maxNumberCanInvitee={orderInforamtion?.data?.data?.remaining}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default OrderDetials;
