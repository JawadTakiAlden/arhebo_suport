import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useGetTemplateByNumber from "../../../api/useGetTemplateByNumber";
import { useTranslation } from "react-i18next";

const CheckTemplate = () => {
  const [template, setTemplate] = useState("");
  const check = useGetTemplateByNumber();
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        flexWrap : 'wrap'
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "calc(40% - 20px)" },
        }}
      >
        <Typography
          sx={{
            mb: 1,
            fontWeight: "500px",
            fontSize: "22px",
          }}
        >
          {t('checkTemplate.templateSearchPrompt')}
        </Typography>
        <Typography
          sx={{
            mb: 1,
            fontWeight: "500px",
            color : 'grey.400',
            fontSize: "18px",
          }}
        >
           {t('checkTemplate.templateSearchResult')}
        </Typography>
        <FormControl margin="dense" color="success" fullWidth>
          <InputLabel>{t("checkTemplate.templateNumber")}</InputLabel>
          <OutlinedInput
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            label={t("checkTemplate.templateNumber")}
          />
        </FormControl>
        <LoadingButton
          fullWidth
          color="success"
          variant="outlined"
          loading={check.isLoading}
          disabled={!template}
          onClick={() => {
            check.callMutation(template);
          }}
        >
          {t("checkTemplate.check")}
        </LoadingButton>
      </Box>
      <Box
        sx={{
          width: { xs: " 100%", sm: "calc(60% - 20px)" },
          p: 1,
          borderRadius: "12px",
          height : 'calc(100vh - 120px)',
          border: (theme) => `1px dashed ${theme.palette.grey[400]}`,
          position : 'relative',
          textAlign : 'center'
        }}
      >
        {!check.mutate.isPending &&
          !check.mutate.isError &&
          check.mutate?.data?.data && (
              <img
                src={check.mutate?.data?.data?.template}
                alt="template"
                style={{
                  // maxWidth: "700px",
                  maxHeight : '100%',
                  maxWidth : '100%',
                  objectFit : 'contain',
                  borderRadius : '10px'
                }}
              />
          )}
      </Box>
    </Box>
  );
};

export default CheckTemplate;
