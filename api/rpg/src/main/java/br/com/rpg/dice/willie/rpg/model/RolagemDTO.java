package br.com.rpg.dice.willie.rpg.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import java.util.Date;
@Table(name = "rolagem")
@Entity
public class RolagemDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String tipo_dado;
    private String multiplicador;
    private String soma;
    private String resultado;
    private Integer jogada_numero;
    private String resultado_modificacao;
    private Date add_date;
    @ManyToOne
    @JoinColumn(name = "usuario_id") 
    private UsuarioDTO usuario;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getTipo_dado() {
        return tipo_dado;
    }
    public void setTipo_dado(String tipo_dado) {
        this.tipo_dado = tipo_dado;
    }
    public String getMultiplicador() {
        return multiplicador;
    }
    public void setMultiplicador(String multiplicador) {
        this.multiplicador = multiplicador;
    }
    public String getSoma() {
        return soma;
    }
    public void setSoma(String soma) {
        this.soma = soma;
    }
    public String getResultado() {
        return resultado;
    }
    public void setResultado(String resultado) {
        this.resultado = resultado;
    }
    public Integer getJogada_numero() {
        return jogada_numero;
    }
    public void setJogada_numero(Integer jogada_numero) {
        this.jogada_numero = jogada_numero;
    }
    public String getResultado_modificacao() {
        return resultado_modificacao;
    }
    public void setResultado_modificacao(String resultado_modificacao) {
        this.resultado_modificacao = resultado_modificacao;
    }
    public Date getAdd_date() {
        return add_date;
    }
    public void setAdd_date(Date add_date) {
        this.add_date = add_date;
    }
    public UsuarioDTO getUsuario() {
        return usuario;
    }
    public void setUsuario(UsuarioDTO usuario) {
        this.usuario = usuario;
    } 

}
