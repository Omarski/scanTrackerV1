
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
		                "<button type='button' class='btn btn-success' id='labelPrintBtn'><span class='glyphicon glyphicon-barcode'></span><span class='allBtn'>Print label</span></button>"+
	                    "<button type='button' class='btn btn-warning' style='margin-left:6%' id='labelCancelBtn'><span class='glyphicon glyphicon-remove'></span><span class='allBtn'>Cancel</span></button>"+
                "</div>"+
			"</div>";
	
	$("#barcodeGenCont").html(html);

	var date = new Date();
	$("#barcodeImgCont").JsBarcode(date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
	
	$("#inputCustomerId4address").keyup(function(){
		if ($(this).val().length == 6){
			_communicator.getAddress($(this).val().replace(/\s+/g, ''));
		}
	});

	$('#labelPrintBtn').click(function(){
		$('#labelCont').printElement();
	});

	$('#labelCancelBtn').click(function(){
		$("#barcodeGenCont").fadeOut(300);
	});

}