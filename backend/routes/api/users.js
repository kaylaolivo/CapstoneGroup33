const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const passport = require('passport');

// @route   POST api/users/register
// @desc    Create a new user with firstname, lastname, email, and password
// @access  Public
router.post('/register', (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  // Create a new user
  const newUser = new User({ first_name, last_name, email });

  // Register the user with Passport (assuming you have Passport configured)
  User.register(newUser, password, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, msg: 'Error creating user' });
    }

    // Optionally, you can handle additional logic here, such as generating a token
    return res.json({ success: true, msg: 'User registered successfully' });
  });
});

// @route   PUT api/users/:id
// @desc    Edit user information
// @access  Private
router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const userId = req.params.id;
    const { first_name, last_name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { first_name, last_name, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/users/:id
// @desc    Delete user
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/users/:id
// @desc    View user information
// @access  Private
router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
