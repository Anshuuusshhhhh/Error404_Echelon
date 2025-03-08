import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F5EDED] dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-[#6482AD]/20">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-[#6482AD] flex items-center justify-center">
                <span className="text-white font-bold">IF</span>
              </div>
              <span className="font-bold text-xl text-[#6482AD] dark:text-white">InsightFlow</span>
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-[#6482AD] dark:text-white">Welcome back</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@example.com" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/auth/forgot-password"
                className="text-xs text-[#6482AD] hover:text-[#7FA1C3] dark:text-[#7FA1C3]"
              >
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm">
              Remember me
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full bg-[#6482AD] hover:bg-[#7FA1C3]">Sign In</Button>
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-[#6482AD] hover:text-[#7FA1C3] dark:text-[#7FA1C3] font-medium">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

