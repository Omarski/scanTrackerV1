
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: application/json');

require_once('connect.php');
	
	$totalRecords = mysql_query( "select count(scanId) as num_rows from orders;" );
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
	 		$json.= '"items":' . '"'. $row['items'] . '"';
	 		$json.= '"instructions":' . '"'. $row['instructions'] . '"';
			$json.= '"scanInDate":' . '"'. $row['scanInDate'] . '",';
	 		$json.= '"scanOutDate":' . '"'. $row['scanOutDate'] . '",';	 		
	 		$json.= ($rowCounter < $total) ? '},' : '}';
		}
     		$json.= '}';
     		//echo $totalRecords;    
    //if ($rowCounter < 1) echo $_GET['callback'] . '(' . "{'foundRecord' : 'empty'}" . ')';  
             echo $_GET['callback'] . '(' . $json . ')';
	 } else {
	 	echo $_GET['callback'] . '(' . "{'foundRecord' : 'empty'}" . ')'; 
	 	die("Can't get user data..");
	 }

//echo $_GET['callback'] . '(' . "{'fullname' : 'Jeff Hansen'}" . ')';

?> 
