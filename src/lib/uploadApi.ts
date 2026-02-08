import { api } from './apiClient';

interface UploadResult {
  images: string[];
}

export const uploadImages = async (files: File[]): Promise<UploadResult> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('images', file);
  });

  const response = (await api.post('/upload/images', formData, {
    auth: true,
  })) as UploadResult;

  return response;
};
