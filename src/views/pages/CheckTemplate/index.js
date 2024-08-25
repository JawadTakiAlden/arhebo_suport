import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
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
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <FormControl color="success">
        <InputLabel>{t("checkTemplate.templateNumber")}</InputLabel>
        <OutlinedInput
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          label={t("checkTemplate.templateNumber")}
        />
      </FormControl>
      <LoadingButton
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
      {!check.mutate.isPending &&
        !check.mutate.isError &&
        check.mutate?.data?.data && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <img
              src={check.mutate?.data?.data?.template}
              alt="template"
              style={{
                maxWidth: "700px",
              }}
            />
          </Box>
        )}
    </Box>
  );
};

export default CheckTemplate;
