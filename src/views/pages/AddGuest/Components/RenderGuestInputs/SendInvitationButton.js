import { CopyAll, ExpandMore, SendOutlined } from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  Collapse,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { request } from "../../../../../api/request";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { SET_GUESTS } from "../../../../../store/GuestsSlice";
import { useTranslation } from "react-i18next";

const useCopy = () => {
  const [copiedText, setCopiedText] = useState();

  const copy = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
    } catch (error) {
      console.error(`Failed copying the text ${text}`, error);
      setCopiedText(null);
    }
  };

  return [copiedText, copy];
};

const SnackbarInvalidNumbers = ({
  rows,
  numerOfFaild,
  numberOfSuccess,
  message,
}) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [copiedText, copy] = useCopy();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handelCopy = () => {
    const numbers = rows.map((row) => row.phone + " - " + row.name).join(" | ");
    copy(numbers);
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box mb={2}>
          <Typography mb={1}>{message}</Typography>
          <Typography fontWeight={"600"} mb={1}>
            {numerOfFaild} {t("faild")}
          </Typography>
          <Typography fontWeight={"600"}>
            {numberOfSuccess} {t("success")}
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={handleOpen}>
            <ExpandMore
              sx={{
                transition: "0.3s",
                transform: open ? "rotate(0.5turn)" : "rotate(0turn)",
                color: "common.white",
              }}
            />
          </IconButton>
          <Tooltip title={t('copy_all_faild')}>
            <IconButton onClick={handelCopy}>
              <CopyAll
                sx={{
                  color: "common.white",
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Collapse in={open}>
        <Box
          sx={{
            maxHeight: "50vh",
            overflowY: "auto",
            backgroundColor: (theme) => alpha(theme.palette.common.white, 0.2),
            p: 2,
            borderRadius: "10px",
          }}
        >
          <Typography mb={2} maxWidth={"400px"} fontWeight={"600"}>
            {t("number_of_faild")}
          </Typography>
          {rows.map((row, i) => (
            <Typography
              key={i}
              sx={{
                mb: 1,
                borderRadius: "10px",
              }}
            >
              {row.name} - {row.phone}
            </Typography>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

const sendInvitaion = (options) => {
  const seenPhones = new Set();

  const filteredArray = options.guests.filter((obj) => {
    const isUnique = !seenPhones.has(obj.number);
    seenPhones.add(obj.number);
    return isUnique;
  });

  return request({
    url: "/invitees",
    method: "post",
    data: {
      invitees: filteredArray,
      invitation_id: options.order,
    },
  });
};

const SendInvitationButton = () => {
  const { save, guests } = useSelector((state) => state.guests);
  const { order } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const sendInvetation = useMutation({
    mutationFn: sendInvitaion,
    mutationKey: ["send-invitation"],
    onSuccess: (data) => {
      enqueueSnackbar("guests added successfully to order", {
        variant: "success",
      });
      dispatch(SET_GUESTS([]));
      // navigate(`/dashboard/orders/show-order/${order}`);
    },
    onError: (error) => {
      if (error.response) {
        const invalidNumbers =
          error.response.data.whatsapp_response.invalidNumbers;
        const validaNumbers =
          error.response.data.whatsapp_response.validInvitees;
        enqueueSnackbar(
          <SnackbarInvalidNumbers
            rows={invalidNumbers}
            numerOfFaild={invalidNumbers.length}
            numberOfSuccess={validaNumbers.length}
            message={error.response.data.message}
          />,
          {
            variant: "success",
            autoHideDuration: 10000,
          }
        );
      }
    },
  });
  return (
    <Button
      onClick={() => {
        sendInvetation.mutate({ guests, order });
      }}
      startIcon={<SendOutlined />}
      disabled={!save || sendInvetation.isPending}
      fullWidth
      sx={{
        backgroundColor: "#4AB37E",
        height: "54px",
        borderRadius: "15px",
        mb: 1,
        "&:hover": { backgroundColor: "#4AB37E" },
      }}
      variant="contained"
    >
      send invitation
    </Button>
  );
};

export default SendInvitationButton;
