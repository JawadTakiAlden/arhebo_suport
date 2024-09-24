import { useQuery } from "@tanstack/react-query";
import { request } from "./request";
import { useParams } from "react-router";
const useGgetGusests = () => {
  const { order } = useParams();
  const getGuests = () => {
    return request({
      url: `/getInviteeToUpdateSupport/${order}`,
    });
  };

  const query = useQuery({
    queryFn: getGuests,
    queryKey: [`get-all-gusest-${order}`],
  });

  return query;
};

export default useGgetGusests;
