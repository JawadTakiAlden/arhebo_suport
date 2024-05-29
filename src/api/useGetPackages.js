import { useQuery } from '@tanstack/react-query'
import { request } from './request'

const getPackagesRequest = () => {
    return request({
        url  :'/packages'
    })
}

const useGetPackages = () => {
    const query = useQuery({
        queryFn : getPackagesRequest,
        queryKey : ['get-packages']
      })
    
      return query
}

export default useGetPackages