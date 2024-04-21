package br.com.rpg.dice.willie.rpg.security;

import java.util.Collection;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.rpg.dice.willie.rpg.model.UsuarioDTO;
import br.com.rpg.dice.willie.rpg.repository.UsuarioRepository;

@Service
public class AppUserDetailsService implements UserDetailsService {

	@Autowired
	private UsuarioRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Optional<UsuarioDTO> userOptional = userRepository.findByEmail(email);
		UsuarioDTO user = userOptional.orElseThrow(() -> new UsernameNotFoundException("Usuário e/ou senha incorretos"));
		return new UsuarioSistema(user);
	}

	/* TODO 
        // Caso precise implementar permissão colocar aqui
    private Collection<? extends GrantedAuthority> getPermissions(UsuarioDTO user) {
		Set<SimpleGrantedAuthority> authorities = new HashSet<>();
		user.getPermissao().forEach(
				p -> authorities.add(
						new SimpleGrantedAuthority(p.getDescricao().toUpperCase())));
		return authorities;
	}*/

}	
