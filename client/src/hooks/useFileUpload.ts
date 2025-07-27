import { useState, useCallback } from 'react';

// 🔄 Enhanced FormData file upload hook
export interface FileUploadOptions {
  endpoint: string;
  method?: 'POST' | 'PUT' | 'PATCH';
  onProgress?: (progress: number) => void;
  onSuccess?: (response: any) => void;
  onError?: (error: string) => void;
  additionalData?: Record<string, any>;
}

export interface FileUploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
  response: any;
}

export const useFileUpload = () => {
  const [state, setState] = useState<FileUploadState>({
    isUploading: false,
    progress: 0,
    error: null,
    response: null
  });

  const uploadFiles = useCallback(async (
    files: FileList | File[],
    options: FileUploadOptions
  ) => {
    setState({
      isUploading: true,
      progress: 0,
      error: null,
      response: null
    });

    try {
      // 🔄 Bonus: Frontend FormData implementation
      const formData = new FormData();
      
      // Add files to FormData
      const fileArray = Array.from(files);
      fileArray.forEach((file, index) => {
        formData.append(`files`, file);
      });

      // Add additional metadata
      if (options.additionalData) {
        Object.entries(options.additionalData).forEach(([key, value]) => {
          formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
        });
      }

      // Create XMLHttpRequest for progress tracking
      const xhr = new XMLHttpRequest();
      
      return new Promise((resolve, reject) => {
        // Progress tracking
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const progress = Math.round((e.loaded / e.total) * 100);
            setState(prev => ({ ...prev, progress }));
            options.onProgress?.(progress);
          }
        });

        // Success handler
        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const response = JSON.parse(xhr.responseText);
              setState(prev => ({
                ...prev,
                isUploading: false,
                response,
                progress: 100
              }));
              options.onSuccess?.(response);
              resolve(response);
            } catch (e) {
              const error = 'Invalid response format';
              setState(prev => ({ ...prev, isUploading: false, error }));
              options.onError?.(error);
              reject(new Error(error));
            }
          } else {
            const error = `Upload failed with status: ${xhr.status}`;
            setState(prev => ({ ...prev, isUploading: false, error }));
            options.onError?.(error);
            reject(new Error(error));
          }
        });

        // Error handler
        xhr.addEventListener('error', () => {
          const error = 'Network error during upload';
          setState(prev => ({ ...prev, isUploading: false, error }));
          options.onError?.(error);
          reject(new Error(error));
        });

        // Abort handler
        xhr.addEventListener('abort', () => {
          const error = 'Upload was cancelled';
          setState(prev => ({ ...prev, isUploading: false, error }));
          options.onError?.(error);
          reject(new Error(error));
        });

        // Send request
        xhr.open(options.method || 'POST', options.endpoint);
        xhr.send(formData);
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      setState(prev => ({
        ...prev,
        isUploading: false,
        error: errorMessage
      }));
      options.onError?.(errorMessage);
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      isUploading: false,
      progress: 0,
      error: null,
      response: null
    });
  }, []);

  return {
    ...state,
    uploadFiles,
    reset
  };
};

// Utility function for simple fetch-based uploads
export const uploadWithFormData = async (
  files: FileList | File[],
  endpoint: string,
  additionalData?: Record<string, any>
) => {
  const formData = new FormData();
  
  // Add files
  Array.from(files).forEach((file) => {
    formData.append("files", file);
  });

  // Add additional data
  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
    });
  }

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  return response.json();
};