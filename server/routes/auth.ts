import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
import { User } from '../models/User';

import { generateCaptcha, hashCaptcha, verifyCaptcha } from '../utils/captcha';

const router = express.Router();

// Get CAPTCHA
router.get('/captcha', (req, res) => {
  const code = generateCaptcha();
  const hash = hashCaptcha(code);
  // Return the code (obfuscated in UI) and the hash for verification
  res.status(200).json({ code, hash });
});

// NodeMailer Config
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, captcha, captchaHash, domain, industry } = req.body;

    // Validate Captcha
    if (!verifyCaptcha(captcha, captchaHash)) {
      return res.status(400).json({ message: 'Invalid security code' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate OTP
    const otp = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    const user = new User({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires
    });

    await user.save();

    // Send Email
    await transporter.sendMail({
      from: `"Senfy AI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify your Senfy AI Account',
      text: `Your OTP is ${otp}. It expires in 5 minutes.`
    });

    res.status(201).json({ message: 'User registered. Please verify your email.' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.otp !== otp || (user.otpExpires && user.otpExpires < new Date())) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Verification failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password, captcha, captchaHash } = req.body;

    // Validate Captcha
    if (!verifyCaptcha(captcha, captchaHash)) {
      return res.status(400).json({ message: 'Invalid security code' });
    }
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.isVerified) return res.status(401).json({ message: 'Please verify your email first' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
});

export default router;
