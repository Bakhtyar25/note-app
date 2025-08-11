"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { login } from "@/actions/auth";
import { toast } from "sonner";

type Props = {
  className?: string;
};

export default function LoginForm({ className }: Props) {
  type Input = z.infer<typeof registerSchema>;
  const registerSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(20, { message: "Password must be at most 20 characters" })
      .refine((password) => /[!@#$%^&*]/.test(password), {
        message: "Password must contain at least one special character",
      }),
  });

  const form = useForm<Input>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();


  function onSubmit(data: Input) {

    startTransition(async () => {
      try {
        const result = await login({ email: data.email, password: data.password });
        if (result?.error) {
          toast.error(result.error);
        }
      } catch (redirectError) {
        console.log("Redirect successful:", redirectError);
      }
    });
  }

  const inputClass = "bg-transparent border-none md:text-lg text-primary placeholder:text-border focus-visible:ring-0 focus:outline-none focus-visible:ring-offset-0"

  return (
    <div className={cn("w-full lg:w-1/4 p-10", className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-1 flex flex-col gap-8 "
        >
          <div className="flex w-full flex-col gap-4">
            {/* email input */}
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
                        className={cn(inputClass, "!bg-transparent")}
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* password input */}
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
                        className={cn(inputClass, "!bg-transparent")}
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
              Login
            </Button>
          </div>
          
        </form>
      </Form>
    </div>
  );
}
