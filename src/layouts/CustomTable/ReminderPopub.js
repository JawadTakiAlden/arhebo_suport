import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MemoryOutlined } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  styled,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useMutation } from "@tanstack/react-query";
import { request } from "../../api/request";
import { useSnackbar } from "notistack";
import { Formik } from "formik";
import * as yup from "yup";

const ReminderPopub = ({ row }) => {
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const sendReminder = useMutation({
    mutationKey: ["send-reminder"],
    mutationFn: (data) => {
      return request({
        url: `/sendWhatsAppReminder/${row.id}`,
        method: "post",
        data
      });
    },
    onSuccess: () => {},
    onError: (er) => {
      if (er.response) {
        enqueueSnackbar(er.response.data.message, {
          variant: "error",
        });
      }
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        color="error"
        size="medium"
      >
        <MemoryOutlined />
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Send Reminder</DialogTitle>
        <DialogContent>
          <DialogContentText mb={2}>
            the owner ask to send remider
          </DialogContentText>
          <Formik
            initialValues={{
              message: "",
            }}
            validationSchema={yup.object({
              message: yup.string().required("message is reuired"),
            })}
            onSubmit={async (values) => {
              const respone = await sendReminder.mutateAsync(values);
              handleClose();
            }}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <FormControl color="success" fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Message</InputLabel>
                  <OutlinedInput
                    label="Message"
                    multiline
                    name="message"
                    maxRows={4}
                    value={values.message}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.message && !!errors.message}
                  />
                  {!!touched.message && !!errors.message && (
                    <FormHelperText error>{errors.message}</FormHelperText>
                  )}
                </FormControl>
                <LoadingButton
                  loading={sendReminder.isPending}
                  color="success"
                  variant="contained"
                  type="submit"
                >
                  Send
                </LoadingButton>
              </form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ReminderPopub;
