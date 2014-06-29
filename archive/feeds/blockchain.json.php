<?php 

$diff       = file_get_contents("https://blockchain.info/q/getdifficulty", "r");
$blockcount = file_get_contents("https://blockchain.info/q/getblockcount");
$latesthash = file_get_contents("https://blockchain.info/q/latesthash");
$totalbtc   = file_get_contents("https://blockchain.info/q/totalbc");
$interval   = file_get_contents("https://blockchain.info/q/interval");
$dayprice   = file_get_contents("https://blockchain.info/q/24hrprice");
$mktcap     = file_get_contents("https://blockchain.info/q/marketcap");
$hashrate   = file_get_contents("https://blockchain.info/q/hashrate");
$mintedbal  = file_get_contents("https://blockchain.info/q/addressbalance/1CqSKQYsxxweB7hhoQCjr7vxxrVh3fnEVo");

$beginning_balance_satoshis = 111617850;

$array = array(
    "diff" => number_format($diff),
    "blockcount" => $blockcount,
    "latesthash" => $latesthash,
    "totalbtc" => $totalbtc / 100000000,
    "interval" => number_format($interval),
    "dayprice" => number_format($dayprice,0),
    "marketcap" => number_format($mktcap),
    "hashrate" => number_format($hashrate / 1000000, 3),
    "mintedbal" => number_format( ($mintedbal + $beginning_balance_satoshis) / 100000, 0),
);

echo json_encode($array);
?>