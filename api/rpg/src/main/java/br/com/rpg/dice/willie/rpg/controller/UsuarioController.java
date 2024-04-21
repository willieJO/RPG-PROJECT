package br.com.rpg.dice.willie.rpg.controller;

import java.util.List;

import javax.annotation.security.PermitAll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.rpg.dice.willie.rpg.model.UsuarioDTO;
import br.com.rpg.dice.willie.rpg.repository.UsuarioRepository;
import br.com.rpg.dice.willie.rpg.service.UsuarioService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/Usuario")

public class UsuarioController {
    @Autowired
	private UsuarioRepository usuarioRepository;
	@Autowired
	private UsuarioService _UsuarioService;
    @GetMapping("ObterLista")
	public List<UsuarioDTO> ObterLista(){
		return usuarioRepository.findAll();
	}
	@PostMapping("SalvarUsuario")
	@PermitAll
	public ResponseEntity<?> SalvarUsuario(@RequestBody UsuarioDTO usuario) {
		return _UsuarioService.SalvarUsuario(usuario);
	}
	
}
