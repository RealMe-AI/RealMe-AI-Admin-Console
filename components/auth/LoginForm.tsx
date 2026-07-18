"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GoogleLogin } from "@react-oauth/google";
import { useLogin, useGoogleLogin } from "@/hooks/auth";
import { Loader } from "../shared/Loader";
import { div } from "framer-motion/client";
import { GoogleIcon } from "../icons/GoogleIcon";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();
  const { onSuccess: onGoogleSuccess, isPending: googlePending } =
    useGoogleLogin();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login.mutate({ login: email, password });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          {/* <Link
            href="/forgot-password"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Forgot password?
          </Link> */}
        </div>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={login.isPending || googlePending}
      >
        {login.isPending ? <Loader className="text-white" /> : "Sign in"}
      </Button>

      <div className="relative">
        <Separator className="mb-6" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
          or
        </span>
      </div>

      {googlePending ? (
        <Button type="button" variant="outline" className="w-full" disabled>
          <Loader />
        </Button>
      ) : (
        <div className="relative">
          <div className="absolute inset-0 z-10 opacity-0">
            <GoogleLogin
              onSuccess={onGoogleSuccess}
              theme="outline"
              size="medium"
              shape="pill"
              width="100%"
            />
          </div>
          <Button className="w-full gap-2" variant="outline">
            <GoogleIcon /> Sign in with Google
          </Button>
        </div>
      )}

      {/* <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-foreground underline underline-offset-4 hover:text-primary">
          Sign up
        </Link>
      </p> */}
    </form>
  );
}
