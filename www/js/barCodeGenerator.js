
function BarCodeGenerator(){
	
}

//-------------------------------------------------------------------------------------------------------------
//                                     			GENERATE
//-------------------------------------------------------------------------------------------------------------
BarCodeGenerator.prototype.generate = function(orderData){

	if ($("#barcodeGenCont").children()) $("#barcodeGenCont").children().remove();
	
	html =  "<div class='row'>"+
                "<div class='col-xs-12'>"+
		            "<p><span class='bolded'>Customer name: </span>"+_viewBuilder.nameFromId(orderData.customerId)+ "<span class='bolded'> Order number: </span>" +orderData.orderId+"</p>"+
		        "</div>"+
		     "</div>"+

		            
            "<div class='row'>"+
               "<div class='col-xs-12'>"+
		            "<div id='labelCont'>"+
		                "<img id='barcodeImgCont' class='barCodeImage'>"+
		                "<p id='labelAddress' class='labelAddress'>Send to:</p>"+
		            "</div>"+
		       "</div>"+
      		"</div>"+
            	  
        	  "<div class='row'>"+//instructions
                  "<div class='col-xs-12 form-group'>"+
                       "<input class='form-control' id='inputShipBarcode' placeholder='Barcode' style='display:none'>"+
                  "</div>"+
             "</div>"+

            "<div class='row'>"+
               "<div class='col-xs-12'>"+
                	"<button type='button' class='btn btn-primary' id='labelPrintBtn'><span class='glyphicon glyphicon-barcode'></span><span class='allBtn'>Print label</span></button>"+
               		"<button type='button' class='btn btn-success' style='margin-left:6%' id='labelScanBtn'><span class='glyphicon glyphicon-barcode'></span><span class='allBtn'>Scan label</span></button>"+
                	"<button type='button' class='btn btn-warning' style='margin-left:6%' id='labelCancelBtn'><span class='glyphicon glyphicon-remove'></span><span class='allBtn'>Cancel</span></button>"+
      		   "</div>"+
      		"</div>";
	
	$("#barcodeGenCont").html(html);

	//place address
	_communicator.getAddress(orderData.customerId);

	if (_platform == "desktop") $("#inputShipBarcode").show();
	
	var date = new Date();
	$("#barcodeImgCont").JsBarcode(date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());

	$('#labelPrintBtn').click(function(){
		$('#labelCont').printElement();
	});


	$('#labelScanBtn').click(function(){
		
		 var coll;

         if (_platform == "desktop"){
             
             coll =[{inputCont:$("#inputShipBarcode"), message:"Use scanner to input barcode.", style:null,
                  check:{valid:["Barcode","", null], inputType:"text", checkType:null, range:null}}];
        
                  
          _validate.test({collection:coll,

                onPass:function(){_scanner.scanIn(orderData);}
      
                }); //validate steps

           }else{
           		_scanner.scanIn(orderData);
           }
	});

	$('#labelCancelBtn').click(function(){
		$("#barcodeGenCont").fadeOut(300,function(){$("#shipFormCont").slideDown(700);});
	});

}