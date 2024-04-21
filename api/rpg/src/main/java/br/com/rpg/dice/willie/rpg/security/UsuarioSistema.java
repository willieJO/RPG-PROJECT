package br.com.rpg.dice.willie.rpg.security;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import br.com.rpg.dice.willie.rpg.model.UsuarioDTO;

public class UsuarioSistema extends User {

    private static final long serialVersionUID = 1L;
    private UsuarioDTO usuario;

    public UsuarioSistema(UsuarioDTO usuario) {
        super(usuario.getEmail(), usuario.getSenha(), getGrantedAuthorities());
        this.usuario = usuario;
    }

    public UsuarioDTO getUsuario() {
        return usuario;
    }

    private static Collection<? extends GrantedAuthority> getGrantedAuthorities() {
        // Concedendo todas as autorizações
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"));
    }
}
