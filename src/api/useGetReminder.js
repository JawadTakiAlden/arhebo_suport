import { useQuery } from "@tanstack/react-query"
import { request } from "./request"
import { useParams } from "react-router-dom"

const useGetReminder = () => {
    const {order} = useParams()
    const showOrderRequest = () => {
        return request({
            url  :`/getReninder/${order}`
        })
    }
    
  const query = useQuery({
    queryFn : showOrderRequest,
    queryKey : [`get-reminder-${order}`]
  })

  return query
}

export default useGetReminder