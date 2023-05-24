const fs = require('fs');

const changeToBuffer = (req) =>{
    if(!req.file.path)
    return null

    const img = fs.readFileSync(req.file.path);
    const encode_img = img.toString('base64');
    const final_img = {
        contentType:req.file.mimetype,
        image:Buffer.from(encode_img,'base64')
    };
    return final_img;
}
module.exports = {
    changeToBuffer
}