export const generateCaptcha = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Simple salt for hashing the captcha code with a secret
export const hashCaptcha = (code: string) => {
  // In a real app, use a secret from env
  return Buffer.from(code + (process.env.JWT_SECRET || 'senfy-secret')).toString('base64');
};

export const verifyCaptcha = (code: string, hash: string) => {
  return hashCaptcha(code.toUpperCase()) === hash;
};
