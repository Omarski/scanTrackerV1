
<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: application/json');

require_once('connect.php');
	
	$_GET['key'] = strtoupper($_GET['key']);
	
	$json = "{";

	if ($_GET['type'] == "byId"){

		 $getCustomer_sql = "SELECT businessName AND customerId FROM customer WHERE customerId = '".$_GET['key']."';";
		 $result=mysql_query($getCustomer_sql);

	}else if ($_GET['type'] == "byName"){

		 $getCustomer_sql = "SELECT businessName AND customerId FROM customer WHERE businessName LIKE '%".$_GET['key']."%';";
		 $result=mysql_query($getCustomer_sql);
	}

	 while($row = mysql_fetch_array($result)){

	 	$companyNameColl[] = $row['businessName'];
	 	$companyIdColl[]   = $row['businessId'];
	 }

	 $arrlength = count($companyNameColl);

	 if (count($companyNameColl) < 0){
	 
		 for($x = 0; $x < $arrlength; $x++) {
	     
		     $getOrdersResult = mysql_query("SELECT * FROM orders WHERE customerId = '".$companyIdColl[$x]."';");

			     while($row = mysql_fetch_array($getOrdersResult)){

				 	$json.= '"'.$companyNameColl[$x].'":{"companyName":"'.$companyNameColl[$x].'",'.
				 									 '"companyId":"'.$row['companyId'].'",'.
				 									 '"barCode":"'.$row['barCode'].'",'.
				 									 '"items":"'.$row['items'].'",'.
				 									 '"instructions":"'.$row['instructions'].'",'.
				 									 '"scanInDate":"'.$row['scanInDate'].'",'.
				 									 '"scanOutDate":"'.$row['scanOutDate'].'"}';


				 }

				 $json.="}";
		}

		echo $_GET['callback'] . '(' . $json . ')';  


	} else echo $_GET['callback'] . '(' . "{'foundRecord' : 'empty'}" . ')';  

?> 