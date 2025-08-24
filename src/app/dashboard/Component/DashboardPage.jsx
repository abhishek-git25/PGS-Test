'use client'

import useLocalStorage from "@/hooks/useLocalStorag"
import { Network, Server } from "lucide-react";

const DashboardPage = () => {
    const [authUser, setAuthUser] = useLocalStorage('pb_auth', null)
    console.log(authUser , "7");
    


    return (
        <div className="p-10">
            <h2 className="text-2xl font-semibold mb-2 flex gap-4  items-center"> <Network size={24} /> Dashboard</h2>
            <p className="text-4xl font-bold" >Platform Dashboard  </p>
        </div>
    )
}

export default DashboardPage
