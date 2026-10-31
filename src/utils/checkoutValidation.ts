import type { ShippingInfo } from '../types/order'

export type ShippingErrors = Partial<Record<keyof ShippingInfo, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^\+?\d{9,15}$/
const POSTAL_PATTERN = /^\d{4,10}$/

export function validateShipping(values: ShippingInfo): ShippingErrors {
  const errors: ShippingErrors = {}

  if (values.fullName.trim().length < 3) {
    errors.fullName = 'Full name must be at least 3 characters'
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address'
  }

  if (!PHONE_PATTERN.test(values.phone.replace(/\s/g, ''))) {
    errors.phone = 'Please enter a valid phone number'
  }

  if (values.address.trim().length < 5) {
    errors.address = 'Address must be at least 5 characters'
  }

  if (values.city.trim().length === 0) {
    errors.city = 'City is required'
  }

  if (!POSTAL_PATTERN.test(values.postalCode.trim())) {
    errors.postalCode = 'Postal code must be 4-10 digits'
  }

  if (values.country.length === 0) {
    errors.country = 'Please select a country'
  }

  return errors
}