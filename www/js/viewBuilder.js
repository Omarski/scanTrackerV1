
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
}

//-------------------------------------------------------------------------------------------------------------
//                                          ADD NAV
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.addNav = function(){
  
  var mainContainersColl = [".scanBtns","#scanInFormCont","#addClientFormCont","#customerLookupFormCont","#invDataCont","#custDataCont","#barcodeGenCont","#alertsCont"];
  var navBtnColl = ["#navScanBtn","#navCustomersBtn","#ordersBtn"];

  var html = "<div class='btn-group btn-group-justified btn-group-lg' role='group' aria-label=''>"+
                "<div class='btn-group' role='group'>"+
                "<button type='button' class='btn btn-default' id='navScanBtn'><span class='glyphicon glyphicon-barcode'></span><span class='navBtn'>Scan Item</span></button>"+
                "</div>"+
                "<div class='btn-group' role='group'>"+
                    "<button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' id='navCustomersBtn'><span class='glyphicon glyphicon-user'></span><span class='navBtn'>Customers</span></span></button>"+
                    "<ul class='dropdown-menu'>"+
                      "<li><a href='#' id='navCustomerAddBtn' class='submenu'>Add Customer</a></li>"+
                      "<li><a href='#' id='navCustomerLookupBtn' class='submenu'>Lookup Customer</a></li>"+
                      "<li><a href='#' id='navCheckLogsBtn' class='submenu'>All customer orders</a></li>"+
                    "</ul>"+
                "</div>"+
                "<div class='btn-group' role='group'>"+
                "<button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' id='ordersBtn'><span class='glyphicon glyphicon-shopping-cart'></span><span class='navBtn'>Orders</span></button>"+
                 "<ul class='dropdown-menu'>"+
                    "<li><a href='#' id='navPrintBarcodeBtn'>Print barcode</a></li>"+
                    // "<li><a href='#' id='navTakeOrderBtn'>New order</a></li>"+
                    "</ul>"+
                "</div>"+
              "</div>";

    $("#navBtnsCont").html(html);

    // listeners
    $("#navScanBtn, #navCustomerAddBtn, #navCustomerLookupBtn, #navCheckLogsBtn, #navPrintBarcodeBtn").click(function(){ //, #navTakeOrderBtn
        
        var btnPressed = $(this);
        for (var i=0; i < mainContainersColl.length; i++){ $(mainContainersColl[i]).hide();};

        //if ($("#logTableBodyCont").children()) $("#logTableBodyCont").children().remove();

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
             _viewBuilder.addLogView("#invDataCont");
             _viewBuilder.displayInvData(_dbJSON);
             $("#navCustomersBtn").addClass("active");
            $("#invDataCont").slideDown(1000);
          break;

           case "navPrintBarcodeBtn" :
             _barCodeGenerator.generate();
             $("#ordersBtn").addClass("active");
             $("#barcodeGenCont").slideDown(1000);
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
                    "<button type='button' id='scanInBtn' class='btn btn-success centerItem lrgScanBtn'><span class='glyphicon glyphicon-barcode largeBars'></span><span class='allBtn'>Scan in</span></button>"+
                "</div>"+
                "<div class='col-xs-12'>"+
                     "<button type='button' id='scanOutBtn' class='btn btn-primary centerItem lrgScanBtn'><span class='glyphicon glyphicon-barcode largeBars'></span><span class='allBtn'>Scan out</span></button>"+
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

                          "<div class='row'>"+//instructions
                              "<div class='col-xs-12 form-group'>"+
                                   "<input class='form-control' id='inputBarcode' placeholder='Barcode' style='display:none'>"+
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

    if (_platform == "desktop") $("#inputBarcode").show();

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
         
         var coll;

         if (_platform == "mobile"){
            coll =[{inputCont:$("#scanInClientId"), message:"Enter customer ID", style:null,
                  check:{valid:["Customer ID","", null], inputType:"text", checkType:null, range:null}}];
         }else{
            coll =[{inputCont:$("#scanInClientId"), message:"Enter customer ID", style:null,
                  check:{valid:["Customer ID","", null], inputType:"text", checkType:null, range:null}},
                  {inputCont:$("#inputBarcode"), message:"Use scanner to input barcode", style:null,
                  check:{valid:["Barcode","", null], inputType:"text", checkType:null, range:null}}];
         }
                  
          _validate.test({collection:coll,

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
                    "<button type='button' class='btn btn-success' id='addClientBtn'><span class='allBtn'>Add client</span></button>"+
     			          "<button type='button' class='btn btn-primary' style='margin-left:3%'id='addClientClearBtn'><span class='allBtn'>Clear</span></button>"+
                    "<button type='button' class='btn btn-warning' style='margin-left:3%' id='cancelAddClientBtn'><span class='allBtn'>Cancel</span></button>"+
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
  
  //if ($("#customerLookupFormCont").children()) $("#customerLookupFormCont").children().remove();
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
                    "<button type='button' class='btn btn-success' id='clientLookupBtn'><span class='allBtn'>Lookup</span></button>"+
                    "<button type='button' class='btn btn-primary' style='margin-left:3%' id='clientLookupClearBtn'><span class='allBtn'>Clear</span></button>"+
                    "<button type='button' class='btn btn-warning' style='margin-left:3%' id='cancelLookupBtn'><span class='allBtn'>Cancel</span></button>"+
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
                    _communicator.findClient("byId",$("#lookupByCustomerId").val(),function(){_viewBuilder.displayCustData()},
                    function(){_viewBuilder.alerts({icon:"glyphicon glyphicon-warning-sign orange", message:"No match was found."})});
                }
      
                }); //validate steps
            
            }else {
                 _validate.test({collection:[
                 {inputCont:$("#lookupByCustomerName"), message:"Enter company name", style:null,
                 check:{valid:["Company name","",null], inputType:"text", checkType:null, range:null}}
                 ], 

                  onPass:function(){ 
                     _communicator.findClient("byName",$("#lookupByCustomerName").val(),function(){_viewBuilder.displayCustData()},
                     function(){_viewBuilder.alerts({icon:"glyphicon glyphicon-warning-sign orange", message:"No match was found."})});
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
//                                                DISPLAY CUSTOMER DATA
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.displayCustData = function(){

  _viewBuilder.alerts({icon:"glyphicon glyphicon-ok green", message:"Found match."});
  $("#customerLookupFormCont").hide();
  this.addLogView("#custDataCont");
  this.displayCustomerData(_companyJSON);
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
ViewBuilder.prototype.addLogView = function(contId){


  if ($(contId).children()) $(contId).children().remove();
  var tableBodyCont = (contId.indexOf("cust") == -1)? "bodyForInvData" : "bodyForCustData";
  html = "<div class='col-xs-12 no-padding'>"+
            "<div class='table-responsive' style='overflow:auto'>"+
              "<table class='table table-striped table-hover'>"+
                "<thead>"+
                 "<tr><th style='width:10%'>Customer ID</th><th style='width:20%'>Business name</th><th style='width:20%'>Items list</th><th style='width:20%'>Scan in date</th><th style='width:10%'>Scan out</th><th style='width:20%'>Instructions</th></tr>"+
                "</thead>"+
                "<tbody id='" + tableBodyCont+ "'>"+
                "</tbody>"+
              "</table>"+
            "</div>"+
          "</div>";

    $(contId).html(html);
}

//-------------------------------------------------------------------------------------------------------------
//                                                DISPLAY TRANSACTIONS
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.displayInvData = function(dbJSON){

  var tbodyHTML="";
  
  if (Object.keys(dbJSON)) var jsonLength = Object.keys(dbJSON).length;
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
                  "</td><td>"+orderObj.instructions+
                  "</td></tr>";
     }
    
  }); 

  $("#bodyForInvData").html(tbodyHTML);
}

//-------------------------------------------------------------------------------------------------------------
//                                                DISPLAY Company TRANSACTIONS
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.displayCustomerData = function(dbJSON){

   var tbodyHTML="";

   if (Object.keys(dbJSON)) var jsonLength = Object.keys(dbJSON).length;

   $.each(dbJSON, function(key,orderObj){
   
      var itemsToText="";
      
      if (orderObj.items) $.each(orderObj.items, function(itemKey,itemObj){
        itemsToText+= "Item: " + itemObj.itemId + " Units: " + itemObj.units + "<br>";
      });

      tbodyHTML+= "<tr><td>"+orderObj.companyId+
                  "</td><td>"+orderObj.companyName+ 
                  "</td><td>"+itemsToText+ 
                  "</td><td>"+orderObj.scanInDate+
                  "</td><td>"+orderObj.scanOutDate+
                  "</td><td>"+orderObj.instructions+
                  "</td></tr>";    
  });


  $("#bodyForCustData").html(tbodyHTML);
  $("#custDataCont").slideDown(1000);
   if (jsonLength > 0) {
    $("#customerLookupFormCont").fadeOut(300);
  }else{
      _viewBuilder.alerts({icon:"glyphicon glyphicon-warning-sign orange", message:"No records were found."});
  }
}

//-------------------------------------------------------------------------------------------------------------
//                                                NAME FROM ID
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.nameFromId = function(id){

  return _idNamePairs[id.toString()];
}

//-------------------------------------------------------------------------------------------------------------
//                                                DISPLAY ALERTS
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.alerts = function(alertObj){
  alertHTML = "<div class='alerts'><span class='" + alertObj.icon + "'></span>&nbsp;&nbsp;<p class='alertText'>"+alertObj.message+"</p></div>";
  if ($("#alertsCont").children()) $("#alertsCont").children().remove();
  $("#alertsCont").html(alertHTML).show();

}