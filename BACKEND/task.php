<?php
    $stringFromDb = file_get_contents('db.json');
    
    $tasks = json_decode($stringFromDb, true);


   

    header("Access-Control-Allow-Origin: *");
    header('Content-Type: application/json');
    echo $stringFromDb;