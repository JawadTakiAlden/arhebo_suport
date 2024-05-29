import {
  Box,
  List,
  ListItem as BaseListItem,
  Typography,
  styled,
  ListItemText,
} from "@mui/material";
import React from "react";

const ListItem = styled(BaseListItem)(({ theme }) => ({
  borderLeft: `1px solid ${theme.palette.success.main}`,
  borderRadius: "4px",
  mb: 2,
}));

const PackageDetails = ({ data }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        boxShadow: "1px 1px 10px -5px rgba(0,0,0,0.4)",
        borderRadius: "12px",
        p: 2,
      }}
    >
      
      <Typography
        color={"success.main"}
        sx={{
          fontSize: "25px",
          fontWeight: "500",
        }}
      >
        {data?.packageName}
      </Typography>
      <Typography
        mb={2} mt={2}
      >
        Discount In this Package is : {data?.discount}%
      </Typography>
      <List subheader="Featuer">
        {data?.packageDescription.split('\n').map((description , i) => (
          <ListItem key={i}>
            <ListItemText>{description}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PackageDetails;
