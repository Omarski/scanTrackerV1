
<?php  

require_once('connect.php');

$insert_sql;

if ($_GET['scanInOut'] == "in"){
$dup = mysql_query("SELECT barcode FROM shipments WHERE barcode='".$_GET['barCode']."';");
}else if ($_GET['scanInOut'] == "out"){
$dup = mysql_query("SELECT barcode FROM shipments WHERE barcode='".$_GET['barCode']."' AND scanOutDate IS NOT NULL AND scanOutDate != '';");
}
         
        if (mysql_num_rows($dup) > 0){
            echo $_GET['callback'] . '(' . "{'foundScan' : 'prescanned'}" . ')'; 
        }else{
              
             if ($_GET['scanInOut'] == "in"){

				$insert_sql = "INSERT INTO shipments (orderId,barcode,items,scanInDate)" .
											
				                   "VALUES ('{$_GET['orderId']}','{$_GET['barCode']}','{$_GET['items']}',".
				                   "'{$_GET['scanInDate']}');";

			 } else if ($_GET['scanInOut'] == "out"){

            $insert_sql = "UPDATE shipments SET scanOutDate = '".$_GET['scanOutDate']."' WHERE barcode = '".$_GET['barCode']."';";
        }
        
        $result = mysql_query($insert_sql);
             
            if ($_GET['scanInOut'] == "in" && mysql_affected_rows() > 0){
			 	$id = mysql_insert_id();
				echo $_GET['callback'] . '(' . "{'shipmentId':'". $id . "'}" . ')'; 
			
			}else if ($_GET['scanInOut'] == "out" && mysql_affected_rows() < 1){
				echo $_GET['callback'] . '(' . "{'noInScanFound' : 'noInScan'}" . ')';
			
			}else if ($_GET['scanInOut'] == "out" && mysql_affected_rows() > 0){
				
				$orderId;
				$test=0;
				$itemsShippedColl = array();
				//get sipment data
				$shipmentItems = mysql_query("SELECT items, orderId from shipments WHERE barcode = '".$_GET['barCode']."';");
				 
				 if (mysql_num_rows($shipmentItems) > 0){
					 
					$row = mysql_fetch_assoc($shipmentItems);
				 	//get order id from shipment
				 	$orderId=$row['orderId'];
		
				 	//items obj from shipment
				 	$shipItemsJSON = json_decode($row['items'],true);
				 	 
				 	 //save shipped units 
				 	 foreach($shipItemsJSON as $obj){
				 	 $itemsShippedColl[] = $obj['unitsShipped'];
				 	 }

				 	//get order items
				 	$orderItems = mysql_query("SELECT items from orders WHERE orderId = '".$orderId."';");
				    $row = mysql_fetch_assoc($orderItems);
				 	$orderItemsJSON = json_decode($row["items"]);
				 	
				 	$counter=0;
				 	
				 	foreach($orderItemsJSON as $key =>$obj){
				 	 	$obj->unitsDelivered = intval($obj->unitsDelivered) + intval($itemsShippedColl[$counter]);
				 	 	$counter++;
				 	 }

					 $updatedItems = json_encode($orderItemsJSON);
					 $test=$updatedItems;
			
					 $updateOrderItems = mysql_query("UPDATE orders SET items = '".$updatedItems."' WHERE orderId = '".intval($orderId)."';");
					 
					 //if (mysql_affected_rows() > 0) echo $_GET['callback'] . '(' . "{'scannedOut' : 'scannedOut'}" . ')';//keep
					 if (mysql_affected_rows() > 0) echo $_GET['callback'] . '(' . "{'deliveryUpdate' : '". $test . "'}" . ')';//remove	
					 else echo $_GET['callback'] . '(' . "{'deliveryUpdate' : 'failed'}" . ')';
					 //else echo $_GET['callback'] . '(' . "{'deliveryUpdate' : '". $test . "'}" . ')';//remove			
			}else echo $_GET['callback'] . '(' . "{'deliveryUpdate' : 'noShipmentData'}" . ')';
         } 	
    }
?> 