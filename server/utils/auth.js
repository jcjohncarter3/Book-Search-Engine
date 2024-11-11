const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");

// set token secret and expiration date
const secret = "mysecretsshhhhh";
const expiration = "2h";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ").pop().trim();
  if (!token) {
    return res.status(400).json({ message: "You have no token!" });
  }

  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
  } catch {
    console.log("Invalid token");
    return res.status(400).json({ message: "invalid token!" });
  }
  // send to next endpoint
  next();
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

module.exports = authMiddleware;
