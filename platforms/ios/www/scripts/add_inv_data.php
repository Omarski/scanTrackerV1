
<?php  
require_once('connect.php');

if ($_REQUEST['scanInOut'] == "in"){
$dup = mysql_query("SELECT barCode FROM orders WHERE barCode='".$_REQUEST['barCode']."';");
}else if ($_REQUEST['scanInOut'] == "out"){
$dup = mysql_query("SELECT barCode FROM orders WHERE barCode='".$_REQUEST['barCode']."' AND scanOutDate != NULL");
}
        
		if (mysql_num_rows($dup) > 0){
            echo 'duplicate'.$_REQUEST['scanInOut'];
        }else{
			 
			 if ($_REQUEST['scanInOut'] == "in"){
			 $insert_sql = "INSERT INTO orders (customerId,barCode,items,instructions,scanInDate)" .
							
                   "VALUES ('{$_REQUEST['customerId']}','{$_REQUEST['barCode']}','{$_REQUEST['items']}',".
                   "'{$_REQUEST['instructions']}','{$_REQUEST['scanInDate']}');";
		}else if ($_REQUEST['scanInOut'] == "out"){
			$insert_sql = "INSERT INTO orders (scanOutDate) VALUES('{$_REQUEST['scanOutDate']}') WHERE barCode='".$_REQUEST['barCode']."';";
		}
			
			$result = mysql_query($insert_sql);
			$id = mysql_insert_id();
			echo $id;    
         }

?> 