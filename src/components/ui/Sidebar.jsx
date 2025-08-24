'use client'
import useLocalStorage from '@/hooks/useLocalStorag';
import pb from '@/lib/pocketbase';
import {
    BarChart3,
    Calendar,
    FileText,
    Home,
    Layers,
    LogOut,
    Package,
    Settings,
    User,
    Users,
    X
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const Sidebar = ({ isExpanded, handleSidebarLeave, handleSidebarHover, isMobile, isMobileMenuOpen, closeMobileMenu }) => {

    const [authUser, setAuthUser] = useLocalStorage('pb_auth', null)

    const sidebarItems = [
        { icon: Home, label: 'Dashboard', href: '/', active: true },
        { icon: Calendar, label: 'Events', href: '/events' },
        { icon: Package, label: 'Products', href: '/products' },
        { icon: Layers, label: 'Categories', href: '/categories' },
        { icon: FileText, label: 'Orders', href: '/orders' },
        { icon: BarChart3, label: 'Analytics', href: '/analytics' },
        { icon: Users, label: 'Clients', href: '/clients' },
        { icon: Settings, label: 'Settings', href: '/settings' }
    ];

    const router = useRouter();

    const logout = () => {
        setAuthUser(null)
        router.push('/login')
        pb.authStore.clear()
    }




    return (
        <div>
            <div className={`
          ${isMobile ? 'fixed' : 'sticky'} 
          top-0 left-0 h-full bg-gray-900 z-50 transition-all duration-300 ease-in-out
          ${isMobile ? (isMobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full') : 'translate-x-0'}
          ${isExpanded && !isMobile ? 'w-64' : 'w-20'}
        `}
                onMouseEnter={handleSidebarHover}
                onMouseLeave={handleSidebarLeave}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center flex-shrink-0">
                                <div className="w-4 h-4 bg-gray-900 rounded-sm"></div>
                            </div>
                            {(isExpanded || isMobileMenuOpen) && (
                                <span className="text-white font-semibold text-lg whitespace-nowrap">
                                    Platform
                                </span>
                            )}
                        </div>
                        {isMobile && (
                            <button
                                onClick={closeMobileMenu}
                                className="text-gray-400 hover:text-white p-1"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                    <nav className="flex-1 px-4 space-y-2">
                        {sidebarItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={index}
                                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${item.active
                                        ? 'bg-gray-700 text-white'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800 p-2'
                                        } ${isMobileMenuOpen || isExpanded ? "w-full" : ""} `}
                                    title={!isExpanded && !isMobileMenuOpen ? item.label : ''}
                                    onClick={() => isMobile && closeMobileMenu()}
                                >
                                    <Icon size={20} className="flex-shrink-0" />
                                    {(isExpanded || isMobileMenuOpen) && (
                                        <span className="whitespace-nowrap font-medium">
                                            {item.label}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    {(isExpanded || isMobileMenuOpen) && (
                        <div className="p-4 border-t border-gray-700">
                            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 cursor-pointer">
                                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                                    <User size={16} className="text-gray-300" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-white font-medium truncate">{authUser?.baseModel?.name}</p>
                                    <p className="text-xs text-gray-400 truncate">{authUser?.baseModel?.email}</p>
                                </div>
                            </div>

                            {/* Logout Button */}
                            <div
                                onClick={() => { logout() }}
                                className="flex items-center space-x-3 p-2 mt-2 rounded-lg hover:bg-gray-800 cursor-pointer"
                            >
                                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                                    <LogOut size={16} className="text-white" />
                                </div>
                                {isExpanded && <span className="text-sm text-white font-medium">Logout</span>}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
