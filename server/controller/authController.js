// import jwt from 'jsonwebtoken';

// export const adminLogin = (req, res) => {
//   const { email, password } = req.body;

//   if (
//     email === process.env.ADMIN_EMAIL &&
//     password === process.env.ADMIN_PASSWORD
//   ) {
//     const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, {
//       expiresIn: '1d',
//     });
//     return res.json({ token });
//   }

//   res.status(401).json({ message: 'Invalid credentials' });
// };



import User from '../model/User.js';

// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       console.log('No user found with email:', email);
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await user.matchPassword(password);
//     console.log('Password match:', isMatch);

//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     res.status(200).json({ message: 'Login successful', user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
import jwt from 'jsonwebtoken';
// POST /api/auth/admin/login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('No user found with email:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    console.log('Password match:', isMatch);
    if (!isMatch || user.role !== 'admin') {
      return res.status(401).json({ message: 'Invalid credentials or not an admin' });
    }

    // 1) Create a JWT payload
    const payload = { id: user._id, role: user.role };

    // 2) Sign the token
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // 3) Return the token + some user info
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        _id:  user._id,
        name: user.name,
        email: user.email,
        role:  user.role
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};