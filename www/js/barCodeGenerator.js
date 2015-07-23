
function BarCodeGenerator(){
	
}

//-------------------------------------------------------------------------------------------------------------
//                                     			GENERATE
//-------------------------------------------------------------------------------------------------------------
BarCodeGenerator.prototype.generate = function(){

	if ($("#barcodeGenCont").children()) $("#barcodeGenCont").children().remove();
	
	html =  "<div class='row'>"+
                "<div class='col-xs-12' id=''>"+
		                "<input class='inputCustomerId' id='inputCustomerId4address' placeholder='Customer ID'>"+
		            "<div id='labelCont'>"+
		                "<img id='barcodeImgCont' class='barCodeImage'>"+
		                "<p id='labelAddress' class='labelAddress'>Send to:</p>"+
		            "</div>"+
		            	  
		            	  "<div class='row'>"+//instructions
                              "<div class='col-xs-12 form-group'>"+
                                   "<input class='form-control' id='inputShipBarcode' placeholder='Barcode' style='display:none'>"+
                              "</div>"+
                         "</div>"+

		                "<button type='button' class='btn btn-success' id='labelPrintBtn'><span class='glyphicon glyphicon-barcode'></span><span class='allBtn'>Print label</span></button>"+
		                "<button type='button' class='btn btn-success' style='margin-left:6%' id='labelScanBtn'><span class='glyphicon glyphicon-barcode'></span><span class='allBtn'>Scan label</span></button>"+
	                    "<button type='button' class='btn btn-warning' style='margin-left:6%' id='labelCancelBtn'><span class='glyphicon glyphicon-remove'></span><span class='allBtn'>Cancel</span></button>"+
                "</div>"+
			"</div>";
	
	$("#barcodeGenCont").html(html);

	if (_platform == "desktop") $("#inputShipBarcode").show();
	
	var date = new Date();
	$("#barcodeImgCont").JsBarcode(date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
	
	// $("#inputCustomerId4address").keyup(function(){
	// 	if ($(this).val().length == 6){
	// 		_communicator.getAddress($(this).val().replace(/\s+/g, ''));
	// 	}
	// });

	$('#labelPrintBtn').click(function(){
		$('#labelCont').printElement();
	});


	$('#labelScanBtn').click(function(){
		
		  var coll;

         if (_platform == "desktop"){
             
             coll =[{inputCont:$("#inputShipBarcode"), message:"Use scanner to input barcode.", style:null,
                  check:{valid:["Barcode","", null], inputType:"text", checkType:null, range:null}}];
        
                  
          _validate.test({collection:coll,

                onPass:function(){_scanner.scanIn();}
      
                }); //validate steps

           }else{
           		_scanner.scanIn();
           }
	});

	$('#labelCancelBtn').click(function(){
		$("#barcodeGenCont").fadeOut(300,function(){$("#shipFormCont").slideDown(700);});
	});

}