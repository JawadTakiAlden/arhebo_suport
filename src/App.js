import { CssBaseline, Grid, ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import { Route, Routes } from "react-router";
import Loadable from "./layouts/Loadable";
import { lazy } from "react";
import MainLayout from "./layouts/MainLayout";

const theme = createTheme({
  palette : {
    background : {
      default : '#F4F4F4'
    }
  }
})
const Login = Loadable(lazy(() => import('./views/auth/login')))
const Orders = Loadable(lazy(() => import("./views/pages/Orders")))
const AddGuest = Loadable(lazy(() => import("./views/pages/AddGuest")))
const OrderDetials = Loadable(lazy(() => import('./views/pages/OrderDetials')))
const CheckTemplate = Loadable(lazy(() => import('./views/pages/CheckTemplate')))
function App() {
  return <ThemeProvider theme={theme}>
      <Routes>
      <Route element={<Login />} path={"/"} />
      <Route path="/dashboard" element={<MainLayout />}>
        <Route path="/dashboard/orders" element={<Orders />} />
        <Route path="/dashboard/check_template" element={<CheckTemplate />} />
        <Route path="/dashboard/orders/add-guests/:order" element={<AddGuest />}/>
        <Route path="/dashboard/orders/show-order/:order" element={<OrderDetials />}/>
      </Route>
    </Routes>
    <CssBaseline />
  </ThemeProvider>;
}

export default App;
