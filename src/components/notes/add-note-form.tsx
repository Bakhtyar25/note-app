"use client"

import React, { useTransition } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/custom/date-picker"
type Props = {}

export default function AddNoteForm({ }: Props) {
    const [isPending, startTransition] = useTransition()

    type Priority = "urgent" | "high" | "low"

    const addNoteSchema = z.object({
        title: z.string().min(1, { message: "Title is required" }),
        content: z.string().min(1, { message: "Content is required" }),
        date: z.date(),
        priority: z.enum(["urgent", "high", "low"] as const),
    })

    type AddNoteFormValues = z.infer<typeof addNoteSchema>

    const form = useForm<AddNoteFormValues>({
        resolver: zodResolver(addNoteSchema),
        defaultValues: {
            title: "",
            content: "",
            date: new Date(),
            priority: "urgent",
        },
    })

    function onSubmit(values: AddNoteFormValues) {
        startTransition(() => {
            // TODO: replace with actual submit action
            // eslint-disable-next-line no-console
            console.log("submit add note", values)
        })
    }


    const inputClass = "focus-visible:ring-0 focus:outline-none focus-visible:ring-offset-0"


    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="p-1 flex flex-col gap-8 "
                >
                    <div className="flex w-full flex-col gap-4">
                        {/* Title */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-primary -mb-1.5 ps-3">Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={"title..."}
                                            className={cn("border border-border rounded-md p-2 shadow-none text-primary bg-white", inputClass)}
                                            {...field}
                                        />

                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Content */}
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-primary -mb-1.5 ps-3">Content</FormLabel>
                                    <FormControl>


                                        <Textarea
                                            placeholder={"content..."}
                                            className={cn("border border-border rounded-md p-2 resize-none shadow-none text-primary bg-white", inputClass)}
                                            {...field}
                                        />

                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Date */}
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <DatePicker
                                            date={field.value}
                                            setDate={(d: Date) => form.setValue("date", d, { shouldValidate: true })}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Priority */}
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-primary ps-3">Priority Level</FormLabel>
                                    <FormControl>
                                        <div className="flex justify-between gap-8">
                                            {(["urgent", "high", "low"] as Priority[]).map((option) => (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    aria-pressed={field.value === option}
                                                    onClick={() => field.onChange(option)}
                                                    className={cn(
                                                        "w-1/3 cursor-pointer py-1 text-center rounded-full overflow-hidden text-white relative",
                                                        option === "urgent" && "bg-urgent",
                                                        option === "high" && "bg-high",
                                                        option === "low" && "bg-low",
                                                        field.value === option && "ring-2 ring-primary ring-offset-1"
                                                    )}
                                                >
                                                    <span className='bg-black/30 size-full absolute top-0 left-0'></span>
                                                    <span className='relative z-10 capitalize'>{option}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>



                    <div className="flex justify-center items-center">
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="rounded-md text-lg bg-border text-secondary hover:text-secondary hover:bg-border px-10 cursor-pointer"
                        >
                            Add Note
                        </Button>
                    </div>

                </form>
            </Form>
        </div>
    )
}