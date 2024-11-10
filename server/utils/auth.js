const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");

// set token secret and expiration date
const secret = "mysecretsshhhhh";
const expiration = "2h";

const authMiddleware = ({ req }) => {
  const token = req.headers.authorization || "";
  // Logic to verify token and extract user information
  if (!token) {
    throw new AuthenticationError("You must be logged in!");
  }
  // Decode token and return user info
};

module.exports = {
  // function for our authenticated routes
  // authMiddleware: function (req, res, next) {
  //   // allows token to be sent via  req.query or headers
  //   let token = req.query.token || req.headers.authorization;

  //   // ["Bearer", "<tokenvalue>"]
  //   if (req.headers.authorization) {
  //     token = token.split(" ").pop().trim();
  //   }

  //   if (!token) {
  //     return res.status(400).json({ message: "You have no token!" });
  //   }

  //   // verify token and get user data out of it
  //   try {
  //     const { data } = jwt.verify(token, secret, { maxAge: expiration });
  //     req.user = data;
  //   } catch {
  //     console.log("Invalid token");
  //     return res.status(400).json({ message: "invalid token!" });
  //   }

  //   // send to next endpoint
  //   next();
  // },
  authMiddleware,
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
