<?php 

$context = stream_context_create(array(
    'http' => array(
        'header'  => "Authorization: key=4K4QYXNA2XXCK2EF0ZOL2Y5ZWC4G1HJI"
    )
));

$hashrate = file_get_contents("https://bitminter.com/api/users", false, $context);

echo $hashrate;
?>