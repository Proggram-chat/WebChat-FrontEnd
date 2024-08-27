"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import Link from "next/link";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const schema: ZodType<FormData> = z
  .object({
    email: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z
      .string()
      .min(5, {
        message: "Password must be at least 5 characters.",
      })
      .max(20, {
        message: "Password must be at most 20 characters.",
      }),
    confirmPassword: z
      .string()
      .min(5, {
        message: "Confirm Password must be at least 5 characters.",
      })
      .max(20, {
        message: "Confirm Password must be at most 20 characters.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const RegistrationPage = () => {
  const [seeCurrentPassword, setSeeCurrentPassword] = useState(true);
  const [seeRepeatPassword, setSeeRepeatPassword] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleCurrentPassword = () => {
    setSeeCurrentPassword(!seeCurrentPassword);
  };

  const handleRepeatPassword = () => {
    setSeeRepeatPassword(!seeRepeatPassword);
  };

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="flex w-full items-center h-screen justify-center relative overflow-hidden">
      <Card className="max-w-[400px] border-0 shadow-none w-full bg-white/10 backdrop-blur min-w-[300px]">
        <CardHeader className="flex w-full justify-center items-center">
          <CardTitle className="text-[36px] text-center">
            Join the Program
          </CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col gap-3">
                <div>
                  <Input
                    label="Email"
                    id="email"
                    type="email"
                    error={errors?.email?.message}
                    {...register("email")}
                    placeholder="Email"
                  />
                </div>
                <div>
                  <Input
                    action={
                      <div onClick={handleCurrentPassword}>
                        {seeCurrentPassword ? (
                          <EyeClosedIcon />
                        ) : (
                          <EyeOpenIcon />
                        )}
                      </div>
                    }
                    label="Password"
                    autoComplete="password"
                    id="password"
                    type={seeCurrentPassword ? "password" : "text"}
                    error={errors?.password?.message}
                    {...register("password")}
                    placeholder="Password"
                  />
                </div>
                <div>
                  <Input
                    action={
                      <div onClick={handleRepeatPassword}>
                        {seeRepeatPassword ? (
                          <EyeClosedIcon />
                        ) : (
                          <EyeOpenIcon />
                        )}
                      </div>
                    }
                    label="Repeat password"
                    id="confirmPassword"
                    type={seeRepeatPassword ? "password" : "text"}
                    error={errors?.confirmPassword?.message}
                    {...register("confirmPassword")}
                    placeholder="Repeat password"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5"></div>
            </div>
            <CardFooter className="flex flex-col gap-2 justify-between">
              <Button className="w-full h-[45px]" type="submit">
                Register
              </Button>
              <Label>
                Already have an account?{" "}
                <Link className="text-blue-500" href="/login">
                  Login to account
                </Link>
              </Label>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
