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
        System.out.println("vou pegar o cokie");
        Cookie[] cookies = request.getCookies(); 
        System.out.println("peguei o cokie");
    String accessToken = null;
    if (cookies != null) {
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("refreshToken")) { 
                accessToken = cookie.getValue();
                break;
            }
        }
    }
    if (accessToken != null) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey("williekeyrpg".getBytes()) 
                    .parseClaimsJws(accessToken.replace("Bearer ", ""))
                    .getBody();
                    
                    accessToken = claims.get("user_id").toString();
            return accessToken;
        } catch (Exception e) {
            return "";
        }
    } else {
    }
    return "";
    }
}
