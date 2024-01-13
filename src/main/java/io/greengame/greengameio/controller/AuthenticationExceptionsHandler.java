package io.greengame.greengameio.controller;

import io.greengame.greengameio.exceptions.AccountIsNotEnableException;
import io.greengame.greengameio.exceptions.InvalidPasswordException;
import io.greengame.greengameio.exceptions.LoginAlreadyExistsException;
import io.greengame.greengameio.exceptions.UnknownUserException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class AuthenticationExceptionsHandler {

    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<String> handleInvalidPasswordException(InvalidPasswordException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(LoginAlreadyExistsException.class)
    public ResponseEntity<String> handleLoginAlreadyExistsException(LoginAlreadyExistsException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(UnknownUserException.class)
    public ResponseEntity<String> handleUnknownUserException(UnknownUserException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(AccountIsNotEnableException.class)
    public ResponseEntity<String> handleAccountIsNotEnableException(AccountIsNotEnableException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
}
