var _communicator;
var _viewBuilder;
var _scanner;
var _dbJSON;
var _idNamePairs;
var _companyJSON;
var _validate;

var PATH="";

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
        $(document).ready(function(){init();})

        console.log('Received Event: ' + id);
    }
};

//app.initialize();

 $(document).ready(function(){init();})
 //remove
//-------------------------------------------------------------------------------------------------------------
//                                     			INIT
//-------------------------------------------------------------------------------------------------------------
function init(){

	_viewBuilder = new ViewBuilder();
    _communicator = new Communicator();
    _validate = new Validate();
    //$(".loaderBlock").remove(); $(".wrapper").fadeIn(1000);
    databaseConnect();
	_scanner = new Scanner();
}

//-------------------------------------------------------------------------------------------------------------
//                                     			DB CONNECT
//-------------------------------------------------------------------------------------------------------------
function databaseConnect(){

	_communicator.getInvData(function(){
        $("#loaderIcon").fadeOut(1000,function(){$(".loaderBlock").remove(); $(".wrapper").fadeIn(1000);});});
   
}

//-------------------------------------------------------------------------------------------------------------
//                                              SHOW DISCRIPTOR
//-------------------------------------------------------------------------------------------------------------
function displayObject(obj,intro) {
    
    var info = intro + "\n";
        for (var x in obj){
            info += "Lable: " + x + " Val: " + obj[x] + "\n";
        }
        //console.log(obj);
        alert(info);
}

//-------------------------------------------------------------------------------------------------------------
//                                              SHOW DISCRIPTOR
//-------------------------------------------------------------------------------------------------------------
function displayJSON(json,intro) {
    
    var info="";

    $.each(json,function(index,obj){

        //info+= "var: " + 

    });
        alert(info);
}

//-------------------------------------------------------------------------------------------------------------
//                                              GET DATE
//-------------------------------------------------------------------------------------------------------------
function todayFormatted(){
    var date = new Date();
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
}