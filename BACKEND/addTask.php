<?php


$stringTaskList = file_get_contents('db.json');

$taskList = json_decode($stringTaskList);

$newTask = [
    "task"=> $_POST['task'],
    "status" => false  
];

$taskList[] = $newTask;

$newTaskListJson = json_encode($taskList);

file_put_contents('db.json', $newTaskListJson);

echo json_encode([
    'meassage' => 'OK',
    'code' => 200
]);

header("Access-Control-Allow-Origin: *");