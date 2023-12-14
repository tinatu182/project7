const { User, Message } = require("../models");

exports.createMsg = (req, res, next) => {
    // TODO update handle media 
    // TODO look on project 6 sauces
    // upload button on media


    const msgObject = req.body;
    const url = req.protocol + '://' + req.get('host');  // get url from req

    const msg = new Message({
        ...msgObject,
        mediaUrl: url + '/uploads/' + req.file.filename,
    });

    console.log("*************** here asdas ", {
        ...msgObject,
        mediaUrl: url + '/uploads/' + req.file.filename,
    })
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
        include: [{model: User, attributes: ['firstName', 'lastName']}]
    }).then((messages) => {
        // console.log("DATADAD RETURN ", messages)
        res.status(200).json(messages)
    });

}
