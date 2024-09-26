const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Replace with your MongoDB URI
const mongoURI = 'mongodb+srv://parnitabharti:NLAHnXNIJbYAQDvA@parnita.dwewosf.mongodb.net/datalist?retryWrites=true&w=majority&appName=Parnita';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');
    try {
      const users = await User.find({}, 'username'); // Fetch usernames only
      console.log('Usernames:', users.map(user => user.username));
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  })
  .catch(err => console.log(err));

// Enable CORS
app.use(cors({
  origin: 'http://127.0.0.1:5500'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// User schema and model
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, default: 'student' } 
});

const User = mongoose.model('User', UserSchema, 'dataname');

// JWT secret
const JWT_SECRET = 'ajisback';

// Login route
app.post('/login', async (req, res) => {
  console.log('Logging in');
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  
  if (!user) {
    return res.status(401).send('Invalid username');
  }
  
  const isMatch = password == user.password;
  if (!isMatch) {
    return res.status(401).send('Invalid password');
  }
  
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  console.log(user.role)
  res.json({ token, role: user.role }); 
});


app.listen(port, () => {
  console.log(`Server running on ${port}`);
});


