var _communicator;
var _viewBuilder;
var _scanner;
var _dbJSON;
var _idNamePairs;
var _companyJSON;
var _companyProfJSON
var _validate;
var _platform="desktop";
var _barCodeGenerator;
var _adminAccess = true;

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
        navigator.splashscreen.hide();
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

    detectMobile();
    _barCodeGenerator = new BarCodeGenerator();
	_viewBuilder = new ViewBuilder();
    _communicator = new Communicator();
    _validate = new Validate();
    $(".loaderBlock").remove(); $(".wrapper").fadeIn(1000);
    databaseConnect();
	_scanner = new Scanner();
}

//-------------------------------------------------------------------------------------------------------------
//                                              DB CONNECT
//-------------------------------------------------------------------------------------------------------------
function detectMobile(){

    var app = (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/));
    //var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
    if ( app ) _platform = "mobile";
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
//                                              REMOVE RETURNS
//-------------------------------------------------------------------------------------------------------------
function removeReturns(obj,type) {
    
    if (type="obj") {
            for (var s in obj){
            if (typeof obj[s] === "string") obj[s] = obj[s].replace(/(\r\n|\n|\r)/gm,"<br>");
        } 

        return obj;

    } else return obj.replace(/(\r\n|\n|\r)/gm,"<br>");
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