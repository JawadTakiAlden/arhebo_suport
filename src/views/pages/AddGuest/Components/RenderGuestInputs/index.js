import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Add_Guest,
  Delete_Guest,
  SET_GUESTS,
  Set_Initial_State,
} from "../../../../../store/GuestsSlice";
import {
  DeleteOutlined,
  HourglassBottom,
  HourglassTop,
} from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import useGetNickName from "../../../../../api/useGetNickName";
import useGgetGusests from "../../../../../api/useGgetGusests";
import useShowOrder from "../../../../../api/useShowOrder";

const RenderGuestInputs = () => {
  const gustes = useSelector((state) => state.guests);
  const dispatch = useDispatch();
  const orderDetails = useShowOrder();
  const [remaining, setRemaining] = useState(
    orderDetails?.data?.data?.remaining
  );
  const [mode] = useState("add");
  const nicknames = useGetNickName();
  const [isDragging, setIsDragging] = useState(false);
  const addNewGuest = (values) => {
    dispatch(Add_Guest(values));
  };
  if (orderDetails.isLoading) {
    return <Typography>Loading ...</Typography>;
  }
  console.log(orderDetails?.data?.data);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "stretch",
          gap: "20px",
          flexWrap: "wrap",
          mt: 2,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "calc(50% - 20px)" },
            display: "flex",
            alignItems: "center",
            boxShadow: "1px 1px 15px -5px #00000044",
            p: 4,
            borderRadius: "20px",
          }}
        >
          <HourglassTop
            color="primary"
            sx={{
              fontSize: "50px",
            }}
          />
          <Box>
            <Typography>You Can Add</Typography>
            <Typography>{remaining}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", sm: "calc(50% - 20px)" },
            display: "flex",
            alignItems: "center",
            boxShadow: "1px 1px 15px -5px #00000044",
            p: 4,
            borderRadius: "20px",
          }}
        >
          <HourglassBottom
            color="warning"
            sx={{
              fontSize: "50px",
            }}
          />
          <Box>
            <Typography>You are invitee</Typography>
            <Typography>{orderDetails?.data?.data?.invited}</Typography>
          </Box>
        </Box>
      </Box>
      <Box
        onDrop={(ev) => {
          ev.preventDefault();
          let dragbleElement = JSON.parse(
            ev.dataTransfer.getData("dragbleElement")
          );
          dispatch(Delete_Guest({ id: dragbleElement.id }));
          setRemaining((prev) => prev + dragbleElement.count);
          setIsDragging(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        sx={{
          height: isDragging ? "60px" : "0px",
          transition: "0.4s",
          position: "sticky",
          overflow: "hidden",
          top: "10px",
          left: "0",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(150,20,30,0.5)",
          zIndex: 1000,
          mt: 2,
          mb: 2,
          color: "white",
          borderRadius: "12px",
          backdropFilter: "blur(3px)",
        }}
      >
        <DeleteOutlined color="inherit" fontSize="large" />
      </Box>
      <Formik
        initialValues={gustes.initialState}
        validationSchema={yup.object({
          name: yup.string().required("name of guest is required"),
          number: yup.string().required("phone of guest is required"),
          nickname: yup.string().required("nickname is required"),
          count: yup
            .number()
            .min(0)
            .required("escorts count of  of guest is required"),
          // message: yup.string().max(500).required("message is required"),
        })}
        onSubmit={(values, { resetForm }) => {
          if (mode === "add") {
            addNewGuest(values);
            setRemaining((prev) => prev - values.count);
            resetForm();
            dispatch(
              Set_Initial_State({
                name: "",
                nickname: "",
                number: "",
                count: 1,
                message: "",
              })
            );
          }
        }}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 1,
                p: 1,
                cursor: "grabbing",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                }}
              >
                <FormControl
                  error={!!touched.nickname && !!errors.nickname}
                  fullWidth
                  color="success"
                  sx={{ width: "100px" }}
                >
                  <Select
                    sx={{
                      width: "100px",
                      borderRadius: "10px 0 0 10px",
                    }}
                    onChange={handleChange}
                    value={values.nickname}
                    onBlur={handleBlur}
                    name="nickname"
                  >
                    {nicknames?.data?.data?.map((name) => {
                      return (
                        <MenuItem value={name.nickname}>
                          {name.nickname}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl sx={{ flex: 1 }}>
                  <InputLabel>Name</InputLabel>
                  <OutlinedInput
                    type={"text"}
                    name={"name"}
                    label={"Name"}
                    onChange={handleChange}
                    value={values.name}
                    onBlur={handleBlur}
                    sx={{
                      borderRadius: "0 10px 10px 0",
                    }}
                  />
                </FormControl>
              </Box>
              <FormControl
                error={!!touched.number && !!errors.number}
                fullWidth
                color="success"
                sx={{ flex: 1 }}
              >
                <InputLabel>Phone</InputLabel>
                <OutlinedInput
                  type={"text"}
                  name={"number"}
                  label={"Phone"}
                  value={values.number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl>
              <FormControl
                error={!!touched.count && !!errors.count}
                fullWidth
                color="success"
                sx={{ flex: 1 }}
              >
                <InputLabel>Escorts Count</InputLabel>
                <OutlinedInput
                  type={"number"}
                  name={"count"}
                  label={"Escorts Count"}
                  value={values.count}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  inputProps={{
                    min: 0,
                  }}
                />
              </FormControl>
            </Box>
            <Button
              color={"success"}
              type="submit"
              variant="outlined"
              sx={{
                ml: 1,
              }}
            >
              Add Guest Row
            </Button>
          </form>
        )}
      </Formik>
      {gustes.guests.map((guest) => (
        <Box
          draggable
          onDragStart={(e) => {
            setIsDragging(true);
            e.dataTransfer.setData("dragbleElement", JSON.stringify(guest));
          }}
          onDragEnd={() => {
            setIsDragging(false);
          }}
          onDoubleClick={() => {
            dispatch(Set_Initial_State(guest));
          }}
          key={guest.id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 1,
            p: 1,
            cursor: "grabbing",
          }}
        >
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#fff",
              borderRadius: "10px",
              overflowX: "auto",
              p: 2,
            }}
          >
            <Typography sx={{ whiteSpace: "nowrap" }}>
              {guest.nickname} {guest.name}
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#fff",
              borderRadius: "10px",
              overflowX: "auto",
              p: 2,
            }}
          >
            <Typography sx={{ whiteSpace: "nowrap" }}>
              {guest.number}
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#fff",
              borderRadius: "10px",
              overflowX: "auto",
              p: 2,
            }}
          >
            <Typography sx={{ whiteSpace: "nowrap" }}>{guest.count}</Typography>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default RenderGuestInputs;
