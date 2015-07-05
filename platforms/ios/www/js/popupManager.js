function PopupManager(){

}

//-------------------------------------------------------------------------------------------------------------
//                                     			MAKE POP
//-------------------------------------------------------------------------------------------------------------
PopupManager.prototype.makeSimplePopup = function(popObj){

	var _lastModal = popObj["popupId"];
	var closeBtn = (popObj["closeBtn"]) ?
		'<button type="button" class="close modalCloseBtn" style="' + popObj["btnStyle"] + 
		'" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>':'';
	var header = (popObj["header"]) ? popObj["header"]:'';
	var footer = (popObj["footer"]) ? popObj["footer"]:'';
	var headerSect = (popObj["closeBtn"]) ? '<div class="modal-header noBorder">'+closeBtn+header+'</div>':'';
	var custFrameClass = (popObj["custFrameClass"]) ? popObj["custFrameClass"]:'';
	var custContClass = (popObj["custContClass"]) ? popObj["custContClass"]:'';
	
	var template = '<div class="modal fade" tabIndex=-1 id="'+ popObj["popupId"]+'">'+
	  '<div class="modal-dialog '+custFrameClass+'">'+
	    '<div class="modal-content '+custContClass+'">'+
	      headerSect+
	      '<div class="modal-body">'+
	      '<div id="'+ popObj["bodyId"]+'"></div>'+
	      '</div>'+
	      footer+
	    '</div>'+//<!-- /.modal-content -->
	  '</div>'+//<!-- /.modal-dialog -->
	'</div>';//<!-- /.modal -->
	$("#"+popObj["popCont"]).html(template);
	$("#"+popObj["bodyId"]).html(popObj["body"]);
}

//-------------------------------------------------------------------------------------------------------------
//                                     			LAUNCH POP
//-------------------------------------------------------------------------------------------------------------
PopupManager.prototype.launchPopup = function(launchObj){
	
	var options = (launchObj["options"]) ? launchObj["options"] : {};

	$('#'+launchObj.popupId).modal(options);

	if (launchObj.onShow) {
		$('#'+launchObj.popupId).on('shown.bs.modal', function(){
			launchObj["onShow"]()});
  	}

 	if (launchObj.onHide) {
		$('#'+launchObj.popupId).on('hide.bs.modal', function(){
			launchObj["onHide"]()});
  	}
}