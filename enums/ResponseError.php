<?php
namespace Enums\Enum;

abstract class ResponseError {
    const INVALID_REQUEST = 401;
    const INVALID_OPERATION = 402;
    const PERMISSION_DENIED = 403;
    const RECORD_NOT_EXIST = 404;
}

?>