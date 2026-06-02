const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const fixedAccounts = {
      'admin@gmail.com': { role: 'admin', name: 'Admin User' },
      'teacher@gmail.com': { role: 'teacher', name: 'Teacher User', subject: 'Mathematics', department: 'Science' }
    };

    if (fixedAccounts[email]) {
      const account = fixedAccounts[email];
      let user = await User.findOne({ email });

      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await new User({ name: account.name, email, password: hashedPassword, role: account.role }).save();
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
      }

      if (account.role === 'teacher') {
        const existingTeacher = await Teacher.findOne({ userId: user._id });
        if (!existingTeacher) {
          await new Teacher({ userId: user._id, subject: account.subject, department: account.department }).save();
        }
      }

      const payload = { id: user._id, role: user.role, name: user.name };
      const token = jwt.sign(payload, process.env.JWT_SECRET || 'mysecretkey', { expiresIn: '1d' });
      return res.json({
        success: true,
        data: {
          token,
          user: { id: user._id, name: user.name, email, role: user.role }
        }
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const payload = {
      id: user._id,
      role: user.role,
      name: user.name
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'mysecretkey', { expiresIn: '1d' });

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, rollNo, department } = req.body;
    const role = 'student';

    if (!name || !email || !password || !rollNo || !department) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    const existingRoll = await Student.findOne({ rollNo });
    if (existingRoll) {
      return res.status(400).json({ success: false, message: 'Roll number already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });
    await newUser.save();

    const newStudent = new Student({
      userId: newUser._id,
      rollNo,
      department
    });
    await newStudent.save();

    res.status(201).json({ success: true, message: 'Registration successful. Please login to continue.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

module.exports = {
  loginUser,
  registerUser
};
