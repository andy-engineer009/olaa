'use client'
import Login from "@/components/Login";
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function LoginPage() {
  return <div>
    <GoogleOAuthProvider clientId='453099864669-cbn0n1t6bg76odspkr1mrqnvd930aej9.apps.googleusercontent.com'>
      <Login />
    </GoogleOAuthProvider>
  </div>;
}

