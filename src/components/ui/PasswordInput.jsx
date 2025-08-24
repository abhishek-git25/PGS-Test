import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // or any icon library you use
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PasswordInput({ label, name, register, errors, placeholder, icon: Icon }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col gap-1">
            <Label htmlFor={name} className="text-sm font-medium text-gray-200">
                {label}
            </Label>

            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                )}

                <Input
                    id={name}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    {...register(name)}
                    className={`bg-black/40 border border-gray-700 text-white p-5 ${Icon ? 'pl-10' : ''} pr-10`}
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                    {showPassword ? <EyeOff className="w-4 h-4 cursor-pointer" /> : <Eye className="w-4 h-4 cursor-pointer" />}
                </button>
            </div>

            {errors[name] && (
                <p className="text-red-500 text-xs">{errors[name].message}</p>
            )}
        </div>
    );
}
