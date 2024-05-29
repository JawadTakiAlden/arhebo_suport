import { useQuery } from "@tanstack/react-query"
import { request } from "./request"
import { useParams } from "react-router-dom"

const showOrderRequest = (order) => {
    return request({
        url  :`/showOrders/${order}`
    })
}
const useShowOrder = () => {
    const {order} = useParams()
  const query = useQuery({
    queryFn : () => showOrderRequest(order),
    queryKey : [`show-order-${order}`]
  })

  return query
}

export default useShowOrder
