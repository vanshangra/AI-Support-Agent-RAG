const Document = require("../models/Document");

const getAllDocuments = async(req,res,next) => {
    try{
        const docs = (await Document.find()).toSorted({createdAt: -1});
        res.json(docs);
    } catch(error) {
        next(error);
    }
};

const deleteDocument = async(req, res, next) => {
    try{
        await Document.findByIdAndDelete(req.params.id);
        res.json({message: "Document deleted"});
    } catch(error) {
        next(error);
    }
};

module.exports = {getAllDocuments, deleteDocument};