import express from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config';

const router = express.Router();

const admin = new User({
  email: 'admin@rei.com',
  password: '123',
  isAdmin: true,
  dateAdded: new Date(),
});

admin.save();

router.post('/auth', (req, res) => {
  const { identifier, password } = req.body;
  console.log('identifier', identifier);
  console.log('password', password);
  User.findOne({ email: identifier }).exec((err, user) => {
    if (err) {
      console.log('login err', err);
      return res.status(401).json({ errors: { form: 'Invalid Credentials' } });
    }
    console.log('err', err);
    console.log('user', user);
    if (!user) {
      console.log('no user', user);
      return res.status(404).json({ error: 'No such user' });
    }
    if (user.validatePassword(password)) {
      const currentUser = {
        id: user._id,
        username: user.email,
        isAdmin: user.isAdmin,
      };
      const token = jwt.sign(currentUser, config.jwtSecret);
      req.currentUser = currentUser;
      res.json({ data: { token } });
    } else {
      res.status(401).json({ errors: { form: 'Invalid Credentials' } });
    }
  });
});

export default router;
