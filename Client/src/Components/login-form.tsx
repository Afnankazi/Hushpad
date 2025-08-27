import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // Assuming you use react-toastify

import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import api from "../Service/api";
import { MyContext } from "../Store/Contextapi";

// 1. Define the validation schema for the login form
const formSchema = z.object({
  username: z.string().min(3, { message: "Username is required." }),
  password: z.string().min(3, { message: "Password is required." }),
});

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const nav = useNavigate();

  // 2. Initialize the form hook
 const{setToken , setCurrentUser} = MyContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });


  function onSubmit(values: z.infer<typeof formSchema>) {
    const loginPromise = api.post("auth/public/signin", values); 

    toast.promise(
        loginPromise,
        {
          loading: 'Logging in...',
          success: 'Login successful! Welcome back.',
          error: 'Invalid username or password. Please try again.'
        }
    ).then((response) => {
      // Navigate on success
      console.log(response.data);
      const {jwtToken , ...userData} = response.data
      localStorage.setItem("JWT_TOKEN",jwtToken)
      localStorage.setItem("USER",JSON.stringify(userData))
      setToken(jwtToken);
      nav("/notes")
    }).catch(err => console.error(err)); // Catch errors to prevent unhandled promise rejections
  }

  return (
    <div className={cn("flex flex-col gap-6 mt-12", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          {/* 4. Use the Form component and connect the submit handler */}
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

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                        Forgot your password?
                      </a>
                    </div>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-3 pt-2">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor" />
                  </svg>
                  Login with Google
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <span onClick={() => nav("/signup")} className="underline underline-offset-4 cursor-pointer">
              Sign up
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}