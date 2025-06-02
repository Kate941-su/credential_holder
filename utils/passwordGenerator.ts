export function generatePassword(
  length = 16,
  includeUppercase = true,
  includeLowercase = true,
  includeNumbers = true,
  includeSymbols = true
): string {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  let chars = '';
  if (includeUppercase) chars += uppercaseChars;
  if (includeLowercase) chars += lowercaseChars;
  if (includeNumbers) chars += numberChars;
  if (includeSymbols) chars += symbolChars;

  if (chars.length === 0) {
    chars = lowercaseChars + numberChars;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
}

export function calculatePasswordStrength(password: string): number {
  if (!password) return 0;
  
  // Calculate score based on length, character types, and complexity
  let score = 0;
  
  // Length
  score += Math.min(password.length * 4, 40);
  
  // Character variety
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);
  
  if (hasLowercase) score += 10;
  if (hasUppercase) score += 10;
  if (hasNumbers) score += 10;
  if (hasSymbols) score += 15;
  
  // Bonus for mixed character types
  let typesCount = 0;
  if (hasLowercase) typesCount++;
  if (hasUppercase) typesCount++;
  if (hasNumbers) typesCount++;
  if (hasSymbols) typesCount++;
  
  score += (typesCount - 1) * 10;
  
  // Cap at 100
  return Math.min(score, 100);
}