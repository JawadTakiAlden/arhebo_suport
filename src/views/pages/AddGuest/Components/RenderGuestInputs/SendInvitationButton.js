import { SendOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { request } from "../../../../../api/request";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";

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
  const sendInvetation = useMutation({
    mutationFn: sendInvitaion,
    mutationKey: ["send-invitation"],
    onSuccess: (data) => {
      // enqueueSnackbar("guests added successfully to order" , {variant : 'success'})
      navigate(`/dashboard/orders/show-order/${order}`);
    },
    onError: (error) => {
      // enqueueSnackbar("something wrong hapend while we add your guests" , {variant : 'error'})
    },
  });
  return (
    <Button
      onClick={() => sendInvetation.mutate({ guests, order })}
      d
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
