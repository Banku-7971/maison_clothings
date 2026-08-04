// ═══════════════════════════════════════════════════════════════
// MAISON — INDIA EDITION FORMATTERS
// ═══════════════════════════════════════════════════════════════

// PRICE FORMATTERS (INR)
export const formatPrice = (price, currency = 'INR', locale = 'en-IN') => {
  if (price === null || price === undefined) return '—'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export const formatPriceMinimal = (price) => {
  if (price === null || price === undefined) return '—'
  return new Intl.NumberFormat('en-IN').format(price)
}

export const formatPriceCode = (price) => {
  if (price === null || price === undefined) return '—'
  return `₹ ${new Intl.NumberFormat('en-IN').format(price)}`
}

export const formatDiscount = (originalPrice, currentPrice) => {
  if (!originalPrice || !currentPrice) return null
  const discount = ((originalPrice - currentPrice) / originalPrice) * 100
  return `-${Math.round(discount)}%`
}

export const formatPriceIndian = (price) => {
  if (price === null || price === undefined) return '—'
  return `₹${new Intl.NumberFormat('en-IN').format(price)}`
}

// NUMBER FORMATTERS
export const formatNumber = (num, locale = 'en-IN') => {
  if (num === null || num === undefined) return '0'
  return new Intl.NumberFormat('en-IN').format(num)
}

export const formatCompactNumber = (num) => {
  if (num === null || num === undefined) return '0'
  if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`
  if (num >= 100000) return `${(num / 100000).toFixed(1)}L`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

export const formatPercentage = (decimal, decimals = 0) => {
  if (decimal === null || decimal === undefined) return '0%'
  return `${(decimal * 100).toFixed(decimals)}%`
}

export const padNumber = (num, length = 2) => {
  return String(num).padStart(length, '0')
}

// DATE FORMATTERS
export const formatDate = (date, locale = 'en-IN') => {
  if (!date) return ''
  const d = new Date(date)
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

export const formatDateShort = (date, locale = 'en-IN') => {
  if (!date) return ''
  const d = new Date(date)
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d)
}

export const formatDateTime = (date, locale = 'en-IN') => {
  if (!date) return ''
  const d = new Date(date)
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(d).replace(',', ' at')
}

export const formatRelativeTime = (date) => {
  if (!date) return ''
  const now = Date.now()
  const then = new Date(date).getTime()
  const diff = now - then
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)
  
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
  if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
  if (days < 7) return `${days} ${days === 1 ? 'day' : 'days'} ago`
  if (weeks < 4) return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`
  if (months < 12) return `${months} ${months === 1 ? 'month' : 'months'} ago`
  return `${years} ${years === 1 ? 'year' : 'years'} ago`
}

export const formatSeason = (season, year) => {
  const seasonMap = {
    spring: 'SS',
    summer: 'SS',
    fall: 'FW',
    autumn: 'FW',
    winter: 'FW',
  }
  const code = seasonMap[season?.toLowerCase()] || season
  return `${code} ${year}`
}

export const getCurrentSeason = () => {
  const month = new Date().getMonth() + 1
  if (month >= 3 && month <= 5) return 'Spring'
  if (month >= 6 && month <= 8) return 'Summer'
  if (month >= 9 && month <= 11) return 'Fall'
  return 'Winter'
}

// TEXT FORMATTERS
export const capitalize = (text) => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export const toTitleCase = (text) => {
  if (!text) return ''
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const toLabelCase = (text) => {
  if (!text) return ''
  return text.toUpperCase()
}

export const slugify = (text) => {
  if (!text) return ''
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '')
}

export const truncate = (text, length = 100, suffix = '...') => {
  if (!text) return ''
  if (text.length <= length) return text
  return text.substring(0, length).trim() + suffix
}

export const truncateWords = (text, wordCount = 20, suffix = '...') => {
  if (!text) return ''
  const words = text.split(' ')
  if (words.length <= wordCount) return text
  return words.slice(0, wordCount).join(' ') + suffix
}

export const stripHtml = (html) => {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '')
}

export const getInitials = (name) => {
  if (!name) return ''
  return name.split(' ').map(w => w.charAt(0).toUpperCase()).slice(0, 2).join('')
}

// PRODUCT FORMATTERS
export const formatProductId = (id) => {
  if (!id) return ''
  return id.toUpperCase()
}

export const formatProductName = (name, subtitle) => {
  if (!name) return ''
  if (!subtitle) return name
  return `${name} — ${subtitle}`
}

export const formatStockStatus = (stock) => {
  if (stock === 0) return 'Sold Out'
  if (stock <= 3) return `Only ${stock} left`
  if (stock <= 10) return 'Low Stock'
  return 'In Stock'
}

export const formatRating = (rating) => {
  if (rating === null || rating === undefined) return '—'
  return rating.toFixed(1)
}

export const formatReviewCount = (count) => {
  if (!count) return 'No reviews'
  return `${formatNumber(count)} ${count === 1 ? 'review' : 'reviews'}`
}

// FILE SIZE
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// INDIAN PHONE FORMATTERS
export const formatPhone = (phone) => {
  if (!phone) return ''
  const cleaned = ('' + phone).replace(/\D/g, '')
  // Format: +91 98765 43210
  const match = cleaned.match(/^(\d{5})(\d{5})$/)
  if (match) return `${match[1]} ${match[2]}`
  return phone
}

export const formatPhoneInternational = (phone, countryCode = '+91') => {
  if (!phone) return ''
  return `${countryCode} ${formatPhone(phone)}`
}

// VALIDATION
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const isValidURL = (url) => {
  try { new URL(url); return true } catch { return false }
}

export const isValidIndianPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '')
  return /^[6-9]\d{9}$/.test(cleaned)
}

export const isValidIndianPincode = (pincode) => {
  return /^[1-9][0-9]{5}$/.test(pincode)
}

export const maskEmail = (email) => {
  if (!email || !email.includes('@')) return email
  const [local, domain] = email.split('@')
  const maskedLocal = local.charAt(0) + '*'.repeat(Math.max(local.length - 1, 2))
  return `${maskedLocal}@${domain}`
}

// ADDRESS FORMATTERS
export const formatAddressLine = (address) => {
  if (!address) return ''
  const parts = [
    address.street, address.apartment, address.city,
    address.state, address.pincode, address.country,
  ].filter(Boolean)
  return parts.join(', ')
}

export const formatAddressBlock = (address) => {
  if (!address) return []
  return [
    address.name,
    address.street,
    address.apartment,
    `${address.city}, ${address.state} ${address.pincode}`,
    address.country || 'India',
  ].filter(Boolean)
}

// ORDER FORMATTERS
export const generateOrderNumber = () => {
  const year = new Date().getFullYear()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `MSN-${year}-${random}`
}

export const formatOrderStatus = (status) => {
  const statusMap = {
    pending: 'Awaiting Confirmation',
    confirmed: 'Order Confirmed',
    processing: 'In Atelier',
    shipped: 'On Its Way',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    returned: 'Returned',
  }
  return statusMap[status] || status
}

// COLOR UTILITIES
export const isColorDark = (hexColor) => {
  const hex = hexColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness < 128
}

export const getContrastColor = (hexColor) => {
  return isColorDark(hexColor) ? '#F5EBDD' : '#2A1F1A'
}

// MISC
export const generateId = (prefix = '') => {
  const random = Math.random().toString(36).substring(2, 9)
  return prefix ? `${prefix}-${random}` : random
}

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const debounce = (func, wait = 300) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => { clearTimeout(timeout); func(...args) }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const throttle = (func, limit = 300) => {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export const clamp = (num, min, max) => Math.min(Math.max(num, min), max)
export const mapRange = (v, im, iM, om, oM) => ((v-im)*(oM-om))/(iM-im)+om
export const lerp = (start, end, t) => start + (end - start) * t

export default {
  formatPrice, formatPriceMinimal, formatPriceCode, formatDiscount, formatPriceIndian,
  formatNumber, formatCompactNumber, formatPercentage, padNumber,
  formatDate, formatDateShort, formatDateTime, formatRelativeTime, formatSeason, getCurrentSeason,
  capitalize, toTitleCase, toLabelCase, slugify, truncate, truncateWords, stripHtml, getInitials,
  formatProductId, formatProductName, formatStockStatus, formatRating, formatReviewCount,
  formatFileSize, formatPhone, formatPhoneInternational,
  isValidEmail, isValidURL, isValidIndianPhone, isValidIndianPincode, maskEmail,
  formatAddressLine, formatAddressBlock, generateOrderNumber, formatOrderStatus,
  isColorDark, getContrastColor, generateId, sleep, debounce, throttle, clamp, mapRange, lerp,
}