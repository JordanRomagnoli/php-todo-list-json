<?php

$stringTaskList = file_get_contents('db.json');

$taskList = json_decode($stringTaskList, true);

unset($taskList[$_POST['index']]);
$fixIndex = array_values($taskList);

$newTaskListJson = json_encode($fixIndex);

file_put_contents('db.json', $newTaskListJson);




echo json_encode([
    'meassage' => 'OK',
    'code' => 200
]);

header("Access-Control-Allow-Origin: *");