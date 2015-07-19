
<?php  

require_once('connect.php');

$insert_sql;

if ($_GET['scanInOut'] == "in"){
$dup = mysql_query("SELECT barCode FROM orders WHERE barCode='".$_GET['barCode']."';");
}else if ($_GET['scanInOut'] == "out"){
$dup = mysql_query("SELECT barCode FROM orders WHERE barCode='".$_GET['barCode']."' AND scanOutDate IS NOT NULL");
}
         
        if (mysql_num_rows($dup) > 0){
            echo $_GET['callback'] . '(' . "{'foundScan' : 'prescanned'}" . ')'; 
        }else{
              
             if ($_GET['scanInOut'] == "in"){
              
              $validId_result = mysql_query("SELECT id from customer WHERE customerId ='".$_GET['customerId']."';");
				 
			 if (mysql_num_rows($validId_result) > 0){

				$insert_sql = "INSERT INTO orders (customerId,barCode,items,instructions,scanInDate)" .
											
				                   "VALUES ('{$_GET['customerId']}','{$_GET['barCode']}','{$_GET['items']}',".
				                   "'{$_GET['instructions']}','{$_GET['scanInDate']}');";
			 } else{
			 	 echo $_GET['callback'] . '(' . "{'invalidCustId' : 'invalid'}" . ')';
			 	}
			 } else if ($_GET['scanInOut'] == "out"){

            $insert_sql = "UPDATE orders SET scanOutDate = '".$_GET['scanOutDate']."' WHERE barCode = '".$_GET['barCode']."';";
        }

        $result = mysql_query($insert_sql);
             
            if ($_GET['scanInOut'] == "in" && mysql_num_rows($validId_result) > 0){
			 	$id = mysql_insert_id();
				echo $_GET['callback'] . '(' . "{'orderId':'". $id . "'}" . ')'; 
			}else if ($_GET['scanInOut'] == "out" && mysql_affected_rows() < 1){
				echo $_GET['callback'] . '(' . "{'noInScanFound' : 'noInScan'}" . ')';
			}else if ($_GET['scanInOut'] == "out" && mysql_affected_rows() > 0) echo $_GET['callback'] . '(' . "{'scannedOut' : 'scannedOut'}" . ')';
         }
 
?> 