
<?php  

require_once('connect.php');
              
              $validId_result = mysql_query("SELECT id from customer WHERE customerId ='".$_GET['customerId']."';");
				 
			 if (mysql_num_rows($validId_result) > 0){

				$insert_sql = "INSERT INTO orders (customerId,items,instructions,orderDate)" .
											
				                   "VALUES ('{$_GET['customerId']}','{$_GET['items']}',".
				                   "'{$_GET['instructions']}','{$_GET['orderDate']}');";
			 } else{
			 	 echo $_GET['callback'] . '(' . "{'invalidCustId' : 'invalid'}" . ')';
			 }

        	 if (mysql_num_rows($validId_result) > 0){
        	 	$result = mysql_query($insert_sql);
             
			 	$id = mysql_insert_id();
				echo $_GET['callback'] . '(' . "{'orderId':'". $id . "'}" . ')';
				} 
?> 