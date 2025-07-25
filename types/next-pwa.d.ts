declare module 'next-pwa' {
    import type { NextConfig } from 'next';
  
    interface PWAOptions {
      dest: string;
      disable?: boolean;
      register?: boolean;
      skipWaiting?: boolean;
      buildExcludes?: string[];
      [key: string]: any;
    }
  
    export default function withPWA(options: PWAOptions): (nextConfig: NextConfig) => NextConfig;
  }
  