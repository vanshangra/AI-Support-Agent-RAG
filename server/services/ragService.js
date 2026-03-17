const axios = require('axios');

const sendDocumentForProcessing = async(filePath, documentId) => {
    try{
        const response = await axios.post(
            'http://localhost:5001/process', 
            {
                filePath: filePath,
                documentId: documentId
            });

            return response.data;
    }catch(error){
        throw new Error('RAG service failed');
    }
};
module.exports = {
    sendDocumentForProcessing
};