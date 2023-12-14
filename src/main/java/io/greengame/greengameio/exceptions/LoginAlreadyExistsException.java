package io.greengame.greengameio.exceptions;

public class LoginAlreadyExistsException extends RuntimeException {
    public LoginAlreadyExistsException(String msg) {
        super(msg);
    }
}
