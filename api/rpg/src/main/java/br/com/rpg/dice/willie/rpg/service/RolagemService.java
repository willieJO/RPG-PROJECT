package br.com.rpg.dice.willie.rpg.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.rpg.dice.willie.rpg.model.RolagemDTO;
import br.com.rpg.dice.willie.rpg.repository.RolagemRepository;

@Service
public class RolagemService {
    @Autowired
	private RolagemRepository _Repository;

    public ResponseEntity<?> SalvarRolagem(List<RolagemDTO> rolagem) {
        try {
            final Integer maxJogadaNumero = _Repository.findMaxJogadaNumeroByUsuarioId(rolagem.get(0).getUsuario().getId()) + 1;
            rolagem.forEach(rolagemDTO -> rolagemDTO.setJogada_numero(maxJogadaNumero));
            List<RolagemDTO> rolagemSalva = _Repository.saveAll(rolagem);
            return ResponseEntity.ok(rolagemSalva);
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<?> ObterRolagensDoUsuario(Long id ) {
        try {
            List<RolagemDTO> rolagensDoUsaurio = _Repository.findJogadasDoUsuario(id);
            return ResponseEntity.ok(rolagensDoUsaurio);
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
