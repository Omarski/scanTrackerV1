
<?php  
require_once('connect.php');

switch ($_GET["queryName"]){
	
	case "getAddress": getAddress($_GET["customerId"]);
	break;

	case "updateOrder": updateOrder($_GET["orderId"],$_GET["items"]);
	break;

}

//-------------------------------------------------------------------------------------------------------------
//                                     			FUNCTIONS
//-------------------------------------------------------------------------------------------------------------

function getAddress($customerId){
	
	$query = mysql_query("SELECT address FROM customer WHERE customerId = '".$customerId."';");
	$result = mysql_fetch_array($query);

	echo $_GET['callback'] .  '(' . "{'address' :'". $result['address'] . "'}" . ')'; 
}

function updateOrder($orderId,$items){
	
	$query = mysql_query("UPDATE orders SET items = '".$items."' WHERE orderId = '".$orderId."';");
	$result = mysql_fetch_array($query);
	
	if (mysql_affected_rows() > 0){
		 echo $_GET['callback'] . '(' . "{'update' : 'true'}" . ')'; 
	}else{
		 echo $_GET['callback'] . '(' . "{'update' : 'false'}" . ')'; 
	}

}

?> 
