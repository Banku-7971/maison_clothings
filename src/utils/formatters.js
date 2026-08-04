// ═══════════════════════════════════════════════════════════════
// MAISON — FORMATTERS & DISPLAY UTILITIES
// ═══════════════════════════════════════════════════════════════
// Consistent formatting across the entire app.
// Every number, date, and text goes through here for polish.
// ═══════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════
// PRICE FORMATTERS
// ═══════════════════════════════════════════════════════════════

/**
 * Format price with currency symbol
 * @param {number} price - The price to format
 * @param {string} currency - Currency code (USD, EUR, GBP, etc.)
 * @param {string} locale - Locale for formatting (en-US, en-GB, etc.)
 * @returns {string} Formatted price string
 * 
 * Example: formatPrice(3450, 'USD') → "$3,450"
 * Example: formatPrice(3450.99, 'EUR') → "€3,450.99"
 */
export const formatPrice = (price, currency = 'USD', locale = 'en-US') => {
  if (price === null || price === undefined) return '—'
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: price % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(price)
}

/**
 * Format price without currency symbol (luxury minimal)
 * Example: formatPriceMinimal(3450) → "3,450"
 */
export const formatPriceMinimal = (price) => {
  if (price === null || price === undefined) return '—'
  return new Intl.NumberFormat('en-US').format(price)
}

/**
 * Format price with currency code instead of symbol
 * Example: formatPriceCode(3450, 'USD') → "USD 3,450"
 */
export const formatPriceCode = (price, currency = 'USD') => {
  if (price === null || price === undefined) return '—'
  return `${currency} ${new Intl.NumberFormat('en-US').format(price)}`
}

/**
 * Calculate and format discount percentage
 * Example: formatDiscount(1000, 750) → "-25%"
 */
export const formatDiscount = (originalPrice, currentPrice) => {
  if (!originalPrice || !currentPrice) return null
  const discount = ((originalPrice - currentPrice) / originalPrice) * 100
  return `-${Math.round(discount)}%`
}

/**
 * Format price with thousand separators using thin spaces (Parisian style)
 * Example: formatPriceParisian(3450) → "3 450"
 */
export const formatPriceParisian = (price) => {
  if (price === null || price === undefined) return '—'
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}


// ═══════════════════════════════════════════════════════════════
// NUMBER FORMATTERS
// ═══════════════════════════════════════════════════════════════

/**
 * Format large numbers with commas
 * Example: formatNumber(1234567) → "1,234,567"
 */
export const formatNumber = (num, locale = 'en-US') => {
  if (num === null || num === undefined) return '0'
  return new Intl.NumberFormat(locale).format(num)
}

/**
 * Format numbers with abbreviations
 * Example: formatCompactNumber(1500) → "1.5K"
 * Example: formatCompactNumber(2500000) → "2.5M"
 */
export const formatCompactNumber = (num) => {
  if (num === null || num === undefined) return '0'
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num)
}

/**
 * Format decimal to percentage
 * Example: formatPercentage(0.25) → "25%"
 */
export const formatPercentage = (decimal, decimals = 0) => {
  if (decimal === null || decimal === undefined) return '0%'
  return `${(decimal * 100).toFixed(decimals)}%`
}

/**
 * Pad number with leading zeros
 * Example: padNumber(5, 2) → "05"
 * Example: padNumber(1, 3) → "001"
 */
export const padNumber = (num, length = 2) => {
  return String(num).padStart(length, '0')
}


// ═══════════════════════════════════════════════════════════════
// DATE FORMATTERS
// ═══════════════════════════════════════════════════════════════

/**
 * Format date to readable string
 * Example: formatDate(new Date()) → "January 15, 2025"
 */
export const formatDate = (date, locale = 'en-US') => {
  if (!date) return ''
  const d = new Date(date)
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

/**
 * Format date in short format
 * Example: formatDateShort(new Date()) → "Jan 15, 2025"
 */
export const formatDateShort = (date, locale = 'en-US') => {
  if (!date) return ''
  const d = new Date(date)
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d)
}

/**
 * Format date with time
 * Example: formatDateTime(new Date()) → "Jan 15, 2025 at 2:30 PM"
 */
export const formatDateTime = (date, locale = 'en-US') => {
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

/**
 * Format relative time
 * Example: formatRelativeTime(new Date(Date.now() - 3600000)) → "1 hour ago"
 */
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

/**
 * Format season and year
 * Example: formatSeason('spring', 2025) → "SS 2025"
 */
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

/**
 * Get current season
 */
export const getCurrentSeason = () => {
  const month = new Date().getMonth() + 1
  if (month >= 3 && month <= 5) return 'Spring'
  if (month >= 6 && month <= 8) return 'Summer'
  if (month >= 9 && month <= 11) return 'Fall'
  return 'Winter'
}


// ═══════════════════════════════════════════════════════════════
// TEXT FORMATTERS
// ═══════════════════════════════════════════════════════════════

/**
 * Capitalize first letter
 * Example: capitalize('maison') → "Maison"
 */
export const capitalize = (text) => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

/**
 * Title case
 * Example: toTitleCase('signature wool coat') → "Signature Wool Coat"
 */
export const toTitleCase = (text) => {
  if (!text) return ''
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Uppercase with letter spacing (for labels)
 * Example: toLabelCase('shop now') → "SHOP NOW"
 */
export const toLabelCase = (text) => {
  if (!text) return ''
  return text.toUpperCase()
}

/**
 * Slugify text for URLs
 * Example: slugify('Signature Wool Coat') → "signature-wool-coat"
 */
export const slugify = (text) => {
  if (!text) return ''
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

/**
 * Truncate text with ellipsis
 * Example: truncate('Long text here', 10) → "Long text..."
 */
export const truncate = (text, length = 100, suffix = '...') => {
  if (!text) return ''
  if (text.length <= length) return text
  return text.substring(0, length).trim() + suffix
}

/**
 * Truncate by words
 * Example: truncateWords('This is a long sentence', 3) → "This is a..."
 */
export const truncateWords = (text, wordCount = 20, suffix = '...') => {
  if (!text) return ''
  const words = text.split(' ')
  if (words.length <= wordCount) return text
  return words.slice(0, wordCount).join(' ') + suffix
}

/**
 * Strip HTML tags
 * Example: stripHtml('<p>Hello</p>') → "Hello"
 */
export const stripHtml = (html) => {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '')
}

/**
 * Get initials from name
 * Example: getInitials('John Doe') → "JD"
 */
export const getInitials = (name) => {
  if (!name) return ''
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}


// ═══════════════════════════════════════════════════════════════
// PRODUCT FORMATTERS
// ═══════════════════════════════════════════════════════════════

/**
 * Format product ID with hyphen
 * Example: formatProductId('MSN001') → "MSN-001"
 */
export const formatProductId = (id) => {
  if (!id) return ''
  return id.toUpperCase()
}

/**
 * Format product name with subtitle
 * Example: formatProductName('Signature Coat', 'Noir') → "Signature Coat — Noir"
 */
export const formatProductName = (name, subtitle) => {
  if (!name) return ''
  if (!subtitle) return name
  return `${name} — ${subtitle}`
}

/**
 * Format stock status
 * Example: formatStockStatus(5) → "Only 5 left"
 * Example: formatStockStatus(0) → "Sold Out"
 */
export const formatStockStatus = (stock) => {
  if (stock === 0) return 'Sold Out'
  if (stock <= 3) return `Only ${stock} left`
  if (stock <= 10) return 'Low Stock'
  return 'In Stock'
}

/**
 * Format rating with stars
 * Example: formatRating(4.5) → "4.5"
 */
export const formatRating = (rating) => {
  if (rating === null || rating === undefined) return '—'
  return rating.toFixed(1)
}

/**
 * Format review count
 * Example: formatReviewCount(142) → "142 reviews"
 * Example: formatReviewCount(1) → "1 review"
 */
export const formatReviewCount = (count) => {
  if (!count) return 'No reviews'
  return `${formatNumber(count)} ${count === 1 ? 'review' : 'reviews'}`
}


// ═══════════════════════════════════════════════════════════════
// FILE SIZE FORMATTER
// ═══════════════════════════════════════════════════════════════

/**
 * Format bytes to human readable
 * Example: formatFileSize(1024) → "1 KB"
 * Example: formatFileSize(1048576) → "1 MB"
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}


// ═══════════════════════════════════════════════════════════════
// PHONE NUMBER FORMATTER
// ═══════════════════════════════════════════════════════════════

/**
 * Format US phone number
 * Example: formatPhone('1234567890') → "(123) 456-7890"
 */
export const formatPhone = (phone) => {
  if (!phone) return ''
  const cleaned = ('' + phone).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return phone
}

/**
 * Format international phone number
 */
export const formatPhoneInternational = (phone, countryCode = '+1') => {
  if (!phone) return ''
  return `${countryCode} ${formatPhone(phone)}`
}


// ═══════════════════════════════════════════════════════════════
// EMAIL & URL VALIDATION
// ═══════════════════════════════════════════════════════════════

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * Validate URL format
 */
export const isValidURL = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Mask email for privacy
 * Example: maskEmail('john@example.com') → "j***@example.com"
 */
export const maskEmail = (email) => {
  if (!email || !email.includes('@')) return email
  const [local, domain] = email.split('@')
  const maskedLocal = local.charAt(0) + '*'.repeat(Math.max(local.length - 1, 2))
  return `${maskedLocal}@${domain}`
}


// ═══════════════════════════════════════════════════════════════
// ADDRESS FORMATTERS
// ═══════════════════════════════════════════════════════════════

/**
 * Format address to single line
 */
export const formatAddressLine = (address) => {
  if (!address) return ''
  const parts = [
    address.street,
    address.apartment,
    address.city,
    address.state,
    address.postalCode,
    address.country,
  ].filter(Boolean)
  return parts.join(', ')
}

/**
 * Format address to multiple lines
 */
export const formatAddressBlock = (address) => {
  if (!address) return []
  return [
    address.name,
    address.street,
    address.apartment,
    `${address.city}, ${address.state} ${address.postalCode}`,
    address.country,
  ].filter(Boolean)
}


// ═══════════════════════════════════════════════════════════════
// ORDER FORMATTERS
// ═══════════════════════════════════════════════════════════════

/**
 * Generate order number
 * Example: generateOrderNumber() → "MSN-2025-A1B2C3"
 */
export const generateOrderNumber = () => {
  const year = new Date().getFullYear()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `MSN-${year}-${random}`
}

/**
 * Format order status
 */
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


// ═══════════════════════════════════════════════════════════════
// COLOR UTILITIES
// ═══════════════════════════════════════════════════════════════

/**
 * Check if color is dark (for contrast)
 */
export const isColorDark = (hexColor) => {
  const hex = hexColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness < 128
}

/**
 * Get contrasting text color
 */
export const getContrastColor = (hexColor) => {
  return isColorDark(hexColor) ? '#F5F0EB' : '#0A0A0A'
}


// ═══════════════════════════════════════════════════════════════
// MISC UTILITIES
// ═══════════════════════════════════════════════════════════════

/**
 * Generate random ID
 */
export const generateId = (prefix = '') => {
  const random = Math.random().toString(36).substring(2, 9)
  return prefix ? `${prefix}-${random}` : random
}

/**
 * Sleep utility
 */
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Debounce function
 */
export const debounce = (func, wait = 300) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function
 */
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

/**
 * Clamp number between min and max
 */
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

/**
 * Map value from one range to another
 */
export const mapRange = (value, inMin, inMax, outMin, outMax) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

/**
 * Linear interpolation
 */
export const lerp = (start, end, t) => start + (end - start) * t


// ═══════════════════════════════════════════════════════════════
// EXPORT ALL AS DEFAULT
// ═══════════════════════════════════════════════════════════════
export default {
  // Prices
  formatPrice,
  formatPriceMinimal,
  formatPriceCode,
  formatDiscount,
  formatPriceParisian,
  
  // Numbers
  formatNumber,
  formatCompactNumber,
  formatPercentage,
  padNumber,
  
  // Dates
  formatDate,
  formatDateShort,
  formatDateTime,
  formatRelativeTime,
  formatSeason,
  getCurrentSeason,
  
  // Text
  capitalize,
  toTitleCase,
  toLabelCase,
  slugify,
  truncate,
  truncateWords,
  stripHtml,
  getInitials,
  
  // Products
  formatProductId,
  formatProductName,
  formatStockStatus,
  formatRating,
  formatReviewCount,
  
  // Misc
  formatFileSize,
  formatPhone,
  formatPhoneInternational,
  isValidEmail,
  isValidURL,
  maskEmail,
  formatAddressLine,
  formatAddressBlock,
  generateOrderNumber,
  formatOrderStatus,
  isColorDark,
  getContrastColor,
  generateId,
  sleep,
  debounce,
  throttle,
  clamp,
  mapRange,
  lerp,
}