
package com.playstore.owner_service;

import java.security.SecureRandom;
import java.util.Base64;

public class GenerateSecret {
    public static void main(String[] args) {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        System.out.println(Base64.getEncoder().encodeToString(bytes));
    }
}
