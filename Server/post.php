<?php
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);

    if ($data["key"] != "52f13ff0-8dd1-11ee-b9d1-0242ac120002"){
        http_response_code(400);
        echo json_encode(["error" => "No access"]);
    } else {
        $data = $data["data"];
        
        if ($data !== null) {
            // Check directory
            if (!is_dir("./data"))
                mkdir("./data");

            // Check for files
            if (!file_exists("data/basic.csv"))
                file_put_contents('data/basic.csv', "time;battery;step;calorie;distance;stand;city;thermometer\n");
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


            // Write to files
            for ($i = 0; $i < count($data["time"]); $i++)                
                file_put_contents('data/basic.csv', 
                    $data["time"][$i] . ";" . 
                    $data["battery"][$i] . ";" . 
                    $data["step"][$i] . ";" . 
                    $data["calorie"][$i] . ";" . 
                    $data["distance"][$i] . ";" . 
                    $data["stand"][$i] . ";" . 
                    $data["city"][$i] . ";" . 
                    $data["thermometer"][$i] . "\n", FILE_APPEND);
            
            for ($i = 0; $i < count($data["sleep"]["date"]); $i++)
                file_put_contents('data/sleep.csv', 
                        $data["sleep"]["date"][$i] . ";" . 
                        $data["sleep"]["start"][$i] . ";" . 
                        $data["sleep"]["end"][$i] . ";" . 
                        $data["sleep"]["score"][$i] . ";" . 
                        $data["sleep"]["wake"][$i] . ";" . 
                        $data["sleep"]["rem"][$i] . ";" . 
                        $data["sleep"]["light"][$i] . ";" . 
                        $data["sleep"]["deep"][$i] . "\n", FILE_APPEND);       
                        
            for ($i = 0; $i < count($data["events"]["heart"]["time"]); $i++)
                file_put_contents('data/heart.csv', 
                    $data["events"]["heart"]["time"][$i] . ";" .                    
                    $data["events"]["heart"]["value"][$i] . "\n", FILE_APPEND);       

            for ($i = 0; $i < count($data["events"]["spo2"]["time"]); $i++)
                file_put_contents('data/spo2.csv', 
                    $data["events"]["spo2"]["time"][$i] . ";" .                    
                    $data["events"]["spo2"]["value"][$i] . "\n", FILE_APPEND);  

            for ($i = 0; $i < count($data["events"]["stress"]["time"]); $i++)
                file_put_contents('data/stress.csv', 
                    $data["events"]["stress"]["time"][$i] . ";" .                    
                    $data["events"]["stress"]["value"][$i] . "\n", FILE_APPEND);


            for ($i = 0; $i < count($data["events"]["wear"]["time"]); $i++)
                file_put_contents('data/wear.csv', 
                    $data["events"]["wear"]["time"][$i] . ";" .                    
                    $data["events"]["wear"]["value"][$i] . "\n", FILE_APPEND);


            // Print the received JSON data
            echo json_encode("OK");       
        } else {
            // If decoding fails, handle the error
            http_response_code(400);
            echo json_encode(["error" => "Invalid JSON data"]);
        }
    }
?>
