import { describe, it, expect } from 'vitest';
import { validateEmail, validatePassword } from '../validation';

describe('validateEmail', () => {
  it('returns true for a valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  it('returns false for an invalid email', () => {
    expect(validateEmail('invalid-email')).toBe(false);
  });
});

describe('validatePassword', () => {
  it('returns valid for strong password', () => {
    const result = validatePassword('Valid123!');
    expect(result).toEqual({ isValid: true, message: 'Password is valid' });
  });

  it('fails when too short', () => {
    const result = validatePassword('Va1!');
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('at least 8 characters');
  });

  it('fails without uppercase letter', () => {
    const result = validatePassword('valid123!');
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('Password must contain at least one uppercase letter');
  });

  it('fails without lowercase letter', () => {
    const result = validatePassword('VALID123!');
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('Password must contain at least one lowercase letter');
  });

  it('fails without number', () => {
    const result = validatePassword('ValidPass!');
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('Password must contain at least one number');
  });

  it('fails without special character', () => {
    const result = validatePassword('Valid1234');
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('Password must contain at least one special character');
  });
});
