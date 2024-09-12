import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Add_Guest,
  Delete_Guest,
  Set_Initial_State,
} from "../../../../../store/GuestsSlice";
import { DeleteOutlined } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";

const RenderGuestInputs = () => {
  const gustes = useSelector((state) => state.guests);
  const dispatch = useDispatch();
  const [mode , ] = useState('add')
  const [isDragging, setIsDragging] = useState(false);
  const addNewGuest = (values) => {
    dispatch(Add_Guest(values))
  }

  return (
    <>
      <Box
        onDrop={(ev) => {
          ev.preventDefault();
          let dragbleElement = ev.dataTransfer.getData("dragbleElement");
          dispatch(Delete_Guest({ id: dragbleElement }));
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
          count: yup
            .number()
            .min(0)
            .required("escorts count of  of guest is required"),
          // message: yup.string().max(500).required("message is required"),
        })}
        onSubmit={(values) => {
          if(mode === 'add'){
            addNewGuest(values)
            dispatch(Set_Initial_State({
              name : '',
              number : '',
              count : 1,
              message : ''
            }))
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
              <FormControl
                error={!!touched.name && !!errors.name}
                fullWidth
                color="success"
                sx={{ flex : 1 }}
              >
                <InputLabel>Name</InputLabel>
                <OutlinedInput
                  type={"text"}
                  name={"name"}
                  label={"Name"}
                  onChange={handleChange}
                  value={values.name}
                  onBlur={handleBlur}
                />
              </FormControl>
              <FormControl
                error={!!touched.number && !!errors.number}
                fullWidth
                color="success"
                sx={{ flex : 1 }}
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
                sx={{ flex : 1 }}
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
                    min : 0
                  }}
                />
              </FormControl>
            </Box>
            <Button
                color={'success'}
                type="submit"
                variant="outlined"
                sx={{
                    ml : 1
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
            e.dataTransfer.setData("dragbleElement", guest.id);
          }}
          onDragEnd={() => {
            setIsDragging(false);
          }}
          onDoubleClick={() => {
            dispatch(Set_Initial_State(guest))
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
              overflowX : 'auto',
              p : 2
            }}
          >
            <Typography sx={{whiteSpace : 'nowrap'}}>{guest.name}</Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#fff",
              borderRadius: "10px",
              overflowX : 'auto',
              p : 2
            }}
          >
            <Typography sx={{whiteSpace : 'nowrap'}}>{guest.number}</Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#fff",
              borderRadius: "10px",
              overflowX : 'auto',
              p : 2
            }}
          >
            <Typography sx={{whiteSpace : 'nowrap'}}>{guest.count}</Typography>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default RenderGuestInputs;
