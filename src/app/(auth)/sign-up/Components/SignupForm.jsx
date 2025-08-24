'use client'
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormInput } from "@/components/ui/FormInput";
import ProfileImageUpload from "@/components/ui/ImageUpload";
import TermsModal from "./TermsandCondition";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useSignupUser } from "@/services/authServices";
import { useToast } from "@/hooks/useToast";
import Loader from "@/components/ui/Loader";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(8, "At least 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
            "Must contain one uppercase, one lowercase, and one special character"
        )
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    terms: yup.boolean().oneOf([true], "You must accept the terms")
});

const SignupForm = () => {

    const signupMutation = useSignupUser();
    const router = useRouter();

    const { showSuccess, showError } = useToast();

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

    const onSubmit = (data) => {
        signupMutation.mutate(
            { ...data, name: data.fullName, avatarFile: data.avatar },
            {
                onSuccess: ({ success, record, authStore, error }) => {
                    if (success) {
                        showSuccess('Signup successful!');
                        router.push('/login');
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
                <div className="relative">
                    {signupMutation?.isPending && <Loader />}

                    <Card className="w-full max-w-2xl bg-black/90 text-white rounded-2xl p-6 shadow-lg">
                        <CardHeader>
                            <h4 className="text-2xl"><span className="font-bold">Create</span> your account!</h4>
                            <p className="text-xs text-gray-400 mb-3">
                                Sign up to unlock exclusive features.
                            </p>
                            <hr className="border-muted/20"></hr>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-8">
                                    <div className="">
                                        <ProfileImageUpload name="avatar" register={register} errors={errors} />
                                    </div>
                                    <div className="w-full">
                                        <FormInput
                                            label="Full Name"
                                            name="fullName"
                                            register={register}
                                            errors={errors}
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormInput
                                        label="Username"
                                        name="username"
                                        register={register}
                                        errors={errors}
                                        placeholder="Enter your username"
                                    />
                                    <FormInput
                                        label="Email Address"
                                        name="email"
                                        register={register}
                                        errors={errors}
                                        placeholder="Enter your email"
                                        type="email"
                                    />
                                    <PasswordInput
                                        label="Password"
                                        name="password"
                                        register={register}
                                        errors={errors}
                                        placeholder="Enter password"
                                        type="password"
                                    />
                                    <PasswordInput
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        register={register}
                                        errors={errors}
                                        placeholder="Confirm password"
                                        type="password"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Controller
                                            name="terms"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id="terms"
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                    <label htmlFor="terms" className="text-sm text-gray-300 cursor-pointer">
                                                        I accept the{" "}
                                                        <TermsModal
                                                            trigger={
                                                                <span className="font-medium underline text-white">
                                                                    Terms & Conditions
                                                                </span>
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                            )}
                                        />
                                        {errors.terms && (
                                            <p className="text-red-500 text-xs">{errors.terms.message}</p>
                                        )}
                                    </div>

                                    <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
                                        Create Account →
                                    </Button>
                                </div>
                            </form>
                            <CardFooter className="p-0">
                                <hr className="border-muted/20 "></hr>
                                <p className="text-sm text-gray-400  mt-4">
                                    Already have an account?{" "}
                                    <a href="/login" className="underline text-white">Log in</a>
                                </p>
                            </CardFooter>

                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default SignupForm
