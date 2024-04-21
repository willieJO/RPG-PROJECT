package br.com.rpg.dice.willie.rpg.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.persistence.Id;
@Entity
@Table(name = "Usuario")
public class UsuarioDTO {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
    @NotNull
	private String nome;
    @NotNull
    private String senha;
    @NotNull
    private String email;
    @Transient
    private String confirmacaoSenha;
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getSenha() {
        return senha;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getConfirmacaoSenha() {
        return confirmacaoSenha;
    }
    public void setConfirmacaoSenha(String confirmacaoSenha) {
        this.confirmacaoSenha = confirmacaoSenha;
    }
    
    
}
