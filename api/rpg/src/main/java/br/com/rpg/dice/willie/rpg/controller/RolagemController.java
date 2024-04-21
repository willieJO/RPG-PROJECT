package br.com.rpg.dice.willie.rpg.controller;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.security.PermitAll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.rpg.dice.willie.rpg.model.RolagemDTO;
import br.com.rpg.dice.willie.rpg.model.UsuarioDTO;
import br.com.rpg.dice.willie.rpg.repository.UsuarioRepository;
import br.com.rpg.dice.willie.rpg.service.RolagemService;
import br.com.rpg.dice.willie.rpg.service.UsuarioService;
import br.com.rpg.dice.willie.rpg.util.Utilidades;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/Rolagem")
public class RolagemController {

	@Autowired
	private RolagemService _Service;
   
	@GetMapping("ObterRolagensDoUsuario")
	public ResponseEntity<?> ObterRolagensDoUsuario(HttpServletRequest request) {
		Long userId = Long.parseLong(Utilidades.getInstance().getUserIdFromRequest(request));
		return _Service.ObterRolagensDoUsuario(userId);
	}
	
	@PostMapping("SalvarRolagem")
	public ResponseEntity<?> SalvarRolagem(@RequestBody List<RolagemDTO> rolagem, HttpServletRequest  request) {
		Long userId = Long.parseLong(Utilidades.getInstance().getUserIdFromRequest(request));
		rolagem.stream()
            .map(rolagemDTO -> {
                UsuarioDTO usuarioDTO = new UsuarioDTO();
                usuarioDTO.setId(userId); 
                rolagemDTO.setUsuario(usuarioDTO); 
                return rolagemDTO;
            })
            .collect(Collectors.toList());
		return _Service.SalvarRolagem(rolagem);
	}
}
