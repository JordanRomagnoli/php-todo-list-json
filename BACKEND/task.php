<?php
    $stringFromDb = file_get_contents('db.json');
    
    header("Access-Control-Allow-Origin: *");
    header('Content-Type: application/json');
    echo $stringFromDb;