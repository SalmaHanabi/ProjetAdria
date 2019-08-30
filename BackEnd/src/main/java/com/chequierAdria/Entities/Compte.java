package com.chequierAdria.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.*;


@Entity
public class Compte implements Serializable
{	
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int numCompte;
	private double soldeCompte;
	private double soldeComptable;
	private boolean beneficiaire;
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="ID_ABN")
	private Abonne abonne;
	@JsonIgnore
	@OneToMany(mappedBy="compte")
	private Collection<Demande> demandes;
	
	//getters & setters 
	
	public int getNumCompte() {
		return numCompte;
	}
	public void setNumCompte(int numCompte) {
		this.numCompte = numCompte;
	}
	public double getSoldeCompte() {
		return soldeCompte;
	}
	public void setSoldeCompte(double soldeCompte) {
		this.soldeCompte = soldeCompte;
	}
	public double getSoldeComptable() {
		return soldeComptable;
	}
	public void setSoldeComptable(double soldeComptable) {
		this.soldeComptable = soldeComptable;
	}
	public boolean isBeneficiaire() { return beneficiaire; }
	public void setBeneficiaire(boolean beneficiaire) { this.beneficiaire = beneficiaire; }
	public Abonne getAbonne() {
		return abonne;
	}
	public void setAbonne(Abonne abonne) {
		this.abonne = abonne;
	}
	public Collection<Demande> getDemandes() {
		return demandes;
	}
	public void setDemandes(Collection<Demande> demandes) {
		this.demandes = demandes;
	}
	public Compte() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Compte(int numCompte, double soldeCompte, double soldeComptable, boolean beneficiaire) {
		super();
		this.numCompte = numCompte;
		this.soldeCompte = soldeCompte;
		this.soldeComptable = soldeComptable;
		this.beneficiaire=beneficiaire;
	}
	@Override
	public String toString() {
		return "numCompte=" + numCompte + ", soldeCompte=" + soldeCompte + ", soldeComptable="
				+ soldeComptable + ", abonne=" + abonne + "]";
	}




}
