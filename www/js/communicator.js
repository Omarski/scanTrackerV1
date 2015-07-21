//-------------------------------------------------------------------------------------------------------------
//                                     			COMMUNICATOR
//-------------------------------------------------------------------------------------------------------------

function Communicator(){
	
}

//-------------------------------------------------------------------------------------------------------------
//                                          ADD USER DATA
//-------------------------------------------------------------------------------------------------------------

Communicator.prototype.addClient = function(dataObj,returnFunc,errorFunction){

var data = dataObj;
  
  $.ajax({
    type: 'GET',
    url: "http://www.bluegravitymedia.com/DBST/scripts/add_customer.php",
    data: data,
    crossDomain: true,
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(resultData) {
        alert("Add client return: " + resultData["customerId"]);
        
        if (resultData["duplicate"]) {errorFunction(); return false;}
        else  {returnFunc(); $(".alerts").append("<p class='alertText green'>&nbsp;Customer ID: "+resultData["customerId"]+"</p>");}
      },
      error: function(jqXHR, textStatus, errorThrown){alert(jqXHR+ "\n" + textStatus + "\n" + errorThrown);}
    });
    return false;
}

//-------------------------------------------------------------------------------------------------------------
//                                          ADD USER DATA
//-------------------------------------------------------------------------------------------------------------

Communicator.prototype.findClient = function(type,key,returnFunc,returnEmpty){

var data = {type:type, key:key};
  
  $.ajax({
      type: "GET",
      dataType: "jsonp",
      url: "http://www.bluegravitymedia.com/DBST/scripts/find_customer.php",
      data: data,
      crossDomain: true,
      contentType: "application/json",
      success: function(resultData) {
        //alert(resultData.foundMatch);
        if (resultData["foundRecord"] == "empty") {returnEmpty(); return false;}
        else {_companyJSON = resultData;
        returnFunc();} 
      },
      error: function(jqXHR, textStatus, errorThrown){alert(jqXHR+ "\n" + textStatus + "\n" + errorThrown);}
    });
    return false;
}

//-------------------------------------------------------------------------------------------------------------
//                                     			GET ALL USER DATA
//-------------------------------------------------------------------------------------------------------------

Communicator.prototype.getInvData = function(returnFunc){

$.ajax({
    type: 'GET',
    //url: "scripts/get_inv_data.php",
    url: "http://www.bluegravitymedia.com/DBST/scripts/get_inv_data.php",
    crossDomain: true,
    contentType: "application/json",
    //async:false,
    //jsonpCallback: 'myCallback',
    dataType: 'jsonp',
    success: function(resultData) {
        if (resultData['noRecords']) _dbJSON = null;
        else {
                //displayObject(resultData.scanId44,""); 
                //displayObject(resultData.idNamePairs,"");
                _dbJSON=resultData;
                _idNamePairs = resultData.idNamePairs;                
                _viewBuilder.displayInvData(_dbJSON);
              }
        
        returnFunc();
      },
      error: function(jqXHR, textStatus, errorThrown){alert(jqXHR+ "\n" + textStatus + "\n" + errorThrown);}
    });

    return false;
}

//-------------------------------------------------------------------------------------------------------------
//                                     			ADD USER DATA
//-------------------------------------------------------------------------------------------------------------

Communicator.prototype.addInvData = function(dataObj,returnFunc,errorPrescan,errorFunction,errorInvalidCustID,errorNoInScan){

var data = dataObj;
  //displayObject(data,"");
	$.ajax({
      type: "GET",
      dataType: "jsonp",
      url: "http://www.bluegravitymedia.com/DBST/scripts/add_inv_data.php",
      data: data,
      crossDomain: true,
      contentType: "application/json",
      success: function(resultData) {
         if (resultData["foundScan"]) {errorPrescan(); return false;}
         else if (resultData["invalidCustId"]) {errorInvalidCustID(); return false;}
         else if (resultData["noInScanFound"]) {errorNoInScan(); return false;}

         else {
          returnFunc();
          if (resultData["orderId"]) _viewBuilder.alerts({icon:"glyphicon glyphicon-ok green", message:"Barcode successfully scanned - order #"+resultData.orderId+"."});
          if (resultData["scannedOut"]) _viewBuilder.alerts({icon:"glyphicon glyphicon-ok green", message:"Barcode successfully scanned out."});
        }
      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR+ "\n" + textStatus + "\n" + errorThrown);
        errorFunction();
      }
    });
    return false;
}

//-------------------------------------------------------------------------------------------------------------
//                                          GET ADDRESS
//-------------------------------------------------------------------------------------------------------------

Communicator.prototype.getAddress = function(customerId){

//alert("check for: " + customerId);

var data = {queryName:"getAddress",customerId:customerId};

$.ajax({
      type: "GET",
      dataType: "jsonp",
      url: "http://www.bluegravitymedia.com/DBST/scripts/queries.php",
      data: data,
      crossDomain: true,
      contentType: "application/json",
      success: function(resultData){
  
        $("#labelAddress").html("Address:\n"+resultData.address);
      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR+ "\n" + textStatus + "\n" + errorThrown);
      }
    });
    return false;

}