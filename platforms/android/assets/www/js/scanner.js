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
Scanner.prototype.scanIn = function(){
	
	this.scan("in");
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
Scanner.prototype.scan = function(mode){
	
  cordova.plugins.barcodeScanner.scan(
      
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);

          if (true){//good read

               var data;
               
               if (mode == "in") data = {
                      customerId:$("#scanInClientId").val(), 
                      barCode:result.text, 
                      items:_viewBuilder.formatItems(),
                      instructions:$("#inputInstructions").val(), 
                      scanInDate:todayFormatted(),
                      scanInOut:"in"};
               
               else data = {barCode:result.text,scanOutDate:todayFormatted(),dateInOut:"out"};

                displayObject(data, "Data to PHP\n");
                _communicator.add_inv_data(

                    data,
                    
                    function(){
                       _viewBuilder.alerts({icon:"glyphicon glyphicon-ok green", message:"Barcode successfully scanned to Database."});
                       $("#scanInFormCont").fadeOut(300);
                    },

                    function(){
                       _viewBuilder.alerts({icon:"glyphicon glyphicon-warning-sign orange", message:"Couldn't save to Database."});
                    }

               );   //add inventory data
          }else {  //if good read
               _viewBuilder.alerts({icon:"glyphicon glyphicon-warning-sign orange", message:"Couldn't read barcode - please try again."});
         }
      }, 

      function (error) {
          alert("Scanning failed: " + error);
           _viewBuilder.alerts({icon:"glyphicon glyphicon-warning-sign orange", message:"Couldn't read barcode - please try again."});
      }
   );
}

