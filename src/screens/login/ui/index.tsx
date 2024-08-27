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
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

const schema: ZodType<FormData> = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export const LoginPage = () => {
  const [seeCurrentPassword, setSeeCurrentPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    console.log(data);
  };

  const handleCurrentPassword = () => {
    setSeeCurrentPassword(!seeCurrentPassword);
  };

  return (
    <div className="flex w-full items-center h-screen justify-center relative overflow-hidden">
      <Card className="max-w-[400px] border-0 shadow-none w-full bg-white/10 backdrop-blur min-w-[300px]">
        <CardHeader className="flex w-full justify-center items-center">
          <CardTitle className="text-[36px] text-center">
            Join to the Program
          </CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col gap-3">
                <Input
                  label="Email"
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="Email"
                />
                <Input
                  action={
                    <div onClick={handleCurrentPassword}>
                      {seeCurrentPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
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
              <div className="flex flex-col space-y-1.5"></div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 justify-between">
          <Button className="w-full h-[45px]">Login</Button>
          <Label>
            If you do not have an account.{" "}
            <Label>
              <Link className="text-blue-500" href="/registration">
                Create account
              </Link>
            </Label>
          </Label>
        </CardFooter>
      </Card>
    </div>
  );
};
