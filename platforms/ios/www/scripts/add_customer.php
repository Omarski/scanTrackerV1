
<?php  
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: application/json');  

require_once('connect.php');

$dup = mysql_query("SELECT customerId FROM customer WHERE businessName='".$_GET['businessName']."';");
        
		if (mysql_num_rows($dup) > 0){
            echo $_GET['callback'] . '(' . "{'duplicate' : 'true'}" . ')';  
        }else{
			 
			 $customerId = rand ( 100000 , 999999 );
			 $insert_sql = "INSERT INTO customer (customerId,businessName,firstName,lastName,email,phone1,phone2,address)" .
							
                   "VALUES ('{$customerId}','{$_REQUEST['businessName']}','{$_REQUEST['firstName']}','{$_REQUEST['lastName']}','{$_REQUEST['email']}', " .
							"'{$_REQUEST['phone1']}','{$_REQUEST['phone2']}','{$_REQUEST['address']}'" .
				    		");";
			$result=mysql_query($insert_sql);
			
			echo $_GET['callback'] . '(' . "{'customerId' : " . $customerId . "}" . ')';    
         }
?> 
