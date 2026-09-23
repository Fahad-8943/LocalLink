import axiosInstance from "./axiosInstance";

export const getServices = () => {
  return axiosInstance.get("/services");
};
export const createServices = (service) => {
  return axiosInstance.post("/services", service);
};

export const updateServiceApi = (id, service) => {
  return axiosInstance.patch(`/services/${id}`, service);
};

export const deleteServiceApi = (id) => {
  return axiosInstance.delete(`/services/${id}`);
};