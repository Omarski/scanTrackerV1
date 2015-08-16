function Scanner(){
	
	this.scanListener();
}

//-------------------------------------------------------------------------------------------------------------
//                                          LISTENERS
//-------------------------------------------------------------------------------------------------------------
Scanner.prototype.scanListener = function(){
	
	$("#scanInBtn").click(function(){
    $("#scanCont").fadeOut(300,function(){
      _viewBuilder.fillOrder();
    });
    
    $("#navOrdersBtn").addClass("active");
  });

  $("#scanOutBtn").click(function(){
    _scanner.scanOut();
  });
}

//-------------------------------------------------------------------------------------------------------------
//                                     			SCAN IN
//-------------------------------------------------------------------------------------------------------------
Scanner.prototype.scanIn = function(orderData){
	
	this.scan("in",orderData);
}

//-------------------------------------------------------------------------------------------------------------
//                                          SCAN OUT
//-------------------------------------------------------------------------------------------------------------
Scanner.prototype.scanOut = function(){
  
  this.scan("out",null);
}

//-------------------------------------------------------------------------------------------------------------
//                                          SCAN
//-------------------------------------------------------------------------------------------------------------
Scanner.prototype.scan = function(mode,orderData){

	
  if (_platform == "mobile") {
    
    cordova.plugins.barcodeScanner.scan(
      
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);

          if (result.text.length > 1){//good read

              _scanner.sendScanData(mode,result.text,orderData);

          } else {  //if bad read
               _viewBuilder.alerts({icon:"glyphicon glyphicon-warning-sign orange", message:"Couldn't read barcode - please try again."});
         }
      }, 

      function (error) {
           _viewBuilder.alerts({icon:"glyphicon glyphicon-warning-sign orange", message:"Couldn't read barcode - please try again."});
      }
   );
  }else{ //not mobile
      if (mode=="in") _scanner.sendScanData(mode,$("#inputShipBarcode").val(),orderData);
      else {
         _viewBuilder.addScanOutView();
      }
  }
}

//-------------------------------------------------------------------------------------------------------------
//                                          SCAN OUT
//-------------------------------------------------------------------------------------------------------------
Scanner.prototype.sendScanData = function(mode,barcode,orderData){
  
   var data;
               
   if (mode == "in") data = {
          customerId:orderData.customerId, 
          orderId:orderData.orderId,
          barCode: barcode, 
          items:JSON.stringify(orderData.items),
          scanInDate:todayFormatted(),
          scanInOut:"in"}

   else {
            //update items obj as delivered

            data = {barCode:barcode,scanOutDate:todayFormatted(),scanInOut:"out"};
  }

    //displayObject(data, "Data to PHP\n");
    var status = ""; //_viewBuilder.calcStatus(orderData.items);

           _communicator.addShipmentData(

              data,
              
              function(){

                  $("#barcodeGenCont").fadeOut(300,function(){
                     if ($("#barcodeGenCont").children()) $("#barcodeGenCont").children().remove();
                     if ($("#shipFormCont").children()) $("#shipFormCont").children().remove();

                     //update the order - if out no need for order data - done serverside

                     if (mode=="in") {
                            _communicator.updateOrderIn(orderData.orderId, JSON.stringify(orderData.items), status,

                                  function(){
                                    _viewBuilder.alerts({icon:"glyphicon glyphicon-ok green", message:"Scan successful - updated order."});
                                    databaseConnect();
                                },

                                  function(){
                                    _viewBuilder.alerts({icon:"glyphicon glyphicon-warning-sign orange", message:"There was a problem updating the order."});
                                }
                            );
                          }

                        }); 
              },//add shipment success

               function(){
                 _viewBuilder.alerts({icon:"glyphicon glyphicon-warning-sign orange", message:"Barcode already scanned to Database."});
              },

              function(){
                 _viewBuilder.alerts({icon:"glyphicon glyphicon-warning-sign orange", message:"Couldn't save to Database."});
              },
              
              function(){
                 _viewBuilder.alerts({icon:"glyphicon glyphicon-warning-sign orange", message:"This barcode wasn't scanned in."});
              }

         );   //add inventory data
  }


