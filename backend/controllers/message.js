const { User, Message, Ledger } = require("../models");
const jwt = require("jsonwebtoken");

// Create poster
// Support Video MP4, Media Mp3, just text
exports.createMsg = (req, res, next) => {
    const msgObject = req.body;
    const url = req.protocol + '://' + req.get('host');

    const msg = new Message({
        ...msgObject,
        mediaUrl: req.file ? url + '/uploads/' + req.file.filename : "",
    });

    msg
        .save()
        .then(() => {
            res.status(201).json({ message: "message added !" });
        })
        .catch((error) => {
            console.log("Create Msg Error :", error)
            res.status(400).json({ message: error });
        });
};

// Get All Poster
// find all poster msg with ledger user who read the post
exports.getAllMsg = (req, res, next) => {
    Message.findAll({
        order: [["createdAt", "DESC"]],
        include: [{ model: User, attributes: ['firstName', 'lastName'] },
        { model: Ledger, attributes: ['userId', 'read'] }]
    }).then((messages) => {
        // Logic to checking currently read or not
        messages.map(message => {
            message.dataValues.isRead = message.Ledgers.some(ledger => ledger.userId === req.authID)
        })
        res.status(200).json(messages)
    });

}


// Create ledger userID tight to Poster Msg ID
exports.readMessage = (req, res, next) => {
    const ledgerObject = req.body;
    const ledger = new Ledger(ledgerObject);
    ledger.save().then((ret) => {
        res.status(200).json({ "msg": "Update successful!" })
    })
}
