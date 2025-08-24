'use client'
import { toast } from 'react-toastify';

export const useToast = () => {
    const showSuccess = (message = 'Operation successful!') => {
        toast.success(message);
    };

    const showError = (message = 'Something went wrong!') => {
        toast.error(message);
    };

    return { showSuccess, showError };
};
