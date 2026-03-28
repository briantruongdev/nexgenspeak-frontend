const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
// Email regex: basic email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Phone regex: Vietnamese phone numbers (10-11 digits, may start with 0 or +84)
const PHONE_REGEX = /^(\+84|0)[1-9][0-9]{8,9}$/

const TIME_SLOTS = [
  { value: 1, label: '09:00- 09:30' },
  { value: 2, label: '09:30- 10:00' },
  { value: 3, label: '10:00- 10:30' },
  { value: 4, label: '10:30- 11:00' },
  { value: 5, label: '11:00- 11:30' },
  { value: 6, label: '11:30- 12:00' },
  { value: 7, label: '12:00- 12:30' },
  { value: 8, label: '12:30- 13:00' },
  { value: 9, label: '13:00- 13:30' },
  { value: 10, label: '13:30- 14:00' },
  { value: 11, label: '14:00- 14:30' },
  { value: 12, label: '14:30- 15:00' },
  { value: 13, label: '15:00- 15:30' },
  { value: 14, label: '15:30- 16:00' },
  { value: 15, label: '16:00- 16:30' },
  { value: 16, label: '16:30- 17:00' },
  { value: 17, label: '17:00- 17:30' },
  { value: 18, label: '17:30- 18:00' },
  { value: 19, label: '18:00- 18:30' },
  { value: 20, label: '18:30- 19:00' },
  { value: 21, label: '19:00- 19:30' },
  { value: 22, label: '19:30- 20:00' },
  { value: 23, label: '20:00- 20:30' },
  { value: 24, label: '20:30- 21:00' },
  { value: 25, label: '21:00- 21:30' },
  { value: 26, label: '21:30- 22:00' }
]
const TEACHER_DEFAULT_IMAGE = '/images/teacher-default.png'

export { PASSWORD_REGEX, EMAIL_REGEX, PHONE_REGEX, TIME_SLOTS, TEACHER_DEFAULT_IMAGE }
