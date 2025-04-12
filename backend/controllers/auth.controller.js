import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    // Check if user exists
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role: role || 'Normal',
    });

    return res.status(201).json({ message: 'User registered', user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Registration failed' });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '2d' });

    return res.status(200).json({ token, user: { id: user.id, role: user.role, email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Login failed' });
  }
};

// Get current user
export const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'address', 'role']
    });
    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to fetch user' });
  }
};
