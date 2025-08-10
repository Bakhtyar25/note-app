"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import {

  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react";

import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  className?: string;
};

export default function SignupForm({ className }: Props) {

  type Input = z.infer<typeof registerSchema>;
  const registerSchema = z
    .object({
      email: z
        .string()
        .email({ message: "Invalid email address" }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(20, { message: "Password must be at most 20 characters" })
        .refine((password) => /[!@#$%^&*]/.test(password), {
          message: "Password must contain at least one special character",
        }),
      password_confirmation: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(20, { message: "Password must be at most 20 characters" })
        .refine((password) => /[!@#$%^&*]/.test(password), {
          message: "Password must contain at least one special character",
        }),
    })
    .refine(
      (values) => {
        return values.password === values.password_confirmation;
      },
      {
        message: "Password must match",
        path: ["password_confirmation"],
      }
    );


  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isPasswordVisibleComf, setIsPasswordVisibleComf] =
    useState<boolean>(false);
  const form = useForm<Input>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const router = useRouter();
  const [isPending, setStartTransaction] = useTransition();



  function onSubmit(data: Input) {

    setStartTransaction(async () => {

    });
  }

  const [length, setLength] = useState(false);
  const [containNum, setContainNum] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [containSpecial, setContainSpecial] = useState(false);


  useEffect(() => {
    const password =
      form.watch("password") || form.watch("password_confirmation");
    setContainNum(/\d/.test(password));
    setLength(password.length >= 8 && password.length <= 20);
    setUpperCase(/[A-Z]/.test(password));
    setContainSpecial(/[!@#$%^&*]/.test(password));
  }, [form.watch("password"), form.watch("password_confirmation")]);

  const inputClass = "bg-transparent border-none md:text-lg text-primary placeholder:text-border focus-visible:ring-0 focus:outline-none focus-visible:ring-offset-0"

  return (
    <div className={cn("w-1/4", className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-1 flex flex-col gap-4 "
        >
          <div className="flex w-full flex-col gap-8">
            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <label className="font-bold text-primary -mb-2.5 ps-1.5">Email</label>
                  <FormControl>
                    <div className="flex items-center  authInput">
                      <Input
                        placeholder={"Enter your email"}
                        className={cn(inputClass, "")}
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <label className="font-bold text-primary -mb-2.5 ps-1.5">Password</label>
                  <FormControl>
                    <div className="flex items-center  authInput">
                      <Input
                        placeholder={"Enter your password"}
                        className={cn(inputClass, "")}
                        {...field}
                        type={isPasswordVisible ? "text" : "password"}
                      />
                      {isPasswordVisible ? (
                        <EyeOff
                          onClick={() => {
                            setIsPasswordVisible(false);
                          }}
                          className="cursor-pointer text-quaternary/60"
                        />
                      ) : (
                        <Eye
                          onClick={() => {
                            setIsPasswordVisible(true);
                          }}
                          className="cursor-pointer text-quaternary/60"
                        />
                      )}
                    </div>

                  </FormControl>
                      <div className="flex flex-col items-end text-xs font-semibold -mt-2">
                        <p>Minimum of 8 digits.</p>
                        <p>A minimum of 1 special character</p>
                      </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <label className="font-bold text-primary -mb-2.5 ps-1.5">Password Confirmation</label>
                  <FormControl>
                    <div className="flex items-center  authInput">
                      <Input
                        placeholder={"Enter your password"}
                        className={cn(inputClass, "")}
                        {...field}
                        type={isPasswordVisibleComf ? "text" : "password"}
                      />
                      {isPasswordVisibleComf ? (
                        <EyeOff
                          onClick={() => {
                            setIsPasswordVisibleComf(false);
                          }}
                          className="cursor-pointer text-quaternary/60"
                        />
                      ) : (
                        <Eye
                          onClick={() => {
                            setIsPasswordVisibleComf(true);
                          }}
                          className="cursor-pointer text-quaternary/60"
                        />
                      )}
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />


          </div>



          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isPending}
              className="rounded-md text-lg ms-auto bg-gradient-to-br from-urgent to-low px-10 cursor-pointer"
            >
              Signup
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
