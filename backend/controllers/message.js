const { Message,  Comment} = require("../models");

exports.createMsg = (req, res, next) => {


    const msgObject = req.body;

    const msg = new Message({
        ...msgObject,
        imgUrl: "",
        active: true,
    });
    console.log("************************CreateMSG ", req.body)
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
    console.log("************************getAllMsg ", req.params)
    Message.findAll({ 
        raw: true,
    }).then((messages) => {
        messages.map(async (message) => {
            await Comment.findAll({where: { postID: message.id}, raw: true}).then((comments) => {
                message.comments = comments ? comments : [];
            })
        });
        // console.log("DATADAD RETURN ", messages)
        res.status(200).json(messages)
    });

}

exports.commentPost = (req, res, next) => {
    const commentObject = req.body;

    const comment = new Comment({
        ...commentObject,
        active: true,
    });


    comment
        .save()
        .then(() => {
            res.status(201).json({ message: "message added !" });
        })
        .catch((error) => {
            console.log("Create Msg Error :", error)
            res.status(400).json({ message: error });
        });
};