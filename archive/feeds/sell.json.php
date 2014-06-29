<?php 
$sellJSON = file_get_contents("https://coinbase.com/api/v1/prices/sell", "r");
$sellsObj = json_decode($sellJSON);

echo json_encode($sellsObj);
?>