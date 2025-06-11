import { guestLogin } from "@/services/authService";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const sliderImages = [
  "/slider/slide1.jpeg",
  "/slider/slide2.jpeg",
  "/slider/slide3.jpeg",
];
export async function ensureGuestToken() {
  const hasToken = !!document.cookie.match(/token=/);
  if (hasToken) return;

  const guestIdMatch = document.cookie.match(/guestId=([^;]+)/);
  if (!guestIdMatch) return;

  const guestId = guestIdMatch[1];

  const res = await guestLogin(guestId);

  const token = await res.data.access_token;
  document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;
}

