import axiosInstance from "./axiosInstance";

export const getUsers = () => {
  return axiosInstance.get("/users");
};

export const createUser = (user) => {
  return axiosInstance.post("/users", user);
};