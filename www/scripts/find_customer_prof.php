
<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: application/json');

require_once('connect.php');
	
	$_GET['key'] = strtoupper($_GET['key']);
	
	$json = "{";

	if ($_GET['type'] == "byId"){

		 $getCustomer_sql = "SELECT * FROM customer WHERE customerId = '".$_GET['key']."';";
		 $result=mysql_query($getCustomer_sql);

	}else if ($_GET['type'] == "byName"){

		 $getCustomer_sql = "SELECT * FROM customer WHERE businessName LIKE '%".$_GET['key']."%' ;";
		 $result=mysql_query($getCustomer_sql);
	}


			     if (mysql_num_rows($result)>0){

				     while($row = mysql_fetch_assoc($result)){
				     
					 	$json.= '"'.$row['businessName'].'":{"businessName":"'.$row['businessName'].'",'.
					 									 '"customerId":"'.$row['customerId'].'",'.
					 									 '"address":"'.$row['address'] .'",'.
					 									 '"phone1":"'.$row['phone1'] . '",'.
					 									 '"phone2":"'.$row['phone2'] . '",'.
					 									 '"email":"'.$row['email']. '",'.
					 									 '"firstName":"'.$row['firstName'].'",'.
					 									 '"lastName":"'.$row['lastName'].'"},';
					 }

					  substr_replace($json,'', -1);
		 			  $json.="}";
					  echo $_GET['callback'] . '(' . $json . ')';  
				 } else echo $_GET['callback'] . '(' . "{'foundRecord' : 'empty'}" . ')';

?> 