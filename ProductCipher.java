import java.util.*;

public class ProductCipher {

    
    public static String caesarEncrypt(String text, int shift) {
        StringBuilder result = new StringBuilder();
        shift = shift % 26;

        for (char c : text.toCharArray()) {
            if (Character.isUpperCase(c)) {
                result.append((char) ((c - 'A' + shift) % 26 + 'A'));
            } else if (Character.isLowerCase(c)) {
                result.append((char) ((c - 'a' + shift) % 26 + 'a'));
            } else {
                result.append(c); 
            }
        }
        return result.toString();
    }

    public static String caesarDecrypt(String text, int shift) {
        return caesarEncrypt(text, 26 - (shift % 26));
    }

    // Second layer: Monoalphabetic substitution
    private static final String ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String SUBSTITUTION = "QWERTYUIOPASDFGHJKLZXCVBNM"; 
    // You can randomize this for stronger security

    public static String monoEncrypt(String text) {
        StringBuilder result = new StringBuilder();
        for (char c : text.toCharArray()) {
            if (Character.isUpperCase(c)) {
                int index = ALPHABET.indexOf(c);
                result.append(SUBSTITUTION.charAt(index));
            } else if (Character.isLowerCase(c)) {
                int index = ALPHABET.indexOf(Character.toUpperCase(c));
                result.append(Character.toLowerCase(SUBSTITUTION.charAt(index)));
            } else {
                result.append(c);
            }
        }
        return result.toString();
    }

    public static String monoDecrypt(String text) {
        StringBuilder result = new StringBuilder();
        for (char c : text.toCharArray()) {
            if (Character.isUpperCase(c)) {
                int index = SUBSTITUTION.indexOf(c);
                result.append(ALPHABET.charAt(index));
            } else if (Character.isLowerCase(c)) {
                int index = SUBSTITUTION.indexOf(Character.toUpperCase(c));
                result.append(Character.toLowerCase(ALPHABET.charAt(index)));
            } else {
                result.append(c);
            }
        }
        return result.toString();
    }

    
    public static String productEncrypt(String plaintext, int shift) {
        String step1 = caesarEncrypt(plaintext, shift);
        return monoEncrypt(step1);
    }

    public static String productDecrypt(String ciphertext, int shift) {
        String step1 = monoDecrypt(ciphertext);
        return caesarDecrypt(step1, shift);
    }


    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter plaintext: ");
        String plaintext = sc.nextLine();

        int shift = 3; // Caesar shift value
        String encrypted = productEncrypt(plaintext, shift);
        String decrypted = productDecrypt(encrypted, shift);

        System.out.println("Plaintext  : " + plaintext);
        System.out.println("Encrypted  : " + encrypted);
        System.out.println("Decrypted  : " + decrypted);

        sc.close();
    }
}
