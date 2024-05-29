import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, Fab, Grid, IconButton, Tooltip } from "@mui/material";
import useGetOrders from "../../api/useGetOrders";
import {
  Add,
  CallOutlined,
  CheckOutlined,
  ErrorOutlined,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useGetPackages from "../../api/useGetPackages";
import ReminderPopub from "./ReminderPopub";

const CustomTable = () => {
  const ordersData = useGetOrders();
  const navigate = useNavigate();
  const packages = useGetPackages();

  const columns = useMemo(
    () => [
      {
        accessorKey: "clint", //access nested data with dot notation
        header: "CLIENT",
        enableColumnActions: false,
        size: 150,
      },
      {
        accessorKey: "event_name", //access nested data with dot notation
        header: "Event Name",
        enableColumnActions: false,
        size: 150,
      },
      {
        accessorKey: "package",
        header: "PACKAGE",
        enableColumnActions: false,
        size: 150,
      },
      {
        accessorKey: "number", //normal accessorKey
        header: "NUMBER",
        enableColumnActions: false,
        size: 200,
      },
      // {
      //   header: "QR code",
      //   accessorFn: (originalRow) => (originalRow.qrcode ? true : false),
      //   filterVariant: "checkbox",
      //   enableColumnActions: false,
      //   Cell: ({ row }) =>
      //     row.original.qrcode ? (
      //       <Fab color="success" size="small">
      //         <CheckOutlined />
      //       </Fab>
      //     ) : (
      //       <Fab color="error" size="small">
      //         <ErrorOutlined />
      //       </Fab>
      //     ),
      // },
      {
        accessorKey: "status",
        header: "Status",
        filterVariant: "multi-select",
        filterSelectOptions: [
          { value: "1", label: "Active" },
          { value: "2", label: "Done" },
          { value: "3", label: "Deleted" },
          { value: "3", label: "Updated" },
        ],
        Cell: ({ row }) =>
          +row.original.status === 1 ? (
            <Button color="primary" variant="contained" size="small">
              Active
            </Button>
          ) : +row.original.status === 2 ? (
            <Button color="success" variant="contained" size="small">
              Done
            </Button>
          ) : +row.original.status === 3 ? (
            <Button color="error" variant="contained" size="small">
              Deleted
            </Button>
          ) : (
            <Button color="warning" variant="contained" size="small">
              Updated
            </Button>
          ),
        size: 150,
      },
      {
        header: "Actions",
        enableColumnActions: false,
        Cell: ({ row }) => {
          const withoutNumber = row.original.attribute
            ?.map((obj) => obj.key)
            .includes("withoutNumber");
          return (
            <Box
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                gap: "8px",
                color: "#777777",
              }}
            >
              <Tooltip title={row.original.action}>
                <Button variant="outlined" color="inherit" size="medium">
                  <CallOutlined />
                </Button>
              </Tooltip>

              {!withoutNumber && (
                <Button
                  startIcon={<Add />}
                  onClick={() =>
                    navigate(`/dashboard/orders/add-guests/${row.original.id}`)
                  }
                  color="inherit"
                  variant="outlined"
                  size="medium"
                >
                  Add Guests
                </Button>
              )}

              <Button
                variant="outlined"
                onClick={() =>
                  navigate(`/dashboard/orders/show-order/${row.original.id}`)
                }
                color="inherit"
                size="medium"
              >
                <RemoveRedEyeOutlined />
              </Button>
              {row.original.withReminder && (
                <ReminderPopub row={row.original} />
              )}
            </Box>
          );
        },
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data: ordersData?.data?.data || [],
    enableHiding: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableSorting: false,
    paginationDisplayMode: "pages",
    muiTableContainerProps: {
      sx: {
        maxWidth: "100%",
      },
    },
    muiPaginationProps: {
      color: "success",
      showRowsPerPage: false,
      shape: "rounded",
      variant: "text",
    },
    muiLinearProgressProps: {
      color: "success",
    },
    muiToolbarAlertBannerProps: ordersData.isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableHeadRowProps: {
      sx: {
        backgroundColor: "white",
        boxShadow:
          "2px 2px 10px 0px #0000001A inset , -2px -2px 10px 0px #0000001A inset",
      },
    },
    muiTableHeadCellProps: {
      sx: {
        borderBottom: "10px solid #F4F4F4",
        color: "#4AB37E",
        backgroundColor: "transparent",
        textTransform: "uppercase",
        fontWeight: "600",
        letterSpacing: "1.6px",
      },
    },
    muiTableBodyRowProps: {
      sx: {
        backgroundColor: "white",
        "&:hover .MuiTableCell-root": {
          backgroundColor: "#fbfbfb",
        },
      },
    },
    muiTableBodyCellProps: {
      sx: {
        borderBottom: "6px solid #F4F4F4",
        transition: "0.3s",
      },
    },
    muiTablePaperProps: {
      sx: {
        boxShadow: "none",
      },
    },
    muiBottomToolbarProps: {
      sx: {
        boxShadow: "none",
      },
    },
    state: {
      isLoading: ordersData.isLoading,
      showAlertBanner: ordersData.isError,
      showProgressBars: ordersData.isRefetching,
    },
  });
  return (
    <Box>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default CustomTable;
