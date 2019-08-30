package com.chequierAdria.Repositories;

import java.time.LocalDate;
import java.util.Collection;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import com.chequierAdria.Entities.Compte;
import com.chequierAdria.Entities.Demande;

@RepositoryRestResource
@Repository

public interface DemandeRepository extends CrudRepository<Demande,Long>
{
	 Demande findById(long id);
	 Collection<Demande> findByCompte(Compte c);
	 Collection<Demande> findByDateCreation(LocalDate date);
	 Collection<Demande> findByDateCreationBetween(LocalDate date1,LocalDate date2);
	 Collection<Demande> findByDateEnvoie(LocalDate date);
	 Collection<Demande> findByCompteAndStatus(Compte compte,String status);
	 Collection<Demande> findByCompteAndDateCreationBetween(Compte compte,LocalDate date1,LocalDate date2);
	 Collection<Demande> findByCompteAndStatusAndDateCreationBetween(Compte compte,String status,LocalDate date1,LocalDate date2);

}
