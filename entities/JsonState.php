<?php 
namespace Entities;

class JsonState {
	
	public $httpCode; // Integer presentation of error.
	public $responseMessage; // Explenation of Error.

	public function	__construct($httpCode, $responseMessage) {
		$this->httpCode = $httpCode;
		$this->responseMessage = $responseMessage;
	}

	/*** httpCode ***/
	public function getHttpCode() {
		return $this->httpCode;
	}

	public function setHttpCode($httpCode) {
		$this->httpCode = $httpCode;
	}
	/*** httpCode ***/

	/*** responseMessage ***/
	public function getResponseMessage() {
		return $this->responseMessage;
	}

	public function setResponseMessage($responseMessage) {
		$this->responseMessage = $responseMessage;
	}
	/*** responseMessage ***/
}