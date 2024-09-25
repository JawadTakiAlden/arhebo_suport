import { useMutation } from "@tanstack/react-query";
import { request } from "./request";
import { useSnackbar } from "notistack";

const useGetTemplateByNumber = () => {
  const { enqueueSnackbar } = useSnackbar();
  const getTemplateByCode = (code) => {
    return request({
      url: `/templateByCode?template_code=${code}`,
    });
  };

  const query = useMutation({
    mutationFn: getTemplateByCode,
    mutationKey: [`get-template-by-code`],
    onError: (error) => {
      enqueueSnackbar("this template not found", {
        variant: "error",
      });
    },
    onSuccess: (data) => {},
  });

  const callMutation = (code) => {
    query.mutate(code);
  };

  return {
    isLoading: query.isPending,
    callMutation: callMutation,
    mutate: query,
  };
};

export default useGetTemplateByNumber;
