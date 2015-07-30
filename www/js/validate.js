function Validate(){
	
}

//-------------------------------------------------------------------------------------------------------------
//                                     			TEST VALIDATE
//-------------------------------------------------------------------------------------------------------------
Validate.prototype.test = function(data){
	
	var inputCont = data.inputCont;
	var violationColl = [];
	
		if ( $("[id^='error']").length > 0) $("[id^='error']").remove();

		//each input field
		for (var i = 0 ; i < data.collection.length ; i++){
			
			var style = (data.collection[i].style) ? data.collection[i].style : null;
			var message = (data.collection[i].message) ? data.collection[i].message : "Enter valid value"; 
			var testedVal = $(data.collection[i].inputCont).val();
			
			if (data.collection[i].check.valid != null){
				
				//for each valid cat type "", undefined...
				for (var v = 0 ; v < data.collection[i].check.valid.length ; v++){
					
					//item test for empty, null or undefined
					var spaced = jQuery.trim( testedVal );
					//console.log("valid type: " + data.collection[i].check.valid[v] + "   testedVal: " + spaced);
					if (spaced == data.collection[i].check.valid[v]){
						violationColl.push({violator:$(data.collection[i].inputCont), inputType:data.collection[i].inputType, 
						errorText:message, style:style});
					}
				}
			}//valid
			
			if (data.collection[i].check.checkType != null){
				
				//console.log("type: " + data.collection[i].check.checkType + "   actual type is number: " + $.isNumeric(testedVal));
				if (data.collection[i].check.checkType == "number" && $.isNumeric(testedVal) == false) {
					violationColl.push({violator:$(data.collection[i].inputCont), inputType:data.collection[i].inputType, 
					errorText:"Enter a number", style:style});
				}else if (data.collection[i].check.checkType == "email" && !validateEmail(testedVal)){
					violationColl.push({violator:$(data.collection[i].inputCont), inputType:data.collection[i].inputType, 
					errorText:"Enter a valid email", style:style});
				}else if (data.collection[i].check.checkType == "date" && !this.validateDate(testedVal)){
					violationColl.push({violator:$(data.collection[i].inputCont), inputType:data.collection[i].inputType, 
					errorText:"Enter a valid date", style:style});
				}
				
			}//type
			
			if (data.collection[i].check.range != null){
				
				//console.log("Entry: " + testedVal + "   ranges: " + data.collection[i].check.range.mini + " to " + 
				//data.collection[i].check.range.maxi);
				if (testedVal){
					if (parseFloat(testedVal) > data.collection[i].check.range.maxi || parseFloat(testedVal) < data.collection[i].check.range.mini) {
						violationColl.push({violator:$(data.collection[i].inputCont), inputType:data.collection[i].inputType, 
						errorText:"Value between "+ data.collection[i].check.range.mini + " and "+ data.collection[i].check.range.maxi, style:style});
					}
				}
				
			}//range
			
			  //minimum value -- LemonByte add
            if (data.collection[i].check.minimum != null){
                //console.log("Entry: " + testedVal + "   minimum value: " + data.collection[i].check.minimum);
                if (testedVal){
                    if (parseFloat(testedVal) < data.collection[i].check.minimum) {
                        violationColl.push({violator:$(data.collection[i].inputCont), inputType:data.collection[i].inputType,
                            errorText:"Minimum value "+ data.collection[i].check.minimum, style:style});
                    }
                }
            }
            //minimum value -- LemonByte //

            //maximum value -- LemonByte add
            if (data.collection[i].check.maximum != null){
                //console.log("Entry: " + testedVal + "   maximum value: " + data.collection[i].check.maximum);
                if (testedVal){
                    if (parseFloat(testedVal) > data.collection[i].check.maximum) {
                        violationColl.push({violator:$(data.collection[i].inputCont), inputType:data.collection[i].inputType,
                            errorText:"Maximum value "+ data.collection[i].check.maximum, style:style});
                    }
                }
            }
            //maximum value -- LemonByte //
			
		}//collectoin i
		
		//clear multi violations
		var violatorIdColl = [];
		var filteredViolatorColl = [];
		$.each(violationColl, function( index, object ) {
		  if (violatorIdColl.indexOf($(object.violator).attr("id")) == -1){
			  violatorIdColl.push($(object.violator).attr("id"));
			  filteredViolatorColl.push(object);
		  } 
		});
					
			for (var x=0; x < filteredViolatorColl.length ; x++) {
			
				var alertBubbleHtml = "<div id='error"+$(filteredViolatorColl[x].violator).attr("id") +
				"'><div style='font-size:12px margin-left:10px; color:#F00; margin-top:auto; margin-bottom:auto'>" +
				filteredViolatorColl[x].errorText + "</div></div>";
				$(filteredViolatorColl[x].violator).after(alertBubbleHtml);
				
				if (filteredViolatorColl[x].style){ 
				$("#error"+$(filteredViolatorColl[x].violator).attr("id")).css(filteredViolatorColl[x].style);
				}
				
				$(filteredViolatorColl[x].violator).focus(function(){$("#error"+$(this).attr("id")).remove();});
				$("#error"+$(filteredViolatorColl[x].violator).attr("id")).focus(function(){$(this).remove();});
				
				// console.log("**** found violation : " + violationColl[x].errorText);
			}
		
		
		if (violationColl.length == 0) {
			data["onPass"]();
		}
	
}

//-------------------------------------------------------------------------------------------------------------
//                                     			DATE VALIDATE
//-------------------------------------------------------------------------------------------------------------

Validate.prototype.validateDate = function(dtValue){
var dtRegex = new RegExp(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{4}\b/);
return dtRegex.test(justDate(dtValue));
}

//-------------------------------------------------------------------------------------------------------------
//                                     			NUMBER LIMIT RANGE
//-------------------------------------------------------------------------------------------------------------

Validate.prototype.limitRange = function(inputId, range){
	
	$(inputId).change(function(){
		//alert("change");
		if ($(this).val() > range.maxi) $(this).val(range.maxi);
		else if ($(this).val() < range.mini) $(this).val(range.mini);
	});
}
