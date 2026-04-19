import axiosInstance from './axiosInstance';

export const registerUser  = (data) => axiosInstance.post('/auth/register', data);
export const loginUser     = (data) => axiosInstance.post('/auth/login', data);
export const getMe         = ()     => axiosInstance.get('/auth/me');

export const getAllResumes  = ()     => axiosInstance.get('/resumes');
export const getResume     = (id)   => axiosInstance.get(`/resumes/${id}`);
export const createResume  = (data) => axiosInstance.post('/resumes', data);
export const updateResume  = (id, data) => axiosInstance.put(`/resumes/${id}`, data);
export const deleteResume  = (id)   => axiosInstance.delete(`/resumes/${id}`);