/// <reference types="vite/client" />

declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.svg';

interface Window {
  gtag: (...args: any[]) => void;
  dataLayer: any[];
}
