
function unAuthorized(res){
  res.status(401).json({
    });
    return res;
}

function Forbidden(res){
res.status(403).json();
  return res;
}

function saveSuccess(res){
res.status(201).json();
  return res;
}


function actionSuccess(res){
res.status(200).json();
debugger;
  return res;
}
function retunData(res, data){
  res.status(200).json(
       data
    );
  return res;
}

function noDataFound(res){
res.status(204).json();
return res;
}

function validationError(res, value){
res.status(400).json({
  value
});
return res;
//  res.status(400);
//   res.send(value);
// res.status(400).send(value);
return res;
}



function Error(res, value){
res.status(500).json({
  value
});
return res;
//  res.status(400);
//   res.send(value);
// res.status(400).send(value);
return res;
}

module.exports.returnUnAuthorizeResponse = unAuthorized;
module.exports.returnDataResponce = retunData;
module.exports.retunrNoDataResponse = noDataFound;
module.exports.returnSaveResponse = saveSuccess;
module.exports.returnValidationResponse = validationError;
module.exports.returnForbiddenResponse = Forbidden;
module.exports.returnActionSuccesResponse = actionSuccess;
module.exports.returnErrorResponse = Error;
