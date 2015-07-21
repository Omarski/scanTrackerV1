
<?php  
require_once('connect.php');

switch ($_GET["queryName"]){
	
	case "getAddress": getAddress($_GET["customerId"]);
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

?> 
