'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from './components/ui/Header';
import Sidebar from './components/ui/Sidebar';


const AppLayout = ({ children }) => {

    const pathname = usePathname();

    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    const handleSidebarHover = () => {
        if (!isMobile) {
            setIsExpanded(true);
        }
    };

    const handleSidebarLeave = () => {
        if (!isMobile) {
            setIsExpanded(false);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    if (pathname === '/login' || pathname === '/sign-up') {
        return <>{children}</>;
    }


    return (
        <div className="min-h-screen bg-gray-50 flex">
            {isMobile && isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={closeMobileMenu}
                />
            )}
            <Sidebar isMobileMenuOpen={isMobileMenuOpen} isMobile={isMobile} handleSidebarHover={handleSidebarHover} handleSidebarLeave={handleSidebarLeave} toggleMobileMenu={toggleMobileMenu} isExpanded={isExpanded} closeMobileMenu={closeMobileMenu} />
            <div className={`flex-1 flex flex-col transition-all duration-300 ${!isMobile ? 'ml-0' : ''}`}>
                <Header isMobile={isMobile} toggleMobileMenu={toggleMobileMenu} />
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AppLayout
