
<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: application/json');

require_once('connect.php');
	
	$_GET['key'] = strtoupper($_GET['key']);
	
	$companyNameColl = array();
	$companyIdColl = array();
	$json = "{";

	if ($_GET['type'] == "byId"){

		 $getCustomer_sql = "SELECT businessName, customerId FROM customer WHERE customerId = '".$_GET['key']."';";
		 $result=mysql_query($getCustomer_sql);

	}else if ($_GET['type'] == "byName"){

		 $getCustomer_sql = "SELECT businessName, customerId FROM customer WHERE businessName LIKE '%".$_GET['key']."%' ;";
		 $result=mysql_query($getCustomer_sql);
	}

	 while($row = mysql_fetch_array($result)){

	 	$companyNameColl[] = $row['businessName'];
	 	$companyIdColl[]   = $row['customerId'];
	 }

	 $arrlength = count($companyNameColl);

	 if (count($companyNameColl) > 0){
	 
		 for ($x = 0; $x < $arrlength; $x++) {
	     
		     //$getOrdersResult = mysql_query("SELECT * FROM orders WHERE customerId = '".$companyIdColl[$x]."';");
		     $getOrdersResult = mysql_query("SELECT * FROM orders WHERE customerId = '".$companyIdColl[$x]."';");
		 	 //$getOrdersResult = mysql_query("SELECT * FROM orders WHERE customerId = '212286';");

			     if (mysql_num_rows($getOrdersResult)>0){

				     while($row = mysql_fetch_assoc($getOrdersResult)){
				     
					 	$json.= '"'.$row['scanId'].'":{"companyName":"'.$companyNameColl[$x].'",'.
					 									 '"companyId":"'.$row['customerId'].'",'.
					 									 '"barCode":"'.$row['barCode'].'",'.
					 									 '"items":'.$row['items'] . ','.
					 									 '"instructions":"'.$row['instructions'].'",'.
					 									 '"scanInDate":"'.$row['scanInDate'].'",'.
					 									 '"scanOutDate":"'.$row['scanOutDate'].'"},';

					 }
				}else { //no results

						$json.= '"'.$companyNameColl[$x].'":{"companyName":"'.$companyNameColl[$x].'",'.
						 									 '"companyId":"'. $companyIdColl[$x] .'",'.
						 									 '"barCode":"",'.
						 									 '"items":"'.null.'",'.
						 									 '"instructions":"",'.
						 									 '"scanInDate":"",'.
						 									 '"scanOutDate":""},';
				}
		}

		 substr_replace($json, '', -1);
		 $json.="}";

		echo $_GET['callback'] . '(' . $json . ')';  
		//echo $_GET['callback'] . '(' . "{'foundMatch' : '".$Counter."'}" . ')';

	} else echo $_GET['callback'] . '(' . "{'foundRecord' : 'empty'}" . ')';  

?> 