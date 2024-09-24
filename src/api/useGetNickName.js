import { useQuery } from "@tanstack/react-query";
import { request } from "./request";
const useGetNickName = () => {
  const getAllNickName = () => {
    return request({
      url: `/nicknames`,
    });
  };

  const query = useQuery({
    queryFn: getAllNickName,
    queryKey: ["get-all-nicknames"],
  });

  return query;
};

export default useGetNickName;
