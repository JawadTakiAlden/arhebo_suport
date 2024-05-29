import { CameraOutlined, SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import useAddImageAndMessageOfInvitasion from "../../../../api/useAddImageAndMessageOfInvitasion";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const InvitationImage = ({ data }) => {
  const storeFile = useAddImageAndMessageOfInvitasion();
  const [file, setFile] = useState({
    image: "",
    message: data?.textMessage,
    invitation_id: data?.id,
  });
  const [isDragging, setIsDragging] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.type === "image/jpeg" ||
        droppedFile.type === "image/png" ||
        droppedFile.type === "image/jpg")
    ) {
      setFile({ ...file, image: droppedFile });
    } else {
      enqueueSnackbar("Only JPEG , JPG , PNG files are allowed.", {
        variant: "error",
      });
    }
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/png" ||
        selectedFile.type === "image/jpg")
    ) {
      setFile({ ...file, image: selectedFile });
    } else {
      enqueueSnackbar("Only JPEG , JPG , PNG files are allowed.", {
        variant: "error",
      });
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = () => {
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <Box
      sx={{
        boxShadow: "1px 1px 10px -5px rgba(0,0,0,0.2)",
        p: 2,
        borderRadius: "4px",
        transition: "0.3s",
        height: "100%",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "-1px -1px 15px -5px rgba(0,0,0,0.5)",
        },
      }}
    >
      <Typography
        sx={{
          position: "relative",
          width: "fit-content",
          fontSize: "25px",
          fontWeight: "600",
          textTransform: "capitalize",
          mb: 4,
          "&::after": {
            content: "''",
            position: "absolute",
            width: "110%",
            bottom: "-10px",
            height: "2px",
            backgroundColor: (theme) => theme.palette.success.main,
            left: 0,
          },
          "&::before": {
            content: "''",
            position: "absolute",
            width: "10px",
            bottom: "-14px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: (theme) => theme.palette.success.main,
            right: "calc(-10% - 5px)",
          },
        }}
      >
        Image Of Invitation
      </Typography>{" "}
      {data?.image && (
        <Typography
          component={"a"}
          href={data?.image}
          target="_blank"
          mb={2}
          mt={2}
          sx={{
            textDecoration: "underline",
            width: "fit-content",
            pb: 1,
            transition: "0.3s",
            "&:hover": {
              color: "success.dark",
            },
          }}
        >
          Current Image
        </Typography>
      )}
      <Box
        sx={{
          p: 2,
          border: (theme) => `1px solid ${theme.palette.grey[400]}`,
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "300px",
          position: "relative",
          flexDirection: "column",
          // maxWidth: "500px",
          // mx: "auto",
          cursor: isDragging ? "copy" : "default",
          "&:hover .camera-icon-custom-class": {
            transform: "rotate(0.5turn)",
          },
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <CameraOutlined
          className="camera-icon-custom-class"
          color="success"
          sx={{
            fontSize: { xs: "40px", sm: "50px", md: "70px" },
            transition: "0.7s",
            mb: 2,
          }}
        />
        <Typography>Drag & Drop image here , or</Typography>
        <Button
          component="label"
          role={undefined}
          tabIndex={-1}
          color="success"
          variant="contained"
        >
          Select Image From Your Device{" "}
          <VisuallyHiddenInput
            onChange={handleFileChange}
            accept="image/png , image/jpg , image/jpeg"
            type="file"
          />
        </Button>
        {file.image && (
          <Tooltip title={"click me to see me"}>
            <Typography
              sx={{
                my: 2,
                textAlign: "center",
                color: "success.dark",
              }}
              component={"a"}
              target="_blank"
              href={URL.createObjectURL(file.image)}
            >
              {file?.image?.name}
            </Typography>
          </Tooltip>
        )}
      </Box>
      <FormControl color="success" fullWidth sx={{ mb: 2, mt: 2 }}>
        <InputLabel>Message</InputLabel>
        <OutlinedInput
          label="Message"
          multiline
          name="message"
          maxRows={4}
          minRows={4}
          value={file.message}
          // onBlur={handleBlur}
          onChange={(e) => {
            setFile({ ...file, message: e.target.value });
          }}
        />
      </FormControl>
      <LoadingButton
        variant="outlined"
        color="success"
        onClick={() => {
          storeFile.mutate(file);
        }}
        loading={storeFile.isPending}
        startIcon={<SaveOutlined />}
        loadingPosition="start"
      >
        Save
      </LoadingButton>
    </Box>
  );
};

export default InvitationImage;
