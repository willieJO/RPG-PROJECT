package br.com.rpg.dice.willie.rpg.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.rpg.dice.willie.rpg.model.RolagemDTO;

public interface RolagemRepository extends JpaRepository<RolagemDTO,Long>{
    @Query("SELECT COALESCE(MAX(r.jogada_numero), 0) FROM RolagemDTO r WHERE r.usuario.id = :usuario_id")
    Integer findMaxJogadaNumeroByUsuarioId(@Param("usuario_id") Long usuario_id);

    @Query(nativeQuery = true, value = "SELECT  * FROM rolagem r WHERE r.usuario_id = :usuario_id ORDER BY id DESC LIMIT 500")
    List<RolagemDTO> findJogadasDoUsuario(@Param("usuario_id") Long usuario_id);

}

