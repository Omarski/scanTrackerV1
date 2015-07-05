
<?php  
require_once('connect.php');
	
	$totalRecords = mysql_query( "select count(userId) as num_rows from orders" );
	$rows = mysql_fetch_object( $totalRecords );
	$total = $rows->num_rows;
	 	 
	$get_data_sql = "SELECT * FROM orders;";
	$result = mysql_query($get_data_sql);
	 
	 if ($result){
	 	
	 	$json = '{';
	 	
	 	$rowCounter = 0;
	 	
	 	while($row = mysql_fetch_assoc($result)){
	 		$rowCounter++;
	 		$json.= '"scanId'.$row['scanId'].'":{';
	 		$json.= '"customerId":' . '"'. $row['customerId'] . '",';
	 		$json.= '"barCode":'  . '"'. $row['barCode'] . '",';
	 		$json.= '"firstName":'  . '"'. $row['firstName'] . '",';
	 		$json.= '"lastName":' . '"'. $row['lastName'] . '",';
	 		$json.= '"email":'  . '"'. $row['email'] . '",';
	 	    $json.= '"phone":' . '"'. $row['phone'] . '"';
	 		$json.= '"address":' . '"'. $row['address'] . '"';
	 		$json.= '"items":' . '"'. $row['items'] . '"';
	 		$json.= '"instructions":' . '"'. $row['instructions'] . '"';
			$json.= '"scanInDate":' . '"'. $row['scanInDate'] . '",';
	 		$json.= '"scanOutDate":' . '"'. $row['scanOutDate'] . '",';	 		
	 		$json.= ($rowCounter < $total) ? '},' : '}';
		}
     		$json.= '}';
     		//echo $totalRecords;    
     
     echo ($json);
	 } else die("Can't get user data..");
?> 
