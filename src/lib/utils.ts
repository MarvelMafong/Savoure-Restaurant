import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// Check if dinner service is active (NYC timezone)
export function isDinnerHours(): boolean {
  const now = new Date()
  const nycHour = parseInt(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      hour: 'numeric',
      hour12: false,
    }).format(now)
  )
  return nycHour >= 17 && nycHour < 23
}

// Get current NYC time string
export function getNYCTime(): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date())
}