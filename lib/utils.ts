import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}

export function formatDate(dateStr: string): string {
  return dateStr
}

export function truncate(str: string, length: number = 120): string {
  if (!str) return ''
  return str.length > length ? str.slice(0, length) + '...' : str
}