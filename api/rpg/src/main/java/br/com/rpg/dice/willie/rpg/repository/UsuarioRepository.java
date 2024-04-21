package br.com.rpg.dice.willie.rpg.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.rpg.dice.willie.rpg.model.UsuarioDTO;

public interface UsuarioRepository extends JpaRepository<UsuarioDTO,Long>{
	public Optional<UsuarioDTO> findByEmail(String email);
}
