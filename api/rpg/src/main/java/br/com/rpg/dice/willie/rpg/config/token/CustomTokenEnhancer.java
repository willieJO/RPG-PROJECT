package br.com.rpg.dice.willie.rpg.config.token;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;

import br.com.rpg.dice.willie.rpg.security.UsuarioSistema;


public class CustomTokenEnhancer implements TokenEnhancer {

	@Override
	public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
		UsuarioSistema usuarioSistema = (UsuarioSistema) authentication.getPrincipal();
		
		Map<String, Object> addInfo = new HashMap<>();
		addInfo.put("user_id", usuarioSistema.getUsuario().getId());
		addInfo.put("name", usuarioSistema.getUsuario().getNome());
		((DefaultOAuth2AccessToken)accessToken)
			.setAdditionalInformation(addInfo);
		return accessToken;
	}

}
