
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: application/json');

require_once('connect.php');
	
	//get record count
	$totalRecords = mysql_query( "select count(scanId) as num_rows from orders;" );
	$rows = mysql_fetch_object( $totalRecords );
	$total = $rows->num_rows;
	
	//get businessId - name pairs
	$pairs='{';
	$getBusinessNameIDPairs =  mysql_query("SELECT businessName AND customerId FROM customer;");
	
	while ($pairsRow = mysql_fetch_row($getBusinessNameIDPairs)){
		$pairs.= '"'.$pairsRow["customerId"].'":"'.$pairsRow["businessName"].'",';
	}
	$pairs = substr_replace($pairs, '', -1);
	$pairs.='}';

	$get_data_sql = "SELECT * FROM orders ORDER BY scanId ASC;";
	$result = mysql_query($get_data_sql);
	
	 if ($result){
	 	
	 	$json = '{';
	 	
	 	$rowCounter = 0;
	 	
	 	while($row = mysql_fetch_assoc($result)){
	 		$rowCounter++;
	 		$json.= '"scanId'.$row['scanId'].'":{';
	 		$json.= '"customerId":' . '"' . $row['customerId'] . '",';
	 		//$json.= '"customerName":' . '"' . getCustomerName($row['customerId']) . '",';
	 		$json.= '"barCode":' . '"' . $row['barCode'] . '",';
	 		$json.= '"items":' . $row['items'] . ',';
	 		$json.= '"instructions":' . '"' . $row['instructions'] . '",';
			$json.= '"scanInDate":' . '"' . $row['scanInDate'] . '",';
	 		$json.= '"scanOutDate":' . '"' . $row['scanOutDate'] . '",';	 		
	 		$json.= ($rowCounter < $total) ? '},' : '}';
		}
     		$json.= ',"idNamePairs":' . $pairs;
     		$json.= '}';

    	if ($rowCounter < 1) echo $_GET['callback'] . '(' . "{'noRecords' : 'true'}" . ')'; 
    	else echo $_GET['callback'] . '(' . $json . ')'; 
	 
	 } else {
	 	die("Can't get user data..");
	 }

// function getCustomerName($customerId){

// 	$nameResult = mysql_query("SELECT businessName FROM customer WHERE customerId='".$customerId."';");
// 	while($businessRow = mysql_fetch_row($nameResult)){
// 		$businessName = $businessRow["businessName"];
// 	}

// 	return $businessName;
// }

?> 
