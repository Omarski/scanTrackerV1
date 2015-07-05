function Buttons(){

}

//-------------------------------------------------------------------------------------------------------------
//                                     			LISTEN
//-------------------------------------------------------------------------------------------------------------
Buttons.prototype.listen = function(btnObj){

	$(btnObj.id).mouseover(function(){
		$(this).attr("src",btnObj.over);
	});

	$(btnObj.id).mouseout(function(){
		$(this).attr("src",btnObj.out);
	});

	if (btnObj.onclick) $(btnObj.id).click(function(){btnObj.onclick();});
}