import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useNavigate } from "react-router-dom"

import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
// Note: Some shadcn/ui setups require these for react-hook-form integration
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import api from "../Service/api"
import toast from "react-hot-toast"

// 1. Define the validation schema with Zod
const formSchema = z.object({
  username: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

export default function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const nav = useNavigate()

  // 2. Set up the form hook with the Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  // 3. Define the submit handler
   function onSubmit(values: z.infer<typeof formSchema>) {
    const req = {
      username:values.username,
      email:values.email,
      password:values.password,
      role:"user"

    }
  
    try {
      const response =  api.post("/auth/public/signup",req)
      console.log(response);
      toast.promise(response,
        {
          loading:"Creating your account...",
          success:"Signup successful! Redirecting...",
          error:"error creating your account"
        }
      ).then(()=>nav("/notes"))
      
      
      
    } catch (error) {
      console.log(error);
      
      
    }
   
    console.log("Form submitted with values:", values)

  }

  return (
    <div className={cn("flex flex-col gap-6 mt-12", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          {/* 4. Use the Form component from shadcn/ui */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Username Field */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="eg: Afnan Kazi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-3 pt-2">
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
                <Button variant="outline" className="w-full">
                  <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor" />
                  </svg>
                  Sign up with Google
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            Have an account?{" "}
            <span onClick={() => nav("/login")} className="underline underline-offset-4 cursor-pointer">
              Login
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}