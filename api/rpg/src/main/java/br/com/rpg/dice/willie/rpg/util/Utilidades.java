package br.com.rpg.dice.willie.rpg.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class Utilidades {
    private static Utilidades instance;

    private Utilidades() {
    }

    public static synchronized Utilidades getInstance() {
        if (instance == null) {
            instance = new Utilidades();
        }
        return instance;
    }

    public String getUserIdFromRequest(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies(); 
        String accessToken = request.getHeader("Token");
        System.out.println("Token: " + accessToken);
        if (accessToken != null) {
            try {
                // Remover o prefixo "Bearer " se ele estiver presente
                if (accessToken.startsWith("Bearer ")) {
                    accessToken = accessToken.substring(7); // Remove "Bearer "
                }
                
                // Parse do token JWT
                Claims claims = Jwts.parser()
                        .setSigningKey("williekeyrpg".getBytes()) // Sua chave secreta
                        .parseClaimsJws(accessToken)
                        .getBody();
                        
                // Obter o ID do usuário do token
                return claims.get("user_id").toString();
            } catch (Exception e) {
                // Lidar com exceções de parsing
                e.printStackTrace();
                return "";
            }
        }
        
        return "";
    }
}
