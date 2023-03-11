const { ReasonPhrases, StatusCodes } = require('http-status-codes');
const registerUserSchema = require('../validators/user/registerUserSchema');
const admin = require('../services/firebase');

const adminEmails = ['anisa1@gmail.com', 'diellza1@gmail.com', 'art1@gmail.com'];

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

      await admin.auth().updateUser(user.uid, {
        displayName: name,
      });

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
};