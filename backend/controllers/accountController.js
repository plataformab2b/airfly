const User = require("../models/user");
const config = require("../config.js");
const jwt = require("jwt-simple");


exports.login = async function (req, res) {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    
    const payload = { 
      id: user.id, 
      expire: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days
    };
    
    const token = jwt.encode(payload, config.jwtSecret);
    res.json({ token: token });
  } catch (err) {
    console.error("Login error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.register = async function (req, res) {
  try {
    const newUser = new User({ 
      email: req.body.email, 
      username: req.body.username 
    });

    User.register(newUser, req.body.password, function (err, user) {
      if (err) {
        console.error("Register error", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Successful", user: user });
    });
  } catch (err) {
    console.error("Registration error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.profile = function(req, res) {
  res.json({
    message: 'You made it to the secured profile',
    user: req.user,
    token: req.query.secret_token
  });
};

