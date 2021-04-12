const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.name,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id
      req.session.username = dbUserData.name
      res.json(dbUserData)
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
//find out where post request is being submitted, form sends post request to this route, eventhandler never being triggered 
router.post('/login', async (req, res) => {
  console.log("we are in the post login route")
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.name,
      },
    });

    if (!dbUserData) {
      res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id
      req.session.username = dbUserData.name
      res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
