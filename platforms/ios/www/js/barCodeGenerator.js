
function BarCodeGenerator(){
	
}

//-------------------------------------------------------------------------------------------------------------
//                                     			GENERATE
//-------------------------------------------------------------------------------------------------------------
BarCodeGenerator.prototype.generate = function(){

	if ($("#barcodeGenCont").children()) $("#barcodeGenCont").children().remove();
	
	html =  "<div class='row'>"+
                "<div class='col-xs-12'>"+
	                "<img id='barcodeImgCont' class='barCodeImage'>"+
	                "<p id='labelAddress'>123 S. Main St. #45<br>Mumbasa. Ethiopia 90203</p>"+
                "</div>";
			"</div>";
	$("#barcodeGenCont").html(html);

				var date = new Date();
				$("#barcodeImgCont").JsBarcode(date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
	}