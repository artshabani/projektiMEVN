const { ReasonPhrases, StatusCodes } = require('http-status-codes');
const registerUserSchema = require('../validators/user/registerUserSchema');
const admin = require('../services/firebase');
const bcrypt = require('bcrypt');

const adminEmails = ['test2023@gmail.com','test31@gmail.com'];

module.exports = {
  async register(req, res) {
    // validate the user input
    const validationResult = registerUserSchema.validate(req.body);

    if (validationResult.error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          error: validationResult.error.message,
          message: ReasonPhrases.BAD_REQUEST,
        });
    }

    const {name, email, password } = req.body;

    try {
      const user = await admin.auth().createUser({
        name,
        email,
        password
      })
      if (adminEmails.includes(user.email)) {
        const userClaim = { admin: true };
        await admin.auth().setCustomUserClaims(user.uid, userClaim);

        await admin.firestore().collection('roles').doc(user.uid).set({
          email: user.email,
          role: userClaim
        })
      }

      return res.json({ user });
    } catch (error) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({
          error: error.message,
          message: ReasonPhrases.FORBIDDEN,
        });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userRecord = await admin.auth().getUserByEmail(email);
      const { uid, customClaims = {} } = userRecord;
      const { passwordHash } = customClaims;

      if (!passwordHash) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, passwordHash);
      if (!isMatch) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid credentials' });
      }

      const token = await admin.auth().createCustomToken(uid);
      return res.json({ token });
    } catch (error) {
      console.log('Error:', error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },
};
