const { Message } = require("../models");

exports.createMsg = (req, res, next) => {
    // TODO update handle media 
    // TODO look on project 6 sauces
    // upload button on media


    const msgObject = req.body;

    const msg = new Message({
        ...msgObject,
        mediaUrl: "",
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

exports.getAllMsg = (req, res, next) => {
    Message.findAll({ 
        raw: true,
    }).then((messages) => {
        // console.log("DATADAD RETURN ", messages)
        res.status(200).json(messages)
    });

}
