const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Major = require('../../models/Major'); // Assuming you have a file defining the Major model

// Route to add or update user fields
router.post('/:userId/update', async (req, res) => {
  try {
    const { name, majorId, grad_year } = req.body; // Assuming majorId is provided to change the user's major

    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (majorId) {
      const major = await Major.findById(majorId);
      if (!major) {
        return res.status(404).json({ message: "Major not found" });
      }
      user.major = majorId;
    }
    if (grad_year) user.grad_year = grad_year;

    await user.save();

    res.status(200).json({ message: "User fields updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to delete the user
router.delete('/:userId/delete', async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId).populate('major'); // Populate the 'major' field to get complete major details
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

module.exports = router;
