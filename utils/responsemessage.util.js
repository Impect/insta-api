const ENGResource = require("../configs/env/MN.env.js");

function MessageData(messagename) {
    return ENGResource[messagename];
}


function TextResource(data){
    return MNResource.TextResource[data];
}


module.exports.MessageData = MessageData;
module.exports.TextResource = TextResource;

