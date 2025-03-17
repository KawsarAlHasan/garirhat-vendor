import { API } from "./api";
import { useQuery } from "@tanstack/react-query";

// get Single Vehicle
export const useSingleVehicle = (id) => {
  const getSingleVehicle = async () => {
    const response = await API.get(`/vehicle/${id}`);
    return response.data;
  };

  const {
    data: singleVehicle = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["singleVehicle", id],
    queryFn: getSingleVehicle,
  });

  return { singleVehicle, isLoading, isError, error, refetch };
};
