import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/', // Base URL for all requests
  headers: {
    'Content-Type': 'application/json'
  }
});

export const apiRequest = async (url, options) => {
  try {
    const response = await axiosInstance({
      method: options?.method || 'get',
      url,
      header: options?.header,
      data: options?.data,
      params: options?.params
    });

    return response?.data;
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
};
