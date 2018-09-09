const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Mailer = require('../mailer/index');
const ConfirmationMailBuilder = require('../mailer/ConfirmationMailBuilder');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const User = require('../models/User');

const checkIfUserExists = (req, res, next) => {
  const { email } = req.body;

  User.find({ email }).then(users => {
    if (users.length) {
      return res.status(409).send('User with this email already exists');
    }

    next();
  })
    .catch(() => {
      return res.status(500).send('Could not add new user to the database');
    });
};

router.post('/register', checkIfUserExists, (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const { name, email } = req.body;

  User.create({
    name,
    email,
    password: hashedPassword,
    confirmed: false,
  })
    .then((user) => {
      res.status(200).send(user);

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: 86400 });

      const mailContent = ConfirmationMailBuilder.buildMail(user.name, token);
      Mailer.sendMail('Miriloth@gmail.com', mailContent);
    })
    .catch(() => {
      return res.status(500).send('Could not add new user to the database');
    });
});

module.exports = router;