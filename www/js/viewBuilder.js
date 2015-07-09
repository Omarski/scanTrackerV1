
function ViewBuilder(){
	
	this.itemCount = 1;

	this.init();
}

//-------------------------------------------------------------------------------------------------------------
//                                     			INIT
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.init = function(){
	
  this.addNav();
	this.addScanButtons();
	this.addScanInInput();
	this.addClientInput();
  this.addClientLookup();
  this.addLogView();
}

//-------------------------------------------------------------------------------------------------------------
//                                          ADD NAV
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.addNav = function(){
  
  var mainContainersColl = [".scanBtns","#scanInFormCont","#addClientFormCont","#customerLookupFormCont","#invDataCont","#alertsCont"];
  var navBtnColl = ["#navScanBtn","#navCustomersBtn","#navCheckLogsBtn"];

  var html = "<div class='btn-group btn-group-justified btn-group-lg' role='group' aria-label=''>"+
                "<div class='btn-group' role='group'>"+
                "<button type='button' class='btn btn-default' id='navScanBtn'><span class='glyphicon glyphicon-barcode'></span><span class='navBtn'>Scan Item</span></button>"+
                "</div>"+
                "<div class='btn-group' role='group'>"+
                  "<button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' id='navCustomersBtn'><span class='glyphicon glyphicon-user'></span><span class='navBtn'>Customers<span class='caret'></span></span></button>"+
                  "<ul class='dropdown-menu'>"+
                  "<li><a href='#' id='navCustomerAddBtn'>Add Customer</a></li>"+
                  "<li><a href='#' id='navCustomerLookupBtn'>Lookup Customer</a></li>"+
                  "</ul>"+
                "</div>"+
                "<div class='btn-group' role='group'>"+
                "<button type='button' class='btn btn-default' id='navCheckLogsBtn'><span class='glyphicon glyphicon-cloud-download'></span><span class='navBtn'>Check Logs</span></button>"+
                "</div>"+
              "</div>";

    $("#navBtnsCont").html(html);

    // listeners
    $("#navScanBtn, #navCustomerAddBtn, #navCustomerLookupBtn, #navCheckLogsBtn").click(function(){
        
        var btnPressed = $(this);
        for (var i=0; i < mainContainersColl.length; i++){ 

           $(mainContainersColl[i]).hide();

         };

        for (var b=0; b < navBtnColl.length; b++){ $(navBtnColl[b]).removeClass("active");}

        $(this).addClass("active");

        switch($(this).attr("id")){

          case "navScanBtn" :
            $(".scanBtns").slideDown(700);
          break;

          case "navCustomerAddBtn" :
            $("#addClientFormCont").slideDown(1000);
            $("#navCustomersBtn").addClass("active");
          break;

           case "navCustomerLookupBtn" :
            $("#customerLookupFormCont").slideDown(1000);
            $("#navCustomersBtn").addClass("active");
          break;

          case "navCheckLogsBtn" :
            $("#invDataCont").slideDown(1000);
          break;

        }
    });

    $("#navScanBtn").addClass("active");
}

//-------------------------------------------------------------------------------------------------------------
//                                     			ADD SCAN BTNS
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.addScanButtons = function(){
	
  var html =  "<div class='row'>"+
                "<div class='col-xs-12'>"+
                    "<button type='button' id='scanInBtn' class='btn btn-primary centerItem lrgScanBtn'><span class='glyphicon glyphicon-barcode'></span><span class='allBtn'>Scan in</span></button>"+
                "</div>"+
                "<div class='col-xs-12'>"+
                     "<button type='button' id='scanOutBtn' class='btn btn-primary centerItem lrgScanBtn'><span class='glyphicon glyphicon-barcode'></span><span class='allBtn'>Scan out</span></button>"+
                "</div>"+
            "</div>";

    $(".scanBtns").html(html);

}

//-------------------------------------------------------------------------------------------------------------
//                                     			ADD SCAN IN INPUT
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.addScanInInput = function(){
	
	if ($("#scanInFormCont").children()) $("#scanInFormCont").children().remove();
	
	var html = "<div class='col-xs-12'>"+
                     "<form id='scanInForm'>"+
                         "<div class='row'>"+
                              "<div class='col-xs-12'>"+
                                   "<div class='form-group'>"+
                                        "<input type='text' class='form-control' placeholder='Customer ID' id='scanInClientId'>"+
                                   "</div>"+
                              "</div>"+
                         "</div>"+

                         "<div class='row' id='itemsGroup'>"+
                            "<div id='item1'>"+
                              "<div class='col-xs-7'>"+
                                    "<div class='form-group'>"+
                                         "<input type='text' class='form-control' placeholder='Item ID/description' name='boxItem' id='inpItem1'>"+
                                    "</div>"+  
                              "</div>"+   
                               "<div class='col-xs-3'>"+
                                 "<div class='form-group'>"+
                                      "<input type='number' class='form-control' placeholder='Units' value=1 name='boxItemQuantity' id='itemQuan1'>"+
                                  "</div>"+
                              "</div>"+
                              "<div class='col-xs-2'>"+
                                 "<button type='button' class='btn btn-warning' style='float:right' name='deleteItemBtn' id='inpItemDel1'><span class='glyphicon glyphicon-remove'></span></button>"+
                              "</div>"+
                            "</div>"+ //item1

                          "</div>"+ //row-itemsGroup   
                          
                          "<div class='row'>"+//instructions
                              "<div class='col-xs-12 form-group'>"+
                                   "<textarea class='form-control' rows='2' id='inputInstructions' placeholder='Special instructions'></textarea>"+
                              "</div>"+
                         "</div>"+
                         
                         "<p>"+
                              "<button type='button' class='btn btn-primary' id='addItemBtn'><span class='glyphicon glyphicon-plus'></span><span class='allBtn'>Add Item</span></button>"+
          		           "</p>"+
                         "<p>"+
                              "<button type='button' class='btn btn-success' id='executeScanInBtn'><span class='glyphicon glyphicon-barcode'></span><span class='allBtn'>Scan Container</span></button>"+
                              "<button type='button' class='btn btn-warning' style='margin-left:6%' id='cancelScanInBtn'><span class='glyphicon glyphicon-remove'></span><span class='allBtn'>Cancel Scan</span></button>"+
                        "</p>"+
                    "</form>"+
               "</div>";

    $("#scanInFormCont").html(html);

    this.scanInListeners();
}

//-------------------------------------------------------------------------------------------------------------
//                                     			SCAN IN LISTENERS
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.scanInListeners = function(){

	// add item               
	$("#addItemBtn").click(function(){

    _viewBuilder.itemCount++;
    
    var itemHTML = "<div id='item"+_viewBuilder.itemCount+"'>"+
                      "<div class='col-xs-7'>"+
                        "<div class='form-group'>"+
                             "<input type='text' class='form-control' placeholder='Item ID/description' name='boxItem' id='inpItem"+_viewBuilder.itemCount+"'>"+
                        "</div>"+  
                      "</div>"+   
                      "<div class='col-xs-3'>"+
                         "<div class='form-group'>"+
                              "<input type='number' class='form-control' placeholder='Units' value=1 name='boxItemQuantity' id='itemQuan"+_viewBuilder.itemCount+"'>"+
                          "</div>"+
                      "</div>"+
                      "<div class='col-xs-2'>"+
                         "<button type='button' class='btn btn-warning' style='float:right' name='deleteItemBtn' id='inpItemDel"+_viewBuilder.itemCount+"'><span class='glyphicon glyphicon-remove'></span></button>"+
                      "</div>"+
                  "</div>";

		$("#itemsGroup").append(itemHTML);

    _viewBuilder.itemDeleteListener("#inpItemDel"+_viewBuilder.itemCount);

	});

  this.itemDeleteListener("#inpItemDel1");

  //sumbit scan info
   $("#executeScanInBtn").click(function(){
         
          _validate.test({collection:[
                
                {inputCont:$("#scanInClientId"), message:"Enter customer ID", style:null,
                check:{valid:["Customer ID","", null], inputType:"text", checkType:null, range:null}}
                ], 

                onPass:function(){ 

                    var itemVarColl = [];
                    $("#itemsGroup input[id^='inpItem']").each(function(i,item){
                      itemVarColl.push({inputCont:$(item), message:"Enter item ID", style:null,
                      check:{valid:["Item ID","", null], inputType:"text", checkType:null, range:null}});
                    });

                       _validate.test({collection:itemVarColl, onPass:function(){ 
                       
                          _scanner.scanIn();

                      }});
                }
      
                }); //validate steps
          });

	// delete scan
	$("#cancelScanInBtn").click(function(){
		  $("#scanInFormCont").fadeOut(300,function(){_viewBuilder.addScanInInput()});
      $("#navScanBtn").removeClass("active");
	});
}	 


//-------------------------------------------------------------------------------------------------------------
//                                          NEW ITEM LISTENER
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.itemDeleteListener = function(deleteBtnId){

  // remove item
  $(deleteBtnId).click(function(){
    var itemNumber = deleteBtnId.substring(deleteBtnId.length -1);
    $("#item"+itemNumber).fadeOut(200,function(){$("#item"+itemNumber).remove();});
    _viewBuilder.itemCount--;
  });
}

//-------------------------------------------------------------------------------------------------------------
//                                          FORMAT ITEMS
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.formatItems = function(){

  var itemsColl = {};
  $("#itemsGroup div[id^='item']").each(function(i,item){
    itemsColl["item"+i] = {itemId:$(item).find("[id^='inpItem']").val(),units:$(item).find("[id^='itemQuan']").val()};
  });

  alert(itemsColl);
  //return itemsColl;
  return JSON.stringify(itemsColl);
}

//-------------------------------------------------------------------------------------------------------------
//                                     			ADD SCAN IN INPUT
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.addClientInput = function(){
	
	if ($("#addClientFormCont").children()) $("#addClientFormCont").children().remove();
	var html = "<form id='clientForm' style=''>"+
          
           "<div class='col-xs-12'>"+

               "<div class='row'>"+
                    "<div class='col-xs-12 form-group'>"+
                         "<label for='inputBusinessName'>Business name <span class='requiredField'> *</span></label>"+
                         "<input type='text' class='form-control' placeholder='Business name' id='inputBusinessName'>"+
                    "</div>"+
               "</div>"+

               "<div class='row'>"+
                    "<div class='col-xs-6'>"+
                         "<div class='form-group'>"+
                              "<label for='inputFirstName'>Contact first name <span class='requiredField'> *</span></label>"+
                              "<input type='text' class='form-control' placeholder='First name' id='inputFirstName'>"+
                         "</div>"+
                    "</div>"+

                    "<div class='col-xs-6'>"+
                         "<div class='form-group'>"+
                              "<label for='inputLastName'>Contact last name <span class='requiredField'> *</span></label>"+
                              "<input type='text' class='form-control' placeholder='Last name' id='inputLastName'>"+
                         "</div>"+
                    "</div>"+
               "</div>"+

               "<div class='row'>"+
                    "<div class='col-xs-6'>"+
                         "<div class='form-group'>"+
                              "<label for='inputPhoneNum'>Phone number<span class='requiredField'> *</span></label>"+
                              "<input type='text' class='form-control' placeholder='Phone number' id='inputPhoneNum'>"+
                         "</div>"+
                    "</div>"+

                    "<div class='col-xs-6'>"+
                         "<div class='form-group'>"+
                              "<label for='inputAltPhoneNum'>Alternative number</label>"+
                              "<input type='text' class='form-control' placeholder='Alternative number' id='inputAltPhoneNum'>"+
                         "</div>"+
                    "</div>"+
               "</div>"+

               "<div class='row'>"+
                    "<div class='col-xs-12 form-group'>"+
                         "<label for='inputEmail'>Email</label>"+
                         "<input type='email' class='form-control' placeholder='Email' id='inputEmail'>"+
                    "</div>"+
               "</div>"+

               "<div class='row'>"+
                    "<div class='col-xs-12 form-group'>"+
                         "<label for='inputAddress'>Address</label>"+
                         "<textarea class='form-control' rows='4' id='inputAddress'></textarea>"+
                    "</div>"+
               "</div>"+

               "<p id='clientAddBtns'>"+
                    "<button type='button' class='btn btn-success' id='addClientBtn'>Add client</button>"+
     			           "<button type='button' class='btn btn-primary' style='margin-left:3%'id='addClientClearBtn'>Clear</button>"+
                    "<button type='button' class='btn btn-warning' style='margin-left:3%' id='cancelAddClientBtn'>Cancel</button>"+
			         "</p>"+
          "</div>";


    $("#addClientFormCont").html(html);

    //listeners
    $("#addClientBtn").click(function(){
         
          _validate.test({collection:[
                {inputCont:$("#inputBusinessName"), message:"Enter business name", style:null,
                check:{valid:["Business name","", null], inputType:"text", checkType:null, range:null}},
                 {inputCont:$("#inputFirstName"), message:"Enter first name", style:null,
                check:{valid:["First name","", null], inputType:"text", checkType:null, range:null}},
                 {inputCont:$("#inputLastName"), message:"Enter last name", style:null,
                check:{valid:["Last name","", null], inputType:"text", checkType:null, range:null}}, 
                 {inputCont:$("#inputPhoneNum"), message:"Enter phone number", style:null,
                check:{valid:["Phone number","", null], inputType:"text", checkType:null, range:null}}
                ], 

                onPass:function(){ 
                    _communicator.addClient({businessName:$("#inputBusinessName").val(), 
                      firstName:$("#inputFirstName").val(), lastName:$("#inputLastName").val(),
                      phone1:$("#inputPhoneNum").val(), phone2:$("#inputAltPhoneNum").val(), 
                      email:$("#inputEmail").val(), address:$("#inputAddress").val()},
                      
                      function(){
                         _viewBuilder.alerts({icon:"glyphicon glyphicon-ok green", message:"New customer successfully added."});
                         $("#addClientFormCont").fadeOut(300);
                    },
                       function(){
                         _viewBuilder.alerts({icon:"glyphicon glyphicon-warning-sign orange", message:"Company name already exists."});
                    }

                    );//add client
                }
      
          }); //validate steps
     });//click

    $("#addClientClearBtn").click(function(){
          _viewBuilder.clearForm("#clientForm");
     });

     $("#cancelAddClientBtn").click(function(){
            $("#addClientFormCont").fadeOut(300);
            $("#navCustomersBtn").removeClass("active");
     });
}

//-------------------------------------------------------------------------------------------------------------
//                                                NEW CLIENT LISTENERS
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.clientAddListeners = function(){

     var requiredFieldIds = ["#inputBusinessName","#inputFirstName","#inputLastName","#inputPhoneNum"];

     // add item               
     $("#addClientBtn").click(function(){
          var missingFields = false;
          for (var i=0; i < requiredFieldIds.length; i++){
               if ($(requiredFieldIds).val() == "" || $(requiredFieldIds).val() == undefined) missingFields = true;
          }

          if (missingFields) {
               $("#clientAddBtns").append("<p class='formWarning'>* PLease fill out all required fields.</p>");
          }else{
               var data = {businessName:$("#inputBusinessName").val(),
                           firstName:$("#inputFirstName").val(),
                           lastName:$("#inputFirstName").val(),
                           phone1:$("#inputPhoneNum").val(),
                           phone2:$("#inputAltPhoneNum").val(),
                           email:$("#inputEmail").val(),
                           address:$("#inputAddress").val()
                         };

               _communicator.addClient(data,function(){
                    _viewBuilder.alerts("customerAdded");
                    _viewBuilder.addClientInput();
               });
          } 
     });

     // delete client add
     $("#cancelAddClientBtn").click(function(){
          _viewBuilder.addClientInput();
     });
}

//-------------------------------------------------------------------------------------------------------------
//                                          ADD SCAN IN INPUT
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.addClientLookup = function(){
  
  if ($("#customerLookupFormCont").children()) $("#customerLookupFormCont").children().remove();
  var html = "<form id='clientLookupForm'>"+
          
           "<div class='col-xs-12'>"+
               "<div class='row'>"+
                    "<div class='col-xs-12 col-sm-6'>"+
                      "<form class='form-inline'>"+
                        "<div class='radio'><label><input type='radio' value='byId' id='byIdRadio' name='companyLookupRad' checked='checked'><span class='formLabels'>Lookup by ID</span></label></div>"+
                         "<div class='form-group'>"+
                              "<input type='text' class='form-control' placeholder='Company ID' id='lookupByCustomerId'>"+
                         "</div>"+
                    "</div>"+

                    "<div class='col-xs-12 col-sm-6'>"+
                       "<form class='form-inline'>"+
                         "<div class='form-group'>"+
                               "<div class='radio'><label><input type='radio' value='byName' id='byNameRadio' name='companyLookupRad'><span class='formLabels'>Lookup by company name</span></label></div>"+
                              "<input type='text' class='form-control' placeholder='Company name' id='lookupByCustomerName'>"+
                         "</div>"+
                    "</div>"+
               "</div>"+

               "<p id='clientLookupBtns'>"+
                    "<button type='button' class='btn btn-success' id='clientLookupBtn'>Lookup</button>"+
                    "<button type='button' class='btn btn-primary' style='margin-left:3%'id='clientLookupClearBtn'>Clear</button>"+
                    "<button type='button' class='btn btn-warning' style='margin-left:3%' id='cancelLookupBtn'>Cancel</button>"+
               "</p>"+
          "</div>";


    $("#customerLookupFormCont").html(html);

       //listeners

       $("#lookupByCustomerId, #lookupByCustomerName").focus(function(){
          ($(this).attr("id").indexOf("Name") != -1) ? $("#byNameRadio").prop("checked",true):$("#byIdRadio").prop("checked",true)
       });

       $("#clientLookupBtn").click(function(){

            var selected = $("input[type='radio'][name='companyLookupRad']:checked");
            
            if (selected.length > 0) {
                var selectedVal = selected.val();
            }

            if (selectedVal == "byId") {
                _validate.test({collection:[
                {inputCont:$("#lookupByCustomerId"), message:"Enter company ID", style:null,
                check:{valid:["Company ID","", null], inputType:"text", checkType:null, range:null}}
                ], 

                onPass:function(){
                    _communicator.findClient("byId",$("#lookupByCustomerId").val(),function(){});
                }
      
                }); //validate steps
            
            }else {
                 _validate.test({collection:[
                 {inputCont:$("#lookupByCustomerName"), message:"Enter company name", style:null,
                 check:{valid:["Company name","",null], inputType:"text", checkType:null, range:null}}
                 ], 

                  onPass:function(){ 
                     _communicator.findClient("byName",$("#lookupByCustomerName").val(),function(){});
                  }
      
                }); //validate steps
            }
        });

         $("#cancelLookupBtn").click(function(){
            $("#customerLookupFormCont").fadeOut(300);
            $("#navCustomersBtn").removeClass("active");
         });

         $("#clientLookupClearBtn").click(function(){
           _viewBuilder.clearForm("#clientLookupForm");
         });
  }

//-------------------------------------------------------------------------------------------------------------
//                                                CLEAR FORM
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.clearForm = function(formId){
  $(formId + " input[type='text']").val("");
  if ($(formId + " input[type='number']").length > 0) $(formId + " input[type='text']").val(1);
}

//-------------------------------------------------------------------------------------------------------------
//                                                ADD LOG VIEW
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.addLogView = function(){

  html = "<div class='col-xs-12'>"+
            "<div class=''>"+
              "<table class='table table-striped table-hover'>"+
                "<thead>"+
                  "<tr><th style='width:10%'>Cust.<br>ID</th><th style='width:20%'>Bu.<br>name</th><th style='width:40%'>Items<br>list</th><th style='width:20%'>Scan in<br>date</th><th style='width:10%'>Scan<br>out</th></tr>"+
                "</thead>"+
                "<tbody id='logTableBodyCont'>"+
                "</tbody>"+
              "</table>"+
            "</div>"+
          "</div>";

    $("#invDataCont").html(html);
}

//-------------------------------------------------------------------------------------------------------------
//                                                DISPLAY TRANSACTIONS
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.displayInvData = function(dbJSON){
  
  var tbodyHTML="";
  
  var jsonLength = Object.keys(dbJSON).length;
  var counter=1;

  $.each(dbJSON, function(key,orderObj){
   
    if (counter < jsonLength){ //skip last json item (pairs)
        
        counter++;
        var itemsToText="";
      
      $.each(orderObj.items, function(itemKey,itemObj){
        itemsToText+= "Item: " + itemObj.itemId + " Units: " + itemObj.units + "<br>";
      });

      tbodyHTML+= "<tr><td>"+orderObj.customerId+
                  "</td><td>"+_viewBuilder.nameFromId(orderObj.customerId)+ 
                  "</td><td>"+itemsToText+ 
                  "</td><td>"+orderObj.scanInDate+
                  "</td><td>"+orderObj.scanOutDate+
                  "</td></tr>";
     }
    
  });  
    
  $("#logTableBodyCont").html(tbodyHTML);
}

//-------------------------------------------------------------------------------------------------------------
//                                                NAME FROM ID
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.nameFromId = function(id){

  return _idNamePairs[id.toString()];
}

//-------------------------------------------------------------------------------------------------------------
//                                                DISPLAY TRANSACTIONS
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.alerts = function(alertObj){
  alertHTML = "<div class='alerts'><span class='" + alertObj.icon + "'></span>&nbsp;&nbsp;<p class='alertText'>"+alertObj.message+"</p></div>";
  if ($("#alertsCont").children()) $("#alertsCont").children().remove();
  $("#alertsCont").html(alertHTML).show();

}

  // aValidate.test({collection:[
  //     {inputCont:$("#goalGroupSelector"), message:"Select a circle", style:{left:'40px', top:'445px'},
  //     check:{valid:["Select a circle to support your goal","", null], inputType:"select", checkType:null, range:null}},
  //     {inputCont:$("#goalPopTitleInput"), message:"Enter a goal title", style:{left:'150px', top:'90px'},
  //     check:{valid:[""], inputType:"text", checkType:null, range:null}},
  //     {inputCont:$("#goalPopStatementInput"), message:"Describe goal", style:{left:'150px', top:'170px'},
  //     check:{valid:[""], inputType:"text", checkType:null, range:null}},
  //     {inputCont:$("#goalPopStepsInput"), style:{left:'10px', top:'515px'},
  //     check:{valid:["","00"], inputType:"number", checkType:"number", range:null}},
  //     ], 

  //     onPass:function(){
        
  //       $(".goalPopSubheadCont, .goalPopBodyCont").children().remove();
  
  //       //get page 2 Subhead
  //       aGoalAddPopManager.addHtml({template:"stepsSurveySubhead", cont:".goalPopSubheadCont", addAs:"html"});
  
  //       //survey
  //       aGoalAddPopManager.addHtml({template:"stepsSurveyBody", cont:".goalPopBodyCont", addAs:"html"});
  
  //       //clear vav block
  //       $(".goalPopNavCont").children().remove();
  //       aGoalAddPopManager.addHtml({template:"backCreateButtons", cont:".goalPopNavCont", addAs:"html"});
  //     }
      
  //     }); //validate steps
