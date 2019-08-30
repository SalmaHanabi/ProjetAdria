package com.chequierAdria.Entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


@Entity(name="abonne")
@Table(name="abonne")
public class Abonne implements Serializable,UserDetails
{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@NotBlank(message="first name is required")
	private String nom;
	@NotBlank(message="last name is required")
	private String prenom;
	@NotBlank(message="username  is required")
	@Column(unique = true)
	@Size(min=4,max=10,message="plz use 4 to 10 characters")
	private String username;
	@NotBlank(message="password is required")
	private String password;
	@JsonIgnore
	@OneToMany(mappedBy="abonne",fetch=FetchType.EAGER)
	private Collection<Compte> comptes;
	
	//getters & setters 
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getPrenom() {
		return prenom;
	}
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	public Collection<Compte> getComptes() {
		return comptes;
	}
	public void setComptes(Collection<Compte> comptes) {
		this.comptes = comptes;
	}
	
	public Abonne() {
		super();
	}
	public Abonne(String nom, String prenom, String username, String password) 
	{
		super();
		this.nom = nom;
		this.prenom = prenom;
		this.username = username;
		this.password = password;
	}
	@Override
	public String toString() {
		return "Abonne [id=" + id + ", nom=" + nom + ", prenom=" + prenom + ", username=" + username + ", password="
				+ password + "]";
	}
	public Abonne(String nom, String prenom, String username, String password, Collection<Compte> comptes) {
		super();
		this.nom = nom;
		this.prenom = prenom;
		this.username = username;
		this.password = password;
		this.comptes = comptes;
	}
	@Override
	@JsonIgnore
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}
	@Override
	@JsonIgnore
	public boolean isAccountNonExpired() {
		return true;
	}
	@Override
	@JsonIgnore
	public boolean isAccountNonLocked() {
		return true;
	}
	@Override
	@JsonIgnore
	public boolean isCredentialsNonExpired() {
		return true;
	}
	@Override
	@JsonIgnore
	public boolean isEnabled() {
		return true;
	}
}

	

