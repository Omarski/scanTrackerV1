function Scanner(){
	
	this.scanListener();
}

//-------------------------------------------------------------------------------------------------------------
//                                          LISTENERS
//-------------------------------------------------------------------------------------------------------------
Scanner.prototype.scanListener = function(){
	
	$("#scanInBtn").click(function(){
    $(".scanBtns").fadeOut(300,function(){$("#scanInFormCont").show(500);});
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
  
  this.scan("out");
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
      _scanner.sendScanData(mode,$("#inputShipBarcode").val(),orderData);
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
          items:orderData.items,
          scanInDate:todayFormatted(),
          scanInOut:"in"}

   else data = {barCode:barcode,scanOutDate:todayFormatted(),scanInOut:"out"};

    displayObject(data, "Data to PHP\n");
    
    _communicator.addShipmentData(

        data,
        
        function(){
            
            $("#barcodeGenCont").fadeOut(300,function(){
               if ($("#barcodeGenCont").children()) $("#barcodeGenCont").children().remove();
               if ($("#shipFormCont").children())$("#shipFormCont").children().remove();
            });

            databaseConnect();
        },

         function(){
           _viewBuilder.alerts({icon:"glyphicon-warning-sign orange", message:"Barcode already scanned to Database."});
        },

        function(){
           _viewBuilder.alerts({icon:"glyphicon glyphicon-warning-sign orange", message:"Couldn't save to Database."});
        },
        
        function(){
           _viewBuilder.alerts({icon:"glyphicon glyphicon-warning-sign orange", message:"This barcode wasn't scanned in."});
        }

   );   //add inventory data
}


