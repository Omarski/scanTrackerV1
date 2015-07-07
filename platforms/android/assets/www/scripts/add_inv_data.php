
<?php  
require_once('connect.php');

if ($_GET['scanInOut'] == "in"){
$dup = mysql_query("SELECT barCode FROM orders WHERE barCode='".$_GET['barCode']."';");
}else if ($_GET['scanInOut'] == "out"){
$dup = mysql_query("SELECT barCode FROM orders WHERE barCode='".$_GET['barCode']."' AND scanOutDate != NULL");
}
        
		if (mysql_num_rows($dup) > 0){
            echo $_GET['callback'] . '(' . "{'foundScan' : 'prescanned'}" . ')'; 
        }else{
			 
			 if ($_GET['scanInOut'] == "in"){
			 $insert_sql = "INSERT INTO orders (customerId,barCode,items,instructions,scanInDate)" .
							
                   "VALUES ('{$_GET['customerId']}','{$_GET['barCode']}','{$_GET['items']}',".
                   "'{$_GET['instructions']}','{$_GET['scanInDate']}');";
		}else if ($_GET['scanInOut'] == "out"){
			$insert_sql = "INSERT INTO orders (scanOutDate) VALUES('{$_GET['scanOutDate']}') WHERE barCode='".$_GET['barCode']."';";
		}
			
			$result = mysql_query($insert_sql);
			$id = mysql_insert_id();
			echo $_GET['callback'] . '(' . "{'generatedId':'". $id . "'}" . ')';  
         }

?> 