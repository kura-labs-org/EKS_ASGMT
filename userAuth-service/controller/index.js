const User = require('../db/model/users'),
  jwt = require('jsonwebtoken');

/**
 * @param {name, email, password}
 * Create a user
 * @return {user}
 */
exports.createUser = async (req, res) => {
  const {
    chef,
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    street,
    city,
    state,
    zip,
    dateOfBirth
  } = req.body;
  try {
    const user = new User({
      chef,
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      street,
      city,
      state,
      zip,
      dateOfBirth
    });
    await user.save();
    const token = await user.generateAuthToken();
    req.session = {
        jwt = token
    }
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};
/**
 * @param {email, password}
 * Login a user
 * @return {user}
 */
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    req.session = {
        jwt = token
    }
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

exports.getCurrentUser = async (req, res) => {
    // check for the jsonwebtoken
    if(!req.session?.jwt) {
        return res.send({currentUser: null})
    }

    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY)
    res.json({currentUser: payload});
}

/**
 * @param {{updates}}
 * Update a user
 * @return {user}
 */
exports.updateCurrentUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'avatar'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: 'invalid updates!' });
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.json(req.user);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

exports.logoutUser = async (req, res) => {
    try {
      req.session = null
      res.json({ message: 'Logged out' });
    } catch (e) {
      res.status(500).json({ error: e.toString() });
    }
};
