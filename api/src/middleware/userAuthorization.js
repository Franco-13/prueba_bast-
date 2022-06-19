import { firebaseAdmin } from "../app.js";
import User from "../models/User.js";

export const userAuthorization = (req, res, next) => {
  const token = req.headers.authorization;
  firebaseAdmin
    .auth()
    .verifyIdToken(token)
    .then((resp) => {
      User.findOne({ id_user: resp.uid })
        .then((response) => {
          if (!response) {
            throw new Error("User does not exist");
          } else {
            req.user = response;
            next();
          }
        })
        .catch((error) => {
          res.status(400).json({ error: error.message });
        });
    });
};
