import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "./request";
import { useSnackbar } from "notistack";
import { useParams } from "react-router";



const useUpdateNumberOfInvitees = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const {order} = useParams()
  const updateNumberOfInvitees = (data) => {
    return request({
      url: `/updateInviteeSupport`,
      method: "patch",
      data,
    });
  };

  const mutation = useMutation({
    mutationFn: updateNumberOfInvitees,
    mutationKey: [`update_number_of_invitees`],
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

export default useUpdateNumberOfInvitees;
