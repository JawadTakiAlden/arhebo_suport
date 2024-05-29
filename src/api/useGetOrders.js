import { useQuery } from "@tanstack/react-query"
import { request } from "./request"

const getOrdersRequest = () => {
    return request({
        url  :'/orders'
    })
}
const useGetOrders = () => {
  const query = useQuery({
    queryFn : getOrdersRequest,
    queryKey : ['get-orders']
  })

  return query
}

export default useGetOrders