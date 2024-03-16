import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { env } from "../env.js"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}
