export enum Role {
  USER = 'user',
  ADMIN = 'admin'
}

export enum UserType {
  BUYER = 'buyer',
  SELLER = 'seller'
}

export enum VerificationTokenType {
  VERIFY_EMAIL = 'verify-email',
  RESET_PASSWORD = 'reset-password'
}

export enum VerificationTokenRelationType {
  USER = 'user'
}

export enum Category {
  FLEX = 'flex',
  BANNER = 'banner',
  DIGITAL_MARKETING = 'digital-marketing',
  BROCHURE = 'brochure',
  FLYER = 'flyer',
  POSTER = 'poster',
  BILLBOARD = 'billboard'
}

export enum Unit {
  INCHES = 'inch',
  FEETS = 'feet'
}

export enum Duration {
  HOURS = 'hours',
  DAYS = 'days',
  WEEKS = 'weeks',
  MONTHS = 'months',
  YEARS = 'years'
}

export enum WsEvent {
  JOINED = 'joined',
  LEFT = 'left',
  UPDATED = 'updated',
  MESSAGE_RECEIVED = 'message-received',
  MESSAGE_SENT = 'message-sent'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export enum JobStatus {
  OPEN = 'open',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  IN_PROGRESS = 'in-progress'
}

export enum EmailTemplate {
  VERIFY_EMAIL = 'verify-email',
  FORGOT_PASSWORD = 'forgot-password'
}

export enum OrderStatus {
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
  OPEN = 'open',
  CANCELLED = 'calcelled'
}
