import { useNavigate } from "react-router-dom"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export default function ContactForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const nav = useNavigate();
  return (
    <div className={cn("flex flex-col gap-6 mt-14", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>CONTACT US!</CardTitle>
         <CardDescription >We'd love to hear from you! If you have any questions or feedback, feel free to reach out to us.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Name</Label>
                <Input
                  id="name"
                  type="string"
                  required
                />
              </div>
              
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="email">Email</Label>
                </div>
                <Input id="email" type="string" required />
              </div>

                
              <div className="grid gap-3 col-end-2">
                <div className="flex items-center">
                  <Label htmlFor="email">Message</Label>
                </div>
                 <Textarea id="message" placeholder="Type your message here." className="min-h-[100px]" />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
