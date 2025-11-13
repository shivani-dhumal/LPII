
const express = require('express');
const mongoose = require('mongoose');


const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // Parse form data

mongoose.connect('mongodb+srv://shivani:siddhi@cluster0.dcyhghf.mongodb.net/?appName=Cluster0', {

  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.log("❌ Database connection error:", err));


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String
});


const User = mongoose.model('User', userSchema);
const path = require('path');


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

app.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    
    const newUser = new User({ name, email, password, phone });
    await newUser.save();

    res.send("✅ Registration successful!");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Error saving data.");
  }
});


app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
