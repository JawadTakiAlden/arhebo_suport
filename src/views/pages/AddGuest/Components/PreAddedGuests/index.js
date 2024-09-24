import React, { useState } from "react";
import useGgetGusests from "../../../../../api/useGgetGusests";
import {
  Box,
  FormHelperText,
  Input,
  OutlinedInput,
  Select,
  TextField,
  textFieldClasses,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { EditOutlined } from "@mui/icons-material";
import useUpdateNumberOfInvitees from "../../../../../api/useUpdateNumberOfInvitees";

const PreAddedGuests = ({ maxNumberCanInvitee }) => {
  const guests = useGgetGusests();
  const update = useUpdateNumberOfInvitees()
  const [updateId , setUpdateId] = useState()
  const onSubmitHandeler = (vallues) => {
    update.mutate(vallues)
  }

  const onClickAwaya = () => {

  }

  return (
    <Box
      sx={{
        backgroundColor: "grey.200",
        borderRadius: "20px",
        p: 4,
        maxHeight: "800px",
        overflowY: "auto",
      }}
    >
      <Typography
        sx={{
          mb: 2,
          fontSize: "22px",
          fontWeight: "600",
        }}
      >
        Pre Added Guests
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "stretch",
          gap: "20px",
        }}
      >
        {guests?.data?.data?.map((guest) => (
          <Box
            sx={{
              backgroundColor: "common.white",
              px: 2,
              py: 0.5,
              borderRadius: "10px",
              width: {
                xs: "100%",
                sm: "calc(50% - 20px)",
                md: "calc(33.33333% - 20px)",
              },
            }}
          >
            <Typography
              sx={{
                mb: 1,
              }}
            >
              Name : {guest.name}
            </Typography>
            <Typography
              sx={{
                mb: 1,
              }}
            >
              Name : {guest.phone}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Typography>Number Of People :</Typography>
              <Formik
                initialValues={{
                  number_of_people: guest.number_of_people,
                  invitee_id : guest.id
                }}
                validationSchema={yup.object({
                  number_of_people: yup
                    .number()
                    .min(
                      guest.number_of_people,
                      `minimum number allowed is ${guest.number_of_people}`
                    )
                    .max(
                      maxNumberCanInvitee + guest.number_of_people,
                      `maximum number allowed is ${maxNumberCanInvitee + guest.number_of_people}`
                    ),
                })}
                onSubmit={onSubmitHandeler}
              >
                {({
                  values,
                  touched,
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap : '5px'
                      }}
                    >
                      <TextField
                        value={values.number_of_people}
                        name="number_of_people"
                        type="number"
                        onChange={(e) => {
                          handleChange(e)
                          setUpdateId(guest.id)
                        }}
                        onBlur={handleBlur}
                        variant="standard"
                        inputMode={"numeric"}
                        inputProps={{
                          min : guest.number_of_people,
                          max : maxNumberCanInvitee + guest.number_of_people
                        }}
                        sx={{
                          width: "50px",
                          height : '30px'
                        }}
                        error={
                          !!errors.number_of_people &&
                          !!touched.number_of_people
                        }
                      />

                      {!!errors.number_of_people &&
                        !!touched.number_of_people && (
                          <FormHelperText error>
                            {errors.number_of_people}
                          </FormHelperText>
                        )}
                      {!(
                        !!errors.number_of_people && !!touched.number_of_people
                      ) && (
                        <LoadingButton
                          color="warning"
                          type="submit"
                          disabled={guest.number_of_people === values.number_of_people}
                          loading={update.isPending && guest.id === updateId}
                          sx={{
                            height : '30px'
                          }}
                          startIcon={<EditOutlined />}
                        >
                          edit
                        </LoadingButton>
                      )}
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PreAddedGuests;
