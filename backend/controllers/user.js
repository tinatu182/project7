const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../models");

// Signup user
exports.signUp = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
            });
            user
                .save()
                .then(() => res.status(201).json({ message: "user created !" }))
                .catch((error) =>
                    res.status(400).json({ error: "email address already in use" })
                );
        })
        .catch((error) => res.status(500).json({ error }));
};

// Login user
exports.logIn = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(403).json({ error: "invalid user" });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(403).json({ error: "invalid password" });
                    }
                    res.status(200).json({
                        user: user,
                        token: jwt.sign({ userId: user._id }, process.env.KEY, {
                            expiresIn: "24h",
                        }),
                    });
                })
                .catch((error) => {
                    console.log("error", error)
                    res.status(500).json({ error })
                })})
        .catch((error) => {
            console.log("error", error)
            res.status(500).json({ error })
        });
};

exports.deleteUser = (req, res, next) => {
    User.findOne({ _id: req.params.id }).then((user) => {
        user
            .deleteOne({ _id: req.params.id })
            .then(() => {
                res.status(200).json({ message: "user deleted !" });
            })
            .catch((error) => res.status(401).json({ error }));
    });
};