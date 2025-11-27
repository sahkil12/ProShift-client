import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useTrackingUpdate = () => {
     const axiosSecure = useAxiosSecure()
     const queryClient = useQueryClient()

     const mutation = useMutation({
          mutationFn: ({ trackingId, status }) =>
               axiosSecure.patch(`/tracking/progress/${trackingId}`, { status }),

          onSuccess: () => {
               queryClient.invalidateQueries(["tracking"]);
               queryClient.invalidateQueries(["parcels"]);
          }
     })

     return mutation
};

export default useTrackingUpdate;