import { ArrowUpward, CameraOutlined, SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Tooltip, Typography, styled } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import useAddImageAndMessageOfInvitasion from "../../../../api/useAddImageAndMessageOfInvitasion";
import { useTranslation } from "react-i18next";
import axios from "axios";

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
  const { t } = useTranslation();
  const [file, setFile] = useState({
    image: "",
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
      enqueueSnackbar(t("invitationImage.allowedFiles"), {
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
      enqueueSnackbar(t("invitationImage.allowedFiles"), {
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
        boxShadow: "1px 1px 10px -5px rgba(0,0,0,0.4)",
        p: 2,
        borderRadius: "25px",
        transition: "0.3s",
        height: "100%",
        "&:hover": {
          transform: "scale(1.005)",
          boxShadow: "-1px -1px 15px -5px rgba(0,0,0,0.5)",
        },
      }}
    >
      {!data?.image && (
        <Typography
          color={"error.light"}
          sx={{
            fontWeight: "600",
            mb: 2,
            fontSize: "20px",
          }}
        >
          {t("suuport_guest_note")}{" "}
        </Typography>
      )}
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
        {t("invitationImage.title")}
      </Typography>{" "}
      {/* {data?.image && (
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
          {t("invitationImage.currentImage")}
        </Typography>
      )} */}
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
        <Typography> {t("invitationImage.imageInput")}</Typography>
        <Button
          component="label"
          role={undefined}
          tabIndex={-1}
          color="success"
          variant="contained"
        >
          {t("invitationImage.selectImage")}{" "}
          <VisuallyHiddenInput
            onChange={handleFileChange}
            accept="image/png , image/jpg , image/jpeg"
            type="file"
          />
        </Button>
        {(file?.image || data?.image) && !storeFile.isPending && (
          <Box
            sx={{
              width: "300px",
              mt: 2,
            }}
          >
            <img
              src={file.image ? URL.createObjectURL(file.image) : data?.image}
              style={{
                objectFit: "scale-down",
                maxWidth: "100%",
                borderRadius: "20px",
              }}
            />
          </Box>
        )}
      </Box>
      {/* <FormControl color="success" fullWidth sx={{ mb: 2, mt: 2 }}>
        <InputLabel>{t("invitationImage.message")}</InputLabel>
        <OutlinedInput
          label={t("invitationImage.message")}
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
      </FormControl> */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <ArrowUpward color="error" />
        <LoadingButton
          variant="contained"
          color="success"
          sx={{
            // mt: 2,
            width: "150px",
          }}
          onClick={async () => {
            await storeFile.mutate(file);
            setFile((prev) => ({ ...prev, image: "" }));
            // console.log(file)
          }}
          loading={storeFile.isPending}
          startIcon={<SaveOutlined />}
          loadingPosition="start"
        >
          {t("invitationImage.save")}
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default InvitationImage;
