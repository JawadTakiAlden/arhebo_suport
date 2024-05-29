import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "./request";
import { useSnackbar } from "notistack";
import { useParams } from "react-router";

const useAddImageAndMessageOfInvitasion = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { order } = useParams();
  const queryClient = useQueryClient();
  const getTemplateByCode = (data) => {
    return request({
      url: `/storeImage`,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const mutation = useMutation({
    mutationFn: getTemplateByCode,
    mutationKey: [`store-image-of-invitation`],
    onSuccess: (data) => {
      queryClient.refetchQueries([`show-order-${order}`]);
      enqueueSnackbar(data?.data?.message , {
        variant : 'success'
      })
    },
    onError: (error) => {
      if (error.response) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    },
  });

  return mutation;
};

export default useAddImageAndMessageOfInvitasion;
