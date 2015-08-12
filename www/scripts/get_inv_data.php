
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: application/json');

require_once('connect.php');
	
	//get record count
	$totalRecords = mysql_query( "select count(orderId) as num_rows from orders;" );
	$rows = mysql_fetch_object( $totalRecords );
	$total = $rows->num_rows;
	
	//get businessId - name pairs
	$pairs='{';
	$getBusinessNameIDPairs =  mysql_query("SELECT businessName, customerId FROM customer;");
	if (mysql_num_rows($getBusinessNameIDPairs) > 0){
		while ($pairsRow = mysql_fetch_assoc($getBusinessNameIDPairs)){
			$pairs.= '"'.$pairsRow["customerId"].'":"'.$pairsRow["businessName"].'",';
		}
		$pairs = substr_replace($pairs, '', -1);
		$pairs.='}';
	}else{
		$pairs = '"noCompanies"';
	}
	$get_data_sql = "SELECT * FROM orders ORDER BY orderId ASC;";
	$result = mysql_query($get_data_sql);
	
	 	
	 	$json = '{';
	 	
	 	while($row = mysql_fetch_assoc($result)){
	 		
	 		$json.= '"orderId'.$row['orderId'].'":{';
	 		$json.= '"orderId":' . '"' . $row['orderId'] . '",';
	 		$json.= '"customerId":' . '"' . $row['customerId'] . '",';
	 		$json.= '"items":' . $row['items'] . ',';
	 		$json.= '"instructions":' . '"' . $row['instructions'] . '",';
			$json.= '"status":' . '"' . $row['status'] . '"},';
		};

			if (mysql_num_rows($result) < 1){
				$json.= '"noOrders":"true"';
			}else $json = substr_replace($json, '', -1);

     		$json.= ',"idNamePairs":' . $pairs;
     		$json.= '}';

    	echo $_GET['callback'] . '(' . $json . ')'; 

?> 
