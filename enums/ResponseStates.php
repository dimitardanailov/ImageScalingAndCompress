<?php
namespace Enums\Enum;

abstract class ResponseState {
	const FAILED_TO_OPEN_INPUT_STREAM = 101;
    const FAILED_TO_OPEN_OUTPUT_STREAM = 102;
    const STATUS_OK = 200;
    const INVALID_REQUEST = 401;
    const INVALID_OPERATION = 402;
    const PERMISSION_DENIED = 403;
    const RECORD_NOT_EXIST = 404;
}

?>