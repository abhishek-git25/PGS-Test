'use client'
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormInput } from "@/components/ui/FormInput";
import Loader from "@/components/ui/Loader";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useToast } from "@/hooks/useToast";
import { useLoginUser } from "@/services/authServices";
import { Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorag";


const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(8, "At least 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
            "Must contain one uppercase, one lowercase, and one special character"
        )
        .required("Password is required"),
});

const Login = () => {

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            terms: false,
        },
    });

    const [authUser , setAuthUser] = useLocalStorage('pb_auth' , null)

    const { showError, showSuccess } = useToast();
    const loginMutation = useLoginUser();

    const router = useRouter();

    const onSubmit = (data) => {
        loginMutation.mutate(
            { email: data?.email, password: data?.password },
            {
                onSuccess: ({ success, user, authStore, error }) => {
                    if (success) {
                        console.log(authStore, user, "57");
                        setAuthUser(authStore)
                        showSuccess('Login successful!');
                        router.push('/dashboard');
                    } else {
                        showError(error);
                    }
                },
            }
        );
    };


    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-200 to-gray-400">
                <div className="relative w-full max-w-sm">
                    {loginMutation?.isPending && <Loader />}
                    <Card className="w-full max-w-sm bg-black/90 text-white rounded-2xl p-6 shadow-lg">
                        <CardHeader>
                            <h4 className="text-2xl"><span className="font-bold">Log in</span> to your account!</h4>
                            <p className="text-xs text-gray-400 mb-3">
                                Enter your email and password to login
                            </p>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                <div>
                                    <FormInput
                                        type="email"
                                        name="email"
                                        register={register}
                                        errors={errors}
                                        placeholder="Enter Email Address"
                                        icon={Mail}
                                    />
                                </div>

                                <div>
                                    <PasswordInput
                                        type="password"
                                        name="password"
                                        register={register}
                                        errors={errors}
                                        placeholder="Enter password..."
                                        icon={Lock}
                                    />
                                </div>

                                {/* Remember me + Forgot Password */}
                                <div className="flex items-center justify-between text-sm mt-2 mb-1">
                                    <div className="flex items-center space-x-2">
                                        <Controller
                                            name="remember"
                                            control={control}
                                            render={({ field }) => (
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    id="remember"
                                                />
                                            )}
                                        />
                                        <label htmlFor="remember" className="cursor-pointer text-gray-400">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#" className="text-gray-400 hover:underline">
                                        Forgot Password?
                                    </a>
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-white text-black hover:bg-gray-200"
                                >
                                    Sign In to Account
                                </Button>
                            </form>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4">
                            <hr className="border-zinc-800 w-full" />
                            <p className="text-sm text-gray-400 text-center">
                                Don’t have an account?{" "}
                            </p>
                            <Button
                                variant="outline"
                                className="w-full bg-transparent hover:bg-zinc-800 hover:text-white cursor-pointer"
                                onClick={() => router.push("/sign-up")}
                            >
                                Create New Account
                            </Button>
                            <p className="text-xs text-gray-500 text-center mt-3">
                                2025 © Demo Panel | FE
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Login
