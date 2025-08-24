'use client'
import {
    Bell,
    Home,
    Menu,
    Plus,
    Search,
    Settings,
    User
} from 'lucide-react';

const Header = ({ isMobile, toggleMobileMenu }) => {
    return (
        <div>
            <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
                <div className="flex items-center space-x-4">
                    {/* Mobile Menu Button */}
                    {isMobile && (
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 text-gray-500 hover:text-gray-700 md:hidden"
                        >
                            <Menu size={20} />
                        </button>
                    )}
                    <div className="relative hidden sm:block">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search Events..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 md:w-50"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-2 md:space-x-4">
                    {/* Search - Hidden on small screens */}


                    {/* Action Buttons */}
                    <button className="hidden md:flex bg-white border border-2 border-gray-700 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 items-center space-x-2">
                        <span>New Client</span>
                        <Plus size={16} />
                    </button>

                    <button className="bg-gray-900 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center space-x-2">
                        <span className="hidden sm:inline">New Work Order</span>
                        <Plus size={16} />
                    </button>

                    {/* User Actions */}
                    <div className="flex items-center space-x-2 md:space-x-3">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hidden md:block border border-gray-300 rounded-lg">
                            <Settings size={20} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 relative border border-gray-300 rounded-lg">
                            <Bell size={20} />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                        </button>
                        <button className="w-10 h-10 bg-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-400 transition-colors overflow-hidden">
                            {/* {userImage ? (
                                <img
                                    src={userImage}
                                    alt="User avatar"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : ( */}
                            <User size={16} />
                            {/* )} */}
                        </button>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
