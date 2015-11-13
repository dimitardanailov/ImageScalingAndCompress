<?php

namespace Library\JSON;

use Enums\Enum;
use \stdClass;

class JsonHelper {

    public function jsonInputReader($convertedToAssocArray = false) {
        $data = file_get_contents('php://input');
        $data = json_decode($data, $convertedToAssocArray);
        
        return $data;
    }
    
    public function responseDefaultError() {
        $error = $this->defaultError();
        $this->responseJsonMessage($error);
    }
    
    public function defaultError() {
        $error = $this->generateError(Enum\ResponseError::INVALID_REQUEST, 'Invalid request');
        
        return $error;
    }
    
    public function generateError($HTTPCODE, $message) {
        $error = new stdClass();
        $error->HTTPCODE = $HTTPCODE;
        $error->message = $message;
        
        return $error;
    }
    
    public function responseCustomError($HTTPCODE, $message) {
        $message = $this->generateError($HTTPCODE, $message);
        
        $this->responseJsonMessage($message);
    }
    
    public function generateSuccessCode() {
        $message = new stdClass();
        $message->HTTPCODE = 200;
        
        return $message;
    }
    
    public function responseJsonMessageByKeyAndValues($key, $values) {
        $message = $this->generateSuccessCode();
        $message->{$key} = $values;
        
        $this->responseJsonMessage($message);
    }
    
    public function responseJsonMessage($message) {
        header('HTTP/1.1 ' . $message->HTTPCODE);
        header('Content-type: application/json');
        
        echo json_encode($message);
    }
}
?>