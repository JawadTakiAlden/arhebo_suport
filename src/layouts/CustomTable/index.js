import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, Tooltip } from "@mui/material";
import useGetOrders from "../../api/useGetOrders";
import {
  Add,
  CallOutlined,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CustomTable = () => {
  const ordersData = useGetOrders();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      {
        accessorKey: "clint", 
        header: t("CustomTable.client"),
        enableColumnActions: false,
        size: 150,
      },
      {
        accessorKey: "event_name",
        header: t("CustomTable.event_name"),
        enableColumnActions: false,
        size: 150,
      },
      {
        accessorKey: "package",
        header: t("CustomTable.package"),
        enableColumnActions: false,
        size: 150,
      },
      {
        accessorKey: "number",
        header: t("CustomTable.number"),
        enableColumnActions: false,
        size: 200,
      },
      {
        accessorKey: "status",
        header: t("CustomTable.status"),
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
              {t("CustomTable.active")}
            </Button>
          ) : +row.original.status === 2 ? (
            <Button color="success" variant="contained" size="small">
              {t("CustomTable.Done")}
            </Button>
          ) : +row.original.status === 3 ? (
            <Button color="error" variant="contained" size="small">
              {t("CustomTable.Deleted")}
            </Button>
          ) : (
            <Button color="warning" variant="contained" size="small">
              {t("CustomTable.Updated")}
            </Button>
          ),
        size: 150,
      },
      {
        accessorKey : 'action',
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
              {withoutNumber && (
                <Button
                  startIcon={<Add />}
                  onClick={() =>
                    navigate(`/dashboard/orders/add-guests/${row.original.id}`)
                  }
                  color="inherit"
                  variant="outlined"
                  size="medium"
                >
                  {t("CustomTable.add_guests")}
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
          children: t("CustomTable.error_loading_data"),
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
