import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import User from './model/User.js';
import bcrypt from 'bcryptjs';
import path from 'path';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);


app.use('/image', express.static(path.join(__dirname, 'image')));

const createAdminUser = async () => {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);

      const adminUser = new User({
        name: 'Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin', // optional if using roles
      });

      await adminUser.save();
      console.log("✅ Admin user created successfully");
    } else {
      console.log("ℹ️ Admin user already exists");
    }
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
  }
};

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // 👈 Simplified
    console.log('✅ Connected to MongoDB');
    createAdminUser();
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};


// Start server after DB connection
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
