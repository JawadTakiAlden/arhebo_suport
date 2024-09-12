import { Login, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { request } from "../../../api/request";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
const loginUserIn = (values) => {
  return request({
    url: "/login",
    method: "post",
    data: values,
  });
};
const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const loginMutation = useMutation({
    mutationFn: loginUserIn,
    mutationKey: ["login-user"],
    onSuccess: (data) => {
      if(data?.data?.user.type === 3){
        localStorage.setItem("arhebo-token", data.data.access_token);
        localStorage.setItem(
          "arhebo-admin-profile",
          JSON.stringify(data.data.user)
        );
        navigate("/dashboard/orders");
      }else{
        enqueueSnackbar("permission denide , you'r account is not authorized to log in" , {variant : 'error'})
      }
    },
    onError: (error) => {
      if (error.response) {
        // enqueueSnackbar(error.response.data[0] , {variant : 'error'})
      }
    },
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const LoginUserIn = (values) => {
    loginMutation.mutate(values);
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "600px",
          p: 2,
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={LoginUserIn}
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
              <FormControl
                color="success"
                sx={{ mb: 1 }}
                fullWidth
                variant="outlined"
              >
                <InputLabel>{t("LoginForm.email")}</InputLabel>
                <OutlinedInput
                  id="email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email && touched.email}
                  label={t("LoginForm.email")}
                  sx={{
                    borderRadius: "12px",
                  }}
                />
                {touched.email && errors.email && (
                  <FormHelperText error>{errors.email}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                color="success"
                sx={{ mb: 1 }}
                fullWidth
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  {t("LoginForm.password")}
                </InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password && touched.password}
                  sx={{
                    borderRadius: "12px",
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label={t("LoginForm.password")}
                />
                {touched.password && errors.password && (
                  <FormHelperText error>{errors.password}</FormHelperText>
                )}
              </FormControl>
              <FormControl color="success" fullWidth variant="outlined">
                <LoadingButton
                  loading={loginMutation.isPending}
                  loadingPosition="start"
                  startIcon={<Login />}
                  variant="contained"
                  sx={{
                    height: "50px",
                    backgroundColor: "#4AB37E",
                    "&:hover": { backgroundColor: "#4AB37E" },
                  }}
                  type="submit"
                  fullWidth
                  color="success"
                >
                  {t("LoginForm.login")}
                </LoadingButton>
                {/* <Button type="submit" fullWidth color="success" disabled={loginMutation.isPending} variant="contained" sx={{height : '50px' , backgroundColor : '#4AB37E' , "&:hover" : { backgroundColor : '#4AB37E'} }}>login</Button> */}
              </FormControl>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(62).required(),
});

export default LoginForm;
