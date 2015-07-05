function Loader(){

}

//-------------------------------------------------------------------------------------------------------------
//                                     			INIT LOADER
//-------------------------------------------------------------------------------------------------------------

Loader.prototype.initLoader = function(){
														
	var bodyHTML = '<div><img src="img/loader.png" id="loaderImg" style="width:30%; display:block" class="centerItem"></div>';

	_popupManager.makeSimplePopup({popupId:"loaderPop", bodyId:"loaderBody", body:bodyHTML,
		popCont:"loaderCont", custFrameClass:"loaderFrame", custContClass:"centerItem", closeBtn:null});

	_popupManager.launchPopup({popupId:"loaderPop", options:null, onShow:null, 
		onHide:function(){$("#loaderPop").remove();}});
}