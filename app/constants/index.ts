const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
// Email regex: basic email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Phone regex: Vietnamese phone numbers (10-11 digits, may start with 0 or +84)
const PHONE_REGEX = /^(\+84|0)[1-9][0-9]{8,9}$/

export { PASSWORD_REGEX, EMAIL_REGEX, PHONE_REGEX }
