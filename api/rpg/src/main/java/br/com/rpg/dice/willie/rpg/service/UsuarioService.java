package br.com.rpg.dice.willie.rpg.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.rpg.dice.willie.rpg.model.UsuarioDTO;
import br.com.rpg.dice.willie.rpg.repository.UsuarioRepository;

@Service
public class UsuarioService {
    @Autowired
	private UsuarioRepository _UsuarioRepository;
    
    public ResponseEntity<?> SalvarUsuario(UsuarioDTO usuario) {
        try {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		    var senhaCriptografada = encoder.encode(usuario.getSenha());
		    usuario.setSenha(senhaCriptografada);
            UsuarioDTO usuarioSalvo = _UsuarioRepository.save(usuario);
            return ResponseEntity.ok(usuarioSalvo);
        } catch(DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("E-mail já cadastrado.");
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
