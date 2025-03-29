import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const API = axios.create({
  // baseURL: "http://localhost:2001/api/v1",
  baseURL: "https://api.garirhat.com/api/v1",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// sign out
export const signOutVendor = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

// get all vehicles
export const useMyVehicles = ({
  page = 1,
  limit = 10,
  vehicle_code = "",
} = {}) => {
  const getMyVehicles = async () => {
    const response = await API.get("/vehicle/web", {
      params: { page, limit, vehicle_code },
    });
    return response.data;
  };

  const {
    data: response = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myVehicles", page, limit, vehicle_code],
    queryFn: getMyVehicles,
  });

  const { data: myVehicles = [], pagination = {} } = response;

  return { myVehicles, pagination, isLoading, isError, error, refetch };
};

// alLocation list
export const useAlLocation = () => {
  const getAlLocation = async () => {
    const response = await API.get("/location/division_districts_upazilas");
    return response.data.data;
  };

  const {
    data: alLocation = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["alLocation"],
    queryFn: getAlLocation,
  });

  return { alLocation, isLoading, isError, error, refetch };
};

// AlFeature list
export const useAlFeature = () => {
  const getAlFeature = async () => {
    const response = await API.get("/feature/all");
    return response.data.data;
  };

  const {
    data: alFeature = [],
    isLoadingFeature,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["alFeature"],
    queryFn: getAlFeature,
  });

  return { alFeature, isLoadingFeature, isError, error, refetch };
};

// all brand list
export const useAllBrand = () => {
  const getAllBrand = async () => {
    const response = await API.get("/brand");
    return response.data.data;
  };

  const {
    data: allBrand = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allBrand"],
    queryFn: getAllBrand,
  });

  return { allBrand, isLoading, isError, error, refetch };
};

// all Model with Single brand

export const useModelByBrand = (brandID) => {
  const getModelByBrand = async () => {
    const response = await API.get(`/model?brand_id=${brandID}`);
    return response.data;
  };
  const {
    data: modelByBrand = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["modelByBrand", brandID],
    queryFn: getModelByBrand,
  });
  return { modelByBrand, isLoading, isError, error, refetch };
};

//  Price reason
export const usePriceReason = () => {
  const getPriceReason = async () => {
    const response = await API.get("/price-reason/all");
    return response.data.data;
  };

  const {
    data: priceReason = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["PriceReason"],
    queryFn: getPriceReason,
  });

  return { priceReason, isLoading, isError, error, refetch };
};

export const useVendorProfile = () => {
  const getVendorProfile = async () => {
    try {
      const response = await API.get("/vendor/me");
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const {
    data: vendorProfile = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["vendorProfile"],
    queryFn: getVendorProfile,
  });

  return { vendorProfile, isLoading, isError, error, refetch };
};

export const useMyProfile = () => {
  const getVendorMyProfile = async () => {
    try {
      const response = await API.get("/vendor/my-profile");
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const {
    data: myProfile = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myProfile"],
    queryFn: getVendorMyProfile,
  });

  return { myProfile, isLoading, isError, error, refetch };
};

export const useMessages = ({ sender_id, receiver_id } = {}) => {
  const getMessage = async () => {
    const response = await API.get("/message", {
      params: { sender_id, receiver_id },
    });
    return response.data.data;
  };

  const {
    data: senderMessages = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["senderMessages"],
    queryFn: getMessage,
  });

  return { senderMessages, isLoading, isError, error, refetch };
};

export const useMessagesSender = (vendorID) => {
  const getMessageSenderList = async () => {
    const response = await API.get(`/message/sender/${vendorID}`);

    return response.data;
  };
  const {
    data: messageSenderList = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["messageSenderList", vendorID],
    queryFn: getMessageSenderList,
  });
  return { messageSenderList, isLoading, isError, error, refetch };
};

export const useSingleUserMessage = ({ sender_id, receiver_id } = {}) => {
  const getSingleUserMessage = async () => {
    const response = await API.get("/message/single", {
      params: { sender_id, receiver_id },
    });
    return response.data;
  };

  const {
    data: singleUserMessage = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["singleUserMessage"],
    queryFn: getSingleUserMessage,
  });

  return { singleUserMessage, isLoading, isError, error, refetch };
};

export const useVendorsEmployee = (vendorId) => {
  const getVendorsEmployee = async () => {
    const response = await API.get(`vendor-employees/all`);
    return response.data;
  };
  const {
    data: vendorsEmployee = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["vendorsEmployee", vendorId],
    queryFn: getVendorsEmployee,
  });
  return { vendorsEmployee, isLoading, isError, error, refetch };
};
