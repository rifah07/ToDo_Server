const express = require("express");
const router = express.Router();
const User = require("../../models/Users");
const { models } = require("mongoose");

router.post("/", async (req, res) => {
  const userObj = {
    fname: req.body.fname,
    lname: req.body.lname,
  };
  const user = new User(userObj);
  await user.save();
  res.status(201).json(user);
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(users);
  } catch {
    res.status(500).json({ message: "User not found" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.fname !== undefined) {
      users.fname = req.body.fname;
    }
    if (req.body.lname !== undefined) {
      users.lname = req.body.lname;
    }

    await users.save();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
    try {
        const id = await User.findById(req.params.id);       
        const deleteUser = await User.findByIdAndDelete(id);
        if(deleteUser){
          return res.json({ message: "User deleted" });
        }
        
        return res.status(404).json({ message: 'User not found' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;