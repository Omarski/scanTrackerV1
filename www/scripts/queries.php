
<?php  
require_once('connect.php');

switch ($_GET["queryName"]){
	
	case "getAddress": getAddress($_GET["customerId"]);
	break;

	case "updateOrder": updateOrder($_GET["orderId"],$_GET["items"]);
	break;



}

//-------------------------------------------------------------------------------------------------------------
//                                     			HIGHEST SLIDE
//-------------------------------------------------------------------------------------------------------------

function getAddress($customerId){
	
	$query = mysql_query("SELECT address FROM customer WHERE customerId = '".$customerId."';");
	$result = mysql_fetch_array($query);

	echo $_GET['callback'] .  '(' . "{'address' :'". $result['address'] . "'}" . ')'; 
}

function updateOrder($orderId,$items){
	
	$query = "UPDATE orders SET items = '".$items."' WHERE orderId = '".$orderId."';";
	$result = mysql_fetch_array($query);
	if (mysql_affected_rows()){
	echo $_GET['callback'] .  '(' . "{'address' :'". $result['address'] . "'}" . ')'; 
}else{
	 echo $_GET['callback'] . '(' . "{'update' : 'could not update'}" . ')'; 
}

?> 
