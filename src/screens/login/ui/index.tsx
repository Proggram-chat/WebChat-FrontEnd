'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { ZodType } from 'zod';
import { z } from 'zod';

import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useSessionStore } from '@/shared/store/session';

type FormData = {
  // email?: string;
  // password?: string;
  user_id?: string;
};

const schema: ZodType<FormData> = z.object({
  // email: z.string().min(2, {
  //   message: 'Email must be at least 2 characters.',
  // }),
  user_id: z.string().min(1),
  // password: z.string().min(5, {
  //   message: 'Password must be at least 5 characters.',
  // }),
});

export const LoginPage = () => {
  const { setUser } = useSessionStore();
  const [seeCurrentPassword, setSeeCurrentPassword] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    if (data.user_id) {
      setUser(data.user_id);
    }
  };

  const handleCurrentPassword = () => {
    setSeeCurrentPassword(!seeCurrentPassword);
  };

  return (
    <div className="flex w-full items-center h-screen justify-center relative overflow-hidden">
      <Card className="max-w-[400px] border-0 shadow-none w-full bg-white/10 backdrop-blur min-w-[300px]">
        <CardHeader className="flex w-full justify-center items-center">
          <CardTitle className="text-[36px] text-center">Join to the Program</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col gap-3">
                <p>First User: f1d5c833-8e6b-4e8a-8e9a-918b5e3d5b9b</p>
                <p>Second User: e0afeb8b-307e-4a4d-a8f4-9c9f5e34b2b3</p>
                <Input
                  label="userId"
                  {...register('user_id')}
                  id="user_id"
                  error={errors?.user_id?.message}
                  type="text"
                  placeholder="userId"
                />
                {/* <Input*/}
                {/*  label="Email"*/}
                {/*  {...register('email')}*/}
                {/*  id="email"*/}
                {/*  error={errors?.email?.message}*/}
                {/*  type="email"*/}
                {/*  placeholder="Email"*/}
                {/*/ >*/}
                {/* <Input*/}
                {/*  action={*/}
                {/*    <div onClick={handleCurrentPassword}>*/}
                {/*      {seeCurrentPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}*/}
                {/*    </div>*/}
                {/*  }*/}
                {/*  label="Password"*/}
                {/*  autoComplete="password"*/}
                {/*  id="password"*/}
                {/*  type={seeCurrentPassword ? 'password' : 'text'}*/}
                {/*  error={errors?.password?.message}*/}
                {/*  {...register('password')}*/}
                {/*  placeholder="Password"*/}
                {/*/ >*/}
              </div>
              <div className="flex flex-col space-y-1.5" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 justify-between">
            <Button className="w-full h-[45px]" type="submit">
              Login
            </Button>
            <Label>
              If you do not have an account.{' '}
              <Label>
                <Link className="text-blue-500" href="/registration">
                  Create account
                </Link>
              </Label>
            </Label>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
