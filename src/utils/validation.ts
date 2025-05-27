export const validateEmail = (email: string): boolean => {
  if (!email) return false;
  
  // Trim the email before validation
  const trimmedEmail = email.trim();
  
  // Use a comprehensive regex for email validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  // Check length and regex
  if (trimmedEmail.length > 254) return false;
  
  return emailRegex.test(trimmedEmail);
};

export interface PasswordValidationResult {
  isValid: boolean;
  message: string;
}

export const validatePassword = (password: string): PasswordValidationResult => {
  // Check if password is provided
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  if (!hasUpperCase) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!hasLowerCase) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!hasNumbers) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  
  if (!hasSpecialChar) {
    return { isValid: false, message: 'Password must contain at least one special character' };
  }

  return { isValid: true, message: 'Password is valid' };
};