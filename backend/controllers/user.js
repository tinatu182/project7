const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

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
                .catch((error) => {
                    console.log("ererehre ", error)
                    res.status(400).json({ error: "email address already in use" })
                });
        })
        .catch((error) => res.status(500).json({ error }));
};

// Login user
exports.logIn = (req, res, next) => {
    User.findOne({ where: { email: req.body.email } })
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
                        token: jwt.sign({ userId: user.id }, process.env.KEY, {
                            expiresIn: "24h",
                        }),
                    });
                })
                .catch((error) => {
                    console.log("error", error)
                    res.status(500).json({ error })
                })
        })
        .catch((error) => {
            console.log("error", error)
            res.status(500).json({ error })
        });
};

exports.deleteUser = (req, res, next) => {
    User.findOne({ where: { id: req.params.id } }).then((user) => {
        user
            .destroy()
            .then(() => {
                res.status(200).json({ message: "user deleted !" });
            })
            .catch((error) => res.status(401).json({ error }));
    });
};

// User routes
// GET route displays individual user information
exports.userEdit = async (req, res) => {
    const userId = req.params.userId; // Get userId from request parameters
    const url = req.protocol + '://' + req.get('host'); // Creates URL for image file path
    const profilePic = req.file ? url + '/images/' + req.file.filename : ''; // Checks if image file was uploaded with the request. If yes, the imageUrl set to url + location + filename. If no, imageUrl set to an empty string
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    User.findOne({
        where: {
            userId: userId,
        },
    })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            // Update user model with only the fields that are present in the request body
            const updatedFields = {};
            if (profilePic) {
                updatedFields.profilePic = profilePic;
            }
            if (firstName) {
                updatedFields.firstName = firstName;
            }
            if (lastName) {
                updatedFields.lastName = lastName;
            }

            user.update(updatedFields)
                .then(() => {
                    res.status(200).json({
                        message: 'Profile successfully updated!',
                        user,
                    });
                })
                .catch((error) => {
                    res.status(400).json({
                        error: error.message || 'Failed to update profile.',
                    });
                });
        })
        .catch((error) => {
            res.status(400).json({
                error: error.message || 'Failed to update profile.',
            });
        });
};