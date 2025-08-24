// lib/useSignupUser.js
"use client"
import pb from '@/lib/pocketbase';
import { useMutation } from '@tanstack/react-query';

const signupUserAPI = async (payload) => {
    const { email, password, name, avatarFile } = payload

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('passwordConfirm', password);
    formData.append('name', name);

    if (avatarFile) {
        formData.append('avatar', avatarFile);
    }
    try {
        const record = await pb.collection('users').create(formData);
        return { success: true, record, authStore: pb.authStore };
    } catch (error) {
        let message = "Signup failed";
        if (error?.data && error?.data?.data?.email) {
            message = error.data?.data.email.message;
        } else {
            message = error.message || message;
        }
        return { success: false, error: message };
    }
};


const loginUserAPI = async ({ email, password }) => {
    try {
        const authData = await pb.collection('users').authWithPassword(email, password);        
        return { success: true, authStore: pb.authStore, user: authData.record };
    } catch (error) {
        return { success: false, error: error?.data?.message };
    }
}

export const useSignupUser = () => {
    return useMutation({
        mutationFn: signupUserAPI,
    });
};


export const useLoginUser = () => {
    return useMutation({
        mutationFn: loginUserAPI,
    });
};