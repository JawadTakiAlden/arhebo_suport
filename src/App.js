import { CssBaseline, Grid, ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import { Navigate, Route, Routes } from "react-router";
import Loadable from "./layouts/Loadable";
import { lazy } from "react";
import MainLayout from "./layouts/MainLayout";
import "./i18n";
import { useTranslation } from "react-i18next";
import Rtl from "./ui-components/RTL";

const Login = Loadable(lazy(() => import("./views/auth/login")));
const Orders = Loadable(lazy(() => import("./views/pages/Orders")));
const AddGuest = Loadable(lazy(() => import("./views/pages/AddGuest")));
const OrderDetials = Loadable(lazy(() => import("./views/pages/OrderDetials")));
const CheckTemplate = Loadable(
  lazy(() => import("./views/pages/CheckTemplate"))
);
function App() {
  const { i18n } = useTranslation();
  
  const theme = createTheme({
    direction: i18n.language === "en" ? "ltr" : "rtl",
    palette: {
      background: {
        default: "#F4F4F4",
      },
    },
    typography : {
      fontFamily : `"Cairo", "Poppins" , sans-serif`
    }
  });
  return i18n.language === "en" ? (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Navigate to={"/dashboard/orders"} />} />
        <Route element={<Login />} path={"/auth/login"} />
        <Route path="/dashboard" element={<MainLayout />}>
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/check_template" element={<CheckTemplate />} />
          <Route
            path="/dashboard/orders/add-guests/:order"
            element={<AddGuest />}
          />
          <Route
            path="/dashboard/orders/show-order/:order"
            element={<OrderDetials />}
          />
        </Route>
      </Routes>
      <CssBaseline />
    </ThemeProvider>
  ) : (
    <Rtl>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Navigate to={"/dashboard/orders"} />} />
          <Route element={<Login />} path={"/auth/login"} />
          <Route path="/dashboard" element={<MainLayout />}>
            <Route path="/dashboard/orders" element={<Orders />} />
            <Route
              path="/dashboard/check_template"
              element={<CheckTemplate />}
            />
            <Route
              path="/dashboard/orders/add-guests/:order"
              element={<AddGuest />}
            />
            <Route
              path="/dashboard/orders/show-order/:order"
              element={<OrderDetials />}
            />
          </Route>
        </Routes>
        <CssBaseline />
      </ThemeProvider>
    </Rtl>
  );
}

export default App;
