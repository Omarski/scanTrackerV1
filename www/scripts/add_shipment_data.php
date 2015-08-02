
<?php  

require_once('connect.php');

$insert_sql;

if ($_GET['scanInOut'] == "in"){
$dup = mysql_query("SELECT barcode FROM shipments WHERE barcode='".$_GET['barCode']."';");
}else if ($_GET['scanInOut'] == "out"){
$dup = mysql_query("SELECT barcode FROM shipments WHERE barcode='".$_GET['barCode']."' AND scanOutDate IS NOT NULL");
}
         
        if (mysql_num_rows($dup) > 0){
            echo $_GET['callback'] . '(' . "{'foundScan' : 'prescanned'}" . ')'; 
        }else{
              
             if ($_GET['scanInOut'] == "in"){

				$insert_sql = "INSERT INTO shipments (orderId,barcode,items,scanInDate)" .
											
				                   "VALUES ('{$_GET['orderId']}','{$_GET['barcode']}','{$_GET['items']}',".
				                   "'{$_GET['scanInDate']}');";

			 } else if ($_GET['scanInOut'] == "out"){

            $insert_sql = "UPDATE shipments SET scanOutDate = '".$_GET['scanOutDate']."' WHERE barcode = '".$_GET['barcode']."';";
        }
        
        $result = mysql_query($insert_sql);
             
            if ($_GET['scanInOut'] == "in" && mysql_affected_rows() > 0){
			 	$id = mysql_insert_id();
				echo $_GET['callback'] . '(' . "{'shipmentId':'". $id . "'}" . ')'; 
			}else if ($_GET['scanInOut'] == "out" && mysql_affected_rows() < 1){
				echo $_GET['callback'] . '(' . "{'noInScanFound' : 'noInScan'}" . ')';
			}else if ($_GET['scanInOut'] == "out" && mysql_affected_rows() > 0) echo $_GET['callback'] . '(' . "{'scannedOut' : 'scannedOut'}" . ')';
         }
 
?> 