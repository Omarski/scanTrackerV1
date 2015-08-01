
function ViewBuilder(){
	
	this.itemCount = 1;
  this.orderItemCount = 1;
  this.ordersListingTableObj = {};
	this.init();
}

//-------------------------------------------------------------------------------------------------------------
//                                     			INIT
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.init = function(){
	
  this.addHomePage();
  this.addNav();
	this.addScanButtons();
	this.addClientInput();
  this.addClientLookup();
}

//-------------------------------------------------------------------------------------------------------------
//                                          ADD NAV
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.addNav = function(){
  
  var mainContainersColl = ["#homeCont","#scanCont","#shipFormCont","#newOrderCont","#addClientFormCont","#customerLookupFormCont","#invDataCont","#custDataCont","#shipDataCont","#barcodeGenCont","#alertsCont"];
  var navBtnColl = ["#navHomeBtn","#navScanBtn","#navCustomersBtn","#navOrdersBtn"];

  var html = "<div class='btn-group btn-group-justified' role='group' aria-label=''>"+

                "<div class='btn-group' role='group'>"+
                "<button type='button' class='btn btn-default' id='navHomeBtn'><span class='glyphicon glyphicon-home'></span><span class='navBtn'>Home</span></button>"+
                "</div>"+

                "<div class='btn-group' role='group'>"+
                "<button type='button' class='btn btn-default' id='navScanBtn'><span class='glyphicon glyphicon-barcode'></span><span class='navBtn'>Scan</span></button>"+
                "</div>"+
                "<div class='btn-group' role='group'>"+
                    "<button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' id='navCustomersBtn'><span class='glyphicon glyphicon-user'></span><span class='navBtn'>Cust.</span></span></button>"+
                    "<ul class='dropdown-menu'>"+
                      "<li><a href='#' id='navCustomerAddBtn' class='submenu'>Add Customer</a></li>"+
                      "<li><a href='#' id='navCustomerLookupBtn' class='submenu'>Lookup Customer</a></li>"+
                    "</ul>"+
                "</div>"+
                "<div class='btn-group' role='group'>"+
                "<button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' id='navOrdersBtn'><span class='glyphicon glyphicon-shopping-cart'></span><span class='navBtn'>Orders</span></button>"+
                 "<ul class='dropdown-menu'>"+
                    "<li><a href='#' id='navTakeOrderBtn'>New order</a></li>"+
                    "<li><a href='#' id='navCheckLogsBtn' class='submenu'>Display all orders</a></li>"+
                    "</ul>"+
                "</div>"+
              "</div>";

    $("#navBtnsCont").html(html);

    // listeners
    $("#navHomeBtn, #homeScanBtn, #navScanBtn, #homeCustomerAddBtn, #navCustomerAddBtn, #homeShipOrderBtn, #homeCustomerLookupBtn, #navCustomerLookupBtn, #homeCheckLogsBtn, #navCheckLogsBtn, #homeTakeOrderBtn, #navTakeOrderBtn").click(function(){ 
        
        var btnPressed = $(this);
        for (var i=0; i < mainContainersColl.length; i++){ $(mainContainersColl[i]).hide();};
        for (var b=0; b < navBtnColl.length; b++){ $(navBtnColl[b]).removeClass("active");}

        $(this).addClass("active");

        switch($(this).attr("id")){

          case "navHomeBtn":
             $("#navHomeBtn").addClass("active");
             $("#homeCont").slideDown(600);
          break;

          case "homeScanBtn" : case "navScanBtn" :
            $("#scanCont").slideDown(700);
          break;

          case "homeCustomerAddBtn" : case "navCustomerAddBtn" :
            $("#addClientFormCont").slideDown(600);
            $("#navCustomersBtn").addClass("active");
          break;

          case "homeCustomerLookupBtn" : case "navCustomerLookupBtn" :
            $("#customerLookupFormCont").slideDown(600);
            $("#navCustomersBtn").addClass("active");
          break;

          case "homeCheckLogsBtn" : case "navCheckLogsBtn" :
             _viewBuilder.addLogView("#invDataCont");
             _viewBuilder.displayOrderLogs(_dbJSON,"#invDataCont");
             $("#navCustomersBtn").addClass("active");
             $("#invDataCont").slideDown(600);
          break;

           case "homeTakeOrderBtn" : case "navTakeOrderBtn" :
             _viewBuilder.addNewOrder();
             $("#navOrdersBtn").addClass("active");
             $("#newOrderCont").slideDown(600);
          break;

           case "homeShipOrderBtn":
             _viewBuilder.fillOrder();
             $("#navOrdersBtn").addClass("active");
          break;

        }
    });

    $("#navHomeBtn").addClass("active");
}

//-------------------------------------------------------------------------------------------------------------
//                                          ADD SCAN BTNS
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.addHomePage = function(){
  

  var html =  "<button type='button' class='btn btn-primary btn-sm btn-block homeBtns' id='homeCustomerAddBtn'><span class='glyphicon glyphicon-home floatLeft'></span><span class='navBtn'>Add a customer</span></button>"+
              "<button type='button' class='btn btn-primary btn-sm btn-block homeBtns' id='homeCustomerLookupBtn'><span class='glyphicon glyphicon-home floatLeft'></span><span class='navBtn'>Search customers</span></button>"+
              "<button type='button' class='btn btn-primary btn-sm btn-block homeBtns' id='homeTakeOrderBtn'><span class='glyphicon glyphicon-home floatLeft'></span><span class='navBtn'>Enter new order</span></button>"+
              "<button type='button' class='btn btn-primary btn-sm btn-block homeBtns' id='homeShipOrderBtn'><span class='glyphicon glyphicon-home floatLeft'></span><span class='navBtn'>Ship order</span></button>"+
              "<button type='button' class='btn btn-primary btn-sm btn-block homeBtns' id='homeCheckLogsBtn'><span class='glyphicon glyphicon-home floatLeft'></span><span class='navBtn'>View all orders</span></button>"+              
              "<button type='button' class='btn btn-primary btn-sm btn-block homeBtns' id='homeScanBtn'><span class='glyphicon glyphicon-home floatLeft'></span><span class='navBtn'>Scan barcode</span></button>";

  $("#homeCont").html(html);

}

//-------------------------------------------------------------------------------------------------------------
//                                     			ADD SCAN BTNS
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.addScanButtons = function(){
	
  var html =  "<div class='row'>"+
                "<div class='col-xs-12'>"+
                    "<button type='button' id='scanInBtn' class='btn btn-success centerItem lrgScanBtn'><span class='glyphicon glyphicon-barcode largeBars'></span><span class='allBtn'>Scan shipment</span></button>"+
                "</div>"+
                "<div class='col-xs-12'>"+
                     "<button type='button' id='scanOutBtn' class='btn btn-primary centerItem lrgScanBtn'><span class='glyphicon glyphicon-barcode largeBars'></span><span class='allBtn'>Scan delivery</span></button>"+
                "</div>"+
            "</div>";

    $(".scanBtns").html(html);

}

//-------------------------------------------------------------------------------------------------------------
//                                          ADD NEW ORDER
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.addNewOrder = function(){
  
  if ($("#newOrderCont").children()) $("#newOrderCont").children().remove();
  
  var html = "<div class='col-xs-12'>"+
                     "<form id='newOrderForm'>"+
                         "<div class='row'>"+
                              "<div class='col-xs-12'>"+
                                   "<div class='form-group' id='NewOrderCompanyListCont'>"+
                                        //"<input type='text' class='form-control' placeholder='Customer ID' id='newOrderClientId'>"+
                                   "</div>"+
                              "</div>"+
                         "</div>"+

                         "<div class='row' id='orderItemsGroup'>"+
                            "<div id='orderItem1'>"+
                              "<div class='col-xs-7'>"+
                                    "<div class='form-group'>"+
                                         "<input type='text' class='form-control' placeholder='Item ID/description' name='boxItem' id='orderInpItem1'>"+
                                    "</div>"+  
                              "</div>"+   
                               "<div class='col-xs-3'>"+
                                 "<div class='form-group'>"+
                                      "<input type='number' class='form-control' placeholder='Units' value=1 name='boxItemQuantity' id='orderItemQuan1'>"+
                                  "</div>"+
                              "</div>"+
                              "<div class='col-xs-2'>"+
                                 "<button type='button' class='btn btn-warning' style='float:right' name='deleteItemBtn' id='orderInpItemDel1'><span class='glyphicon glyphicon-remove'></span></button>"+
                              "</div>"+
                            "</div>"+ //item1

                          "</div>"+ //row-itemsGroup   
                          
                          "<div class='row'>"+//instructions
                              "<div class='col-xs-12 form-group'>"+
                                   "<textarea class='form-control' rows='2' id='orderInputInstructions' placeholder='Special instructions'></textarea>"+
                              "</div>"+
                         "</div>"+

                         "<p>"+
                              "<button type='button' class='btn btn-primary' id='orderAddItemBtn'><span class='glyphicon glyphicon-plus'></span><span class='allBtn'>Add Item</span></button>"+
                         "</p>"+
                         "<p>"+
                              "<button type='button' class='btn btn-success' id='executeNewOrderBtn'><span class='glyphicon glyphicon-barcode'></span><span class='allBtn'>Enter order</span></button>"+
                              "<button type='button' class='btn btn-warning' style='margin-left:6%' id='cancelOrderBtn'><span class='glyphicon glyphicon-remove'></span><span class='allBtn'>Cancel Scan</span></button>"+
                        "</p>"+
                    "</form>"+
               "</div>";

    $("#newOrderCont").html(html);
    this.generateCustomerDropdown("NewOrderCompanyListCont");
    this.newOrderListeners();
}

//-------------------------------------------------------------------------------------------------------------
//                                          NEW ORDER LISTENERS
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.newOrderListeners = function(){

  // add item               
  $("#orderAddItemBtn").click(function(){

    _viewBuilder.orderItemCount++;
    
    var itemHTML = "<div id='orderItem"+_viewBuilder.orderItemCount+"'>"+
                      "<div class='col-xs-7'>"+
                        "<div class='form-group'>"+
                             "<input type='text' class='form-control' placeholder='Item ID/description' name='boxItem' id='orderInpItem"+_viewBuilder.orderItemCount+"'>"+
                        "</div>"+  
                      "</div>"+   
                      "<div class='col-xs-3'>"+
                         "<div class='form-group'>"+
                              "<input type='number' class='form-control' placeholder='Units' value=1 name='boxItemQuantity' id='orderItemQuan"+_viewBuilder.orderItemCount+"'>"+
                          "</div>"+
                      "</div>"+
                      "<div class='col-xs-2'>"+
                         "<button type='button' class='btn btn-warning' style='float:right' name='deleteItemBtn' id='orderInpItemDel"+_viewBuilder.orderItemCount+"'><span class='glyphicon glyphicon-remove'></span></button>"+
                      "</div>"+
                  "</div>";

    $("#orderItemsGroup").append(itemHTML);

    _viewBuilder.itemDeleteListener("#orderInpItemDel"+_viewBuilder.orderItemCount);

  });

  this.itemDeleteListener("#orderInpItemDel1");

  //sumbit scan info
   $("#executeNewOrderBtn").click(function(){
         
         var coll;

            coll =[{inputCont:$("#selectNewOrderCompanyListCont"), message:"Select a customer.", style:null,
                  check:{valid:["", null], inputType:"select", checkType:null, range:null}}];
                  
          _validate.test({collection:coll,

                onPass:function(){ 
                    
                    var itemVarColl = [];
                    $("#orderItemsGroup input[id^='orderInpItem']").each(function(i,item){
                      itemVarColl.push({inputCont:$(item), message:"Enter item ID", style:null,
                      check:{valid:["Item ID","", null], inputType:"text", checkType:null, range:null}});
                    });

                       _validate.test({collection:itemVarColl, onPass:function(){ 
                          
                          data = {
                                    customerId:$("#selectNewOrderCompanyListCont option:selected").text().substring(Number($("#selectNewOrderCompanyListCont option:selected").text().indexOf(" - "))+3),  
                                    items:_viewBuilder.formatOrderItems(),
                                    instructions:$("#orderInputInstructions").val(), 
                                    orderDate:todayFormatted()
                                    }

                                     _communicator.addOrder(

                                      data,
                                      
                                      function(){

                                          $("#newOrderCont").fadeOut(300);
                                         _viewBuilder.addNewOrder();//reset
                                          $(".scanBtns").slideDown(700);//default screen
                                          databaseConnect();
                                      },

                                      function(){
                                         _viewBuilder.alerts({icon:"glyphicon glyphicon-warning-sign orange", message:"Couldn't save to Database."});
                                      },
                                      
                                      function(){
                                         _viewBuilder.alerts({icon:"glyphicon glyphicon-warning-sign orange", message:"Invalid customer ID."});
                                      }

                                 );   //add order data

                      }});
                }
      
                }); //validate steps
          });

  // delete order
  $("#cancelOrderBtn").click(function(){
      $("#newOrderCont").fadeOut(300,function(){_viewBuilder.addNewOrder();$("#homeCont").slideDown(600); $("#navHomeBtn").addClass("active");});
      $("#navOrdersBtn").removeClass("active");
  });
}  

//-------------------------------------------------------------------------------------------------------------
//                                          FORMAT ITEMS
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.formatOrderItems = function(){

  var itemsColl = {};
  $("#orderItemsGroup div[id^='orderItem']").each(function(i,item){
    itemsColl["item"+i] = {itemId:$(item).find("[id^='orderInpItem']").val(),totalUnits:$(item).find("[id^='orderItemQuan']").val(),
                          unitsShipped:"0",unitsDelivered:"0"};
  });

  return JSON.stringify(itemsColl);
}

//-------------------------------------------------------------------------------------------------------------
//                                          ADD SCAN IN INPUT
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.addShipmentInput = function(orderData){
  
  if ($("#shipFormCont").children()) $("#shipFormCont").children().remove();
  $("#alertsCont").html();

  var html = "<div class='col-xs-12'>"+
                    "<form id='shipForm'>"+
                         "<div class='row' style='display:inline'>"+
                             "<div class='fieldText'>"+
                                "Order #: "+orderData.orderId+
                             "</div>"+
                              "<div class='fieldText'>"+
                                "Customer ID: "+orderData.customerId+
                             "</div>"+
                              "<div class='fieldText'>"+
                               "Customer Name: "+orderData.customerName+
                             "</div>"+
                         "</div>"+

                         "<div class='row' id='shipItemsGroup'>"+
                           
                         "</div>"+ //row-itemsGroup   
                         
                         "<p>"+
                              "<button type='button' class='btn btn-primary' id='shipPrintLabelBtn'><span class='glyphicon glyphicon-plus'></span><span class='allBtn'>Print label</span></button>"+
                              "<button type='button' class='btn btn-warning' style='margin-left:6%' id='shipCancelBtn'><span class='glyphicon glyphicon-remove'></span><span class='allBtn'>Cancel</span></button>"+
                         "</p>"+
                    "</form>"+
               "</div>";

    $("#shipFormCont").html(html);
    this.generateShipItemList(orderData);
    this.shipmentViewListeners(orderData);
}

//-------------------------------------------------------------------------------------------------------------
//                                          GENERATE SHIP ITEM
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.generateShipItemList = function(orderData){

   var itemsObj = orderData.items; //_dbJSON["orderId"+orderData["orderId"]]["items"];
   var counter = 0;

   tableHTML =    "<div class='col-xs-12 no-padding'>"+
                      "<div class='table-responsive' id='shipItemTable' style='overflow:auto'>"+
                        "<table class='table table-striped table-hover'>"+
                          "<tbody id='shipItemsTableCont'>"+
                          "</tbody>"+
                        "</table>"+
                      "</div>"+
                  "</div>";

   rowHTML = "";

   $.each(itemsObj,function(key,itemObj){

     counter++;
     
     rowHTML += "<tr><td><span class='bolded'>Item:</span> " + itemObj.itemId+"</td>"+
                "<td class=''>Shipping</td>"+
                "<td><input class='form-control' style='min-width:60px' type='number' value=0 max='"+itemObj.totalUnits+"' min='0' id='shipItemUnits"+counter+"'></td>"+
                "<td>Out of <span class='bolded'>" + Number(parseInt(itemObj.totalUnits) - parseInt(itemObj.unitsShipped)) + "</span> units ordered</td>"+
                "</tr>";
  });
  
   $("#shipItemsGroup").html(tableHTML);
   $("#shipItemsTableCont").html(rowHTML); 
  
}

//-------------------------------------------------------------------------------------------------------------
//                                          SHIPMENT LISTENERS
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.shipmentViewListeners = function(orderData){

  $("#shipCancelBtn").click(function(){
      //$("#shipFormCont").fadeOut(300,function(){_viewBuilder.addShipmentInput(orderData)});
      $("#shipFormCont").fadeOut(300,function(){
        $("#homeCont").slideDown(600);
        $("#navHomeBtn").addClass("active");
      });

      $("#navOrdersBtn").removeClass("active");
  });

  $("#shipPrintLabelBtn").click(function(){
       
       //validate shipping order

       var validateColl = [];

        $("[id^='shipItemUnits']").each(function(i,unitsInput){
          validateColl.push({inputCont:$(unitsInput), message:"Enter valid number", style:null,
                check:{valid:["", null], inputType:"number", checkType:true, range:{maxi:orderData.items["item"+i]["totalUnits"],mini:0}}});
       });

         _validate.test({collection:validateColl,

                onPass:function(){
                  $("#shipFormCont").fadeOut(300,function(){_barCodeGenerator.generate(orderData); $("#barcodeGenCont").slideDown(700);});   
                }

         });
  });

}

//-------------------------------------------------------------------------------------------------------------
//                                          FORMAT ITEMS
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.formatShipmentItems = function(){

  var itemsColl = {};
  $("#orderItemsGroup div[id^='orderItem']").each(function(i,item){
    itemsColl["item"+i] = {itemId:$(item).find("[id^='orderInpItem']").val(),totalUnits:$(item).find("[id^='orderItemQuan']").val(),
                          shippedUnits:"",deliveredUnits:""};
  });

  return JSON.stringify(itemsColl);
}

//-------------------------------------------------------------------------------------------------------------
//                                          FORMAT ITEMS
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.updateOrderItems = function(itemsObj){

  var itemsColl = {};
  $.each(itemsObj,function(i,item){
    itemsColl["item"+i] = {itemId:$(item).find("[id^='orderInpItem']").val(),totalUnits:$(item).find("[id^='orderItemQuan']").val(),
                          shippedUnits:"",deliveredUnits:""};
  });

  return JSON.stringify(itemsColl);
}


//-------------------------------------------------------------------------------------------------------------
//                                          NEW ITEM LISTENER
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.itemDeleteListener = function(deleteBtnId){

  // remove item
  $(deleteBtnId).click(function(){
    var itemNumber = deleteBtnId.substring(deleteBtnId.length -1);
    $("#orderItem"+itemNumber).fadeOut(200,function(){$("#item"+itemNumber).remove();});
    _viewBuilder.itemCount--;
  });
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
          $("#addClientFormCont").fadeOut(300,function(){$("#homeCont").slideDown(600); $("#navHomeBtn").addClass("active");});
          $("#navCustomersBtn").removeClass("active");
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
          ($(this).attr("id").indexOf("Name") != -1) ? $("#byNameRadio").prop("checked",true):$("#byIdRadio").prop("checked",true);
          $(this).val("");
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
            $("#customerLookupFormCont").fadeOut(300,function(){$("#homeCont").slideDown(600); $("#navHomeBtn").addClass("active");});
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
  this.displayOrderLogs(_companyJSON,"#custDataCont");
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
    
  var contIdMatch = {"#custDataCont":"bodyForCustData", "#invDataCont":"bodyForInvData", "#shipDataCont":"bodyForShipData"};
  
  var tableBodyCont = contIdMatch[contId];

  var html = "<div class='col-xs-12 no-padding'>"+
                "<div class='table-responsive' style='overflow:auto'>"+
                  "<table class='table table-striped table-hover'>"+
                    "<thead>"+
                    "<tr><th nowrap style='width:10%'>Ship order</th><th nowrap style='width:10%'>Order #</th><th nowrap style='width:10%'>Customer ID</th><th nowrap style='width:10%'>Business name</th><th nowrap style='width:20%'>Items list</th><th nowrap style='width:20%'>Instructions</th><th nowrap style='width:10%'>Status</th><th nowrap style='width:10%'>Delete</th></tr>"+
                    "</thead>"+
                    "<tbody id='" + tableBodyCont+ "'>"+
                    "</tbody>"+
                  "</table>"+
                "</div>"+
              "</div>";

    $(contId).html(html);
}

//-------------------------------------------------------------------------------------------------------------
//                                                DISPLAY ORDERS
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.displayOrderLogs = function(JSONData,cont){

  _viewBuilder.ordersListingTableObj={};

  var dbJSON = JSONData;

  //skip last json item (pairs)
  if (cont == "#invDataCont" && dbJSON) delete dbJSON.idNamePairs;
  
  if (dbJSON){
        
      var tbodyHTML="";
      
      if (Object.keys(dbJSON)) var jsonLength = Object.keys(dbJSON).length;

      $.each(dbJSON, function(key,orderObj){
          
          var itemsToText="";
        
          $.each(orderObj.items, function(itemKey,itemObj){
            itemsToText+= "<span class='bolded'>Item: </span>" + itemObj.itemId + " <span class='bolded'>Units:</span> " + itemObj.totalUnits + "<br>";
          });

         var disabledState = (orderObj.orderId) ? "":"disabled='disabled'";

         tbodyHTML+= "<tr><td><button type='button' " +disabledState+ " class='btn btn-success' id='shipOrBtn"+cont+orderObj.orderId+"'><span class='allBtn'>Ship order</span></button>"+
                    "</td><td>"+orderObj.orderId+
                    "</td><td>"+orderObj.customerId+
                    "</td><td>"+_viewBuilder.nameFromId(orderObj.customerId)+ 
                    "</td><td>"+itemsToText+ 
                    "</td><td>"+orderObj.instructions+
                    "</td><td>"+orderObj.status+
                    "<td><button type='button' " +disabledState+ " class='btn btn-warning' id='delOrBtn"+cont+orderObj.orderId+"'><span class='glyphicon glyphicon-remove'></span></button>"+
                    "</td></tr>";  

          //save data in tables in array
          if (orderObj.orderId > 0) _viewBuilder.ordersListingTableObj[orderObj.orderId] = orderObj; 
        
      }); 
      
      var tableBodyCont = {"#invDataCont":"#bodyForInvData", "#custDataCont":"#bodyForCustData", "#shipDataCont":"#bodyForShipData"};
      
      $(tableBodyCont[cont]).html(tbodyHTML);

      $(cont).slideDown(600);

      $("[id^='shipOrBtn']").click(function(){
          
          var orderData = _viewBuilder.ordersListingTableObj[$(this).attr("id").replace("shipOrBtn"+cont,"")];
          _viewBuilder.addShipmentInput(orderData);
          $(cont).fadeOut(300,function(){$("#shipFormCont").slideDown(600);});
      });

      $("[id^='delOrderBtn']").click(function(){
             
      });

      if (jsonLength > 0 && cont != "#invDataCont" && cont != "#invDataCont" ) {
        $("#customerLookupFormCont").fadeOut(300);
      }else{
          _viewBuilder.alerts({icon:"glyphicon glyphicon-warning-sign orange", message:"No records were found."});
      }
    }
}


//-------------------------------------------------------------------------------------------------------------
//                                                DISPLAY TRANSACTIONS
//-------------------------------------------------------------------------------------------------------------
// ViewBuilder.prototype.displayInvData = function(dbJSON){

//   _viewBuilder.ordersListingTableObj={};

//   if (dbJSON){
        
//       var tbodyHTML="";
      
//       if (Object.keys(dbJSON)) var jsonLength = Object.keys(dbJSON).length;
      
//       var counter=1;

//       $.each(dbJSON, function(key,orderObj){
     
//       if (counter < jsonLength){ //skip last json item (pairs)
          
//           counter++;
//           var itemsToText="";
        
//           $.each(orderObj.items, function(itemKey,itemObj){
//             itemsToText+= "<span class='bolded'>Item: </span>" + itemObj.itemId + " <span class='bolded'>Units:</span> " + itemObj.totalUnits + "<br>";
//           });

//          var disabledState = (orderObj.orderId) ? "":"disabled='disabled'";

//          tbodyHTML+= "<tr><td><button type='button' " +disabledState+ " class='btn btn-success' id='shipOrderInvView"+orderObj.orderId+"'><span class='allBtn'>Ship order</span></button>"+
//                     "</td><td>"+orderObj.orderId+
//                     "</td><td>"+orderObj.customerId+
//                     "</td><td>"+_viewBuilder.nameFromId(orderObj.customerId)+ 
//                     "</td><td>"+itemsToText+ 
//                     "</td><td>"+orderObj.instructions+
//                     "</td><td>"+orderObj.status+
//                     "<td><button type='button' " +disabledState+ " class='btn btn-warning' id='delOrderInvView"+orderObj.orderId+"'><span class='glyphicon glyphicon-remove'></span></button>"+
//                     "</td></tr>";  

//           //save data in tables in array
//           if (orderObj.orderId > 0) _viewBuilder.ordersListingTableObj[orderObj.orderId] = orderObj; 
//         }
        
//       }); 

//       $("#bodyForInvData").html(tbodyHTML);

//       $("#invDataCont").slideDown(1000);

//       $("[id^='shipOrderInvView']").click(function(){
          
//           var orderData = _viewBuilder.ordersListingTableObj[$(this).attr("id").replace("shipOrderInvView","")];
//           _viewBuilder.addShipmentInput(orderData);
//           $("#invDataCont").fadeOut(300,function(){$("#shipFormCont").slideDown(700);});
//       });

//       $("[id^='delOrderInvView']").click(function(){
             
//       });

//       if (jsonLength > 0) {
//         $("#customerLookupFormCont").fadeOut(300);
//       }else{
//           _viewBuilder.alerts({icon:"glyphicon glyphicon-warning-sign orange", message:"No records were found."});
//       }
//     }
// }

//-------------------------------------------------------------------------------------------------------------
//                                                DISPLAY Company TRANSACTIONS
//-------------------------------------------------------------------------------------------------------------
// ViewBuilder.prototype.displayCustomerData = function(dbJSON){

//    _viewBuilder.ordersListingTableObj={};
   
//    var tbodyHTML="";

//    if (Object.keys(dbJSON)) var jsonLength = Object.keys(dbJSON).length;

//    $.each(dbJSON, function(key,orderObj){
   
//       var itemsToText="";
      
//       if (orderObj.items) $.each(orderObj.items, function(itemKey,itemObj){
//         itemsToText+= "<span class='bolded'>Item: </span>" + itemObj.itemId + " <span class='bolded'>Units:</span> " + itemObj.totalUnits + "<br>";
//       });

//       var disabledState = (orderObj.orderId) ? "":"disabled='disabled'";

//       tbodyHTML+= "<tr><td><button type='button' " +disabledState+ " class='btn btn-success' id='shipOrderCustView"+orderObj.orderId+"'><span class='allBtn'>Ship order</span></button>"+
//                   "</td><td>"+orderObj.orderId+
//                   "</td><td>"+orderObj.customerId+
//                   "</td><td>"+_viewBuilder.nameFromId(orderObj.customerId)+ 
//                   "</td><td>"+itemsToText+ 
//                   "</td><td>"+orderObj.instructions+
//                   "</td><td>"+orderObj.status+
//                   "<td><button type='button' " +disabledState+ " class='btn btn-warning' id='delOrderCustView"+orderObj.orderId+"'><span class='glyphicon glyphicon-remove'></span></button>"+
//                   "</td></tr>";  

//                   //save data in tables in array
//                   if (orderObj.orderId > 0) _viewBuilder.ordersListingTableObj[orderObj.orderId] = orderObj;                                          
//   });


//   $("#bodyForCustData").html(tbodyHTML);
//   $("#custDataCont").slideDown(1000);

//   $("[id^='shipOrderCustView']").click(function(){
      
//       var orderData = _viewBuilder.ordersListingTableObj[$(this).attr("id").replace("shipOrderCustView","")];
//       _viewBuilder.addShipmentInput(orderData);
//       $("#custDataCont").fadeOut(300,function(){$("#shipFormCont").slideDown(700);});
//   });

//   $("[id^='delOrderCustView']").click(function(){
         
//   });

//    if (jsonLength > 0) {
//     $("#customerLookupFormCont").fadeOut(300);
//   }else{
//       _viewBuilder.alerts({icon:"glyphicon glyphicon-warning-sign orange", message:"No records were found."});
//   }
// }

//-------------------------------------------------------------------------------------------------------------
//                                                NAME FROM ID
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.nameFromId = function(id){
  //alert(id);
  return _idNamePairs[id.toString()];
}

//-------------------------------------------------------------------------------------------------------------
//                                                DIRECT DELIVERY FILL
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.fillOrder = function(){

 if ($("#shipDataCont").children()) $("#shipDataCont").children().remove();

  var dropHtml = "<div class='row'>"+
                    "<div class='col-xs-12'>"+
                         "<div class='form-group' id='ShipOrderCompanyListCont'>"+
                         "</div>"+
                         "<p><button type='button' class='btn btn-success' id='shipClientLookupBtn'><span class='allBtn'>Lookup</span></button></p>"+
                    "</div>"+
                  "</div>";


  _viewBuilder.addLogView("#shipDataCont");
  $("#shipDataCont").prepend(dropHtml);
  this.generateCustomerDropdown("ShipOrderCompanyListCont");

  $("#shipDataCont").slideDown(600);

  $("#shipClientLookupBtn").click(function(){
        
        var value = $("#selectShipOrderCompanyListCont").val();
        alert(value.substring(value.indexOf(" - ")+3));
        
        if (value !="" && value.indexOf("Select a") == -1){

              _communicator.findClient("byId",value.substring(value.indexOf(" - ")+3),function(){

                _viewBuilder.displayCustData();

              },
                      
                function(){_viewBuilder.alerts({icon:"glyphicon glyphicon-warning-sign orange", message:"No match was found."})});
        }
  });

}

//-------------------------------------------------------------------------------------------------------------
//                                                CUSTOMER LIST
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.generateCustomerDropdown = function(contId){

  dropHTML = "<div class='input-group'>"+
  "<span class='input-group-addon'>Select a customer: </span>"+
  "<select class='form-control' style='border-left:none' id='select"+contId+"'>"+
  "<option></option>";
  
  if (_idNamePairs) {

    $.each(_idNamePairs,function(customerId,customerName){
    dropHTML+= "<option>"+customerName +" - " + customerId + "</option>";
    });

  }

   dropHTML+="</div></select>";

   $("#"+contId).html(dropHTML);

}

//-------------------------------------------------------------------------------------------------------------
//                                                DISPLAY ALERTS
//-------------------------------------------------------------------------------------------------------------
ViewBuilder.prototype.alerts = function(alertObj){
  alertHTML = "<div class='alerts'><span class='" + alertObj.icon + "'></span>&nbsp;&nbsp;<p class='alertText'>"+alertObj.message+"</p></div>";
  if ($("#alertsCont").children()) $("#alertsCont").children().remove();
  $("#alertsCont").html(alertHTML).show();

}