// components/AuthWrapper.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/Loader';
import useLocalStorage from '@/hooks/useLocalStorag';


const AuthWrapper = ({ children }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [authUser] = useLocalStorage('pb_auth', null);

    useEffect(() => {
        const handlePopState = () => {
            if (!authUser || !authUser.baseToken) {
                router.replace('/login')
            } else {
                router.replace('/dashboard');
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    useEffect(() => {
        setLoading(true);

        if (!authUser || !authUser.baseToken) {
            router.replace('/login'); 
        } else {
            router.replace('/dashboard');
        }

        setLoading(false);
    }, [router]);

    if (loading) return <Loader />;

    return <>{children}</>;
};

export default AuthWrapper;
