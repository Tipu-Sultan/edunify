"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Login Successful",
        description: "Welcome to Edunify!",
        variant: "success",
      });
      router.push(getRedirectPath(result?.user?.userType));
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
    setLoading(false);
  };

  const getRedirectPath = (userType) => {
    switch (userType) {
      case "SUPERADMIN":
        return "/admin";
      case "SCHOOLADMIN":
        return "/admin";
      case "NORMAL":
      default:
        return "/admin";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900">
      <Card className="w-full max-w-md shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-3xl text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
            Login to Edunify
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Credentials Form */}
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                placeholder="Enter your email"
                className="dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                placeholder="Enter your password"
                className="dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
            {error && (
              <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center">
            <hr className="w-full border-gray-300 dark:border-gray-600" />
            <span className="px-2 text-muted-foreground">or</span>
            <hr className="w-full border-gray-300 dark:border-gray-600" />
          </div>

          {/* Google Login */}
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 dark:border-gray-600 dark:text-gray-200"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.02.68-2.31 1.08-3.71 1.08-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Login with Google
          </Button>

          <div className="mt-4 text-sm text-center text-muted-foreground">
            <p>Demo Accounts:</p>
            <p>Super Admin: admin@edunify.com / admin123</p>
            <p>School Admin: school@dps.com / school123</p>
            <p>Parent: parent@gmail.com / parent123</p>
          </div>
        </CardContent>
      </Card>
      
    </div>
  );
}
