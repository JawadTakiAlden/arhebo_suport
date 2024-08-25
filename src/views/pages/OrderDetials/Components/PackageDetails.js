import React from "react";
import {
  Box,
  List,
  ListItem as BaseListItem,
  Typography,
  styled,
  ListItemText,
} from "@mui/material";
import { useTranslation } from 'react-i18next';

const ListItem = styled(BaseListItem)(({ theme }) => ({
  borderLeft: `1px solid ${theme.palette.success.main}`,
  borderRadius: "4px",
  marginBottom: theme.spacing(2),
}));

const PackageDetails = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        boxShadow: "1px 1px 10px -5px rgba(0,0,0,0.4)",
        borderRadius: "12px",
        padding: 2,
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
      <Typography mb={2} mt={2}>
        {t('packageDetails.discount')}: {data?.discount}%
      </Typography>
      <List subheader={<Typography>{t('packageDetails.features')}</Typography>}>
        {data?.packageDescription.split('\n').map((description, i) => (
          <ListItem key={i}>
            <ListItemText>{description}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PackageDetails;
