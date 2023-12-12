<?php
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);

    if ($data["key"] != "52f13ff0-8dd1-11ee-b9d1-0242ac120003"){
        http_response_code(400);
        echo json_encode(["error" => "No access"]);
    } else {
        // $data = $data["data"];
        
        if ($data !== null) {
            // Check directory
            if (!is_dir("./data"))
                mkdir("./data");

            // Check for files
            if (!file_exists("data/basic.csv"))
                file_put_contents('data/basic.csv', "time;battery;step;calorie;distance;stand;city;thermometer;weather;temp_low;temp_high\n");
            if (!file_exists("data/sleep.csv"))
                file_put_contents('data/sleep.csv', "date;start;end;score;wake;rem;light;deep\n");
            if (!file_exists("data/heart.csv"))
                file_put_contents('data/heart.csv', "time;value\n");
            if (!file_exists("data/spo2.csv"))
                file_put_contents('data/spo2.csv', "time;value\n");
            if (!file_exists("data/stress.csv"))
                file_put_contents('data/stress.csv', "time;value\n");
            if (!file_exists("data/wear.csv"))
                file_put_contents('data/wear.csv', "time;value\n");
            if (!file_exists("data/vape.csv"))
                file_put_contents('data/vape.csv', "time\n");
            if (!file_exists("data/drink.csv"))
                file_put_contents('data/drink.csv', "time;value\n");
            if (!file_exists("data/alcohol.csv"))
                file_put_contents('data/alcohol.csv', "time;value\n");
            if (!file_exists("data/food.csv"))
                file_put_contents('data/food.csv', "time;value\n");
            if (!file_exists("data/pee.csv"))
                file_put_contents('data/pee.csv', "time\n");
            if (!file_exists("data/poo.csv"))
                file_put_contents('data/poo.csv', "time\n");
            if (!file_exists("data/headache.csv"))
                file_put_contents('data/headache.csv', "time\n");

            file_put_contents("data/".$data["type"].".csv", $data["data"] . "\n", FILE_APPEND);

            // Print the received JSON data
            echo json_encode("OK");       
        } else {
            // If decoding fails, handle the error
            http_response_code(400);
            echo json_encode(["error" => "Invalid JSON data"]);
        }
    }
?>
