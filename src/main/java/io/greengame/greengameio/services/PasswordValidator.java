package io.greengame.greengameio.services;

public class PasswordValidator {
    public static boolean validatePassword(String password) {
        if(password.length() < 8) {
            return false;
        }

        boolean containsLowerCase  = false;
        boolean containsUpperCase  = false;

        for(int i = 0; i < password.length(); i++) {
            if(Character.isLowerCase(password.charAt(i))) {
                containsLowerCase = true;
            }
            if(Character.isUpperCase(password.charAt(i))) {
                containsUpperCase = true;
            }
        }

        return containsLowerCase && containsUpperCase;
    }
}
