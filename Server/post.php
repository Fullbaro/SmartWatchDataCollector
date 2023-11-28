<?php

// If it's a POST request, get the JSON data and decode it
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

if ($data["key"] != "52f13ff0-8dd1-11ee-b9d1-0242ac120002"){
    http_response_code(400);
    echo json_encode(["error" => "No access"]);
}else {

    // Check if decoding was successful
    if ($data !== null) {


        //! Here you can do whatever you want with the $data


        // Print the received JSON data
        echo json_encode("OK");       
    } else {
        // If decoding fails, handle the error
        echo json_encode(["error" => "Invalid JSON data"]);
    }
}

?>
