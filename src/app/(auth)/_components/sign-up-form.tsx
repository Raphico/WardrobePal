"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useSignUp } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { catchClerkError } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

const formSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username is too short",
    })
    .max(32, {
      message: "Username is too long",
    }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
})

type Input = z.infer<typeof formSchema>

export function SignUpForm() {
  const { isLoaded, signUp } = useSignUp()
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()

  const form = useForm<Input>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  })

  const onSubmit = async (values: Input) => {
    if (!isLoaded && !signUp) return null

    setIsLoading(true)

    try {
      await signUp.create({
        emailAddress: values.email,
        username: values.username,
      })

      await signUp.prepareEmailAddressVerification()

      router.push("/sign-up/verify-email")
    } catch (err) {
      catchClerkError(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="example" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading}>
          {isLoading && (
            <Icons.spinner
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Sign Up
        </Button>
      </form>
    </Form>
  )
}
