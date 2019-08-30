package com.chequierAdria.Services;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chequierAdria.Entities.Compte;
import com.chequierAdria.Entities.Demande;
import com.chequierAdria.Repositories.AbonneRepository;
import com.chequierAdria.Repositories.CompteRepository;
import com.chequierAdria.Repositories.DemandeRepository;

@Service
public class DemandeService
{
	@Autowired
	DemandeRepository demandeRepository;
	@Autowired
	CompteRepository compteRepository;
	@Autowired
	AbonneRepository abonneRepository;
	public Demande save(Demande dmnd)
	{
		return demandeRepository.save(dmnd);
	}

    public Iterable<Demande> findAllDemands()
    {
    	return demandeRepository.findAll();
    }
    
    
   
    
    public Demande findDemand(long id)
    {
    	return demandeRepository.findById(id);
    }

    public Collection<Demande> findDemandByAccount(int num)
    {
        return demandeRepository.findByCompte(compteRepository.findByNumCompte(num));
    }
    public Collection<Demande> findDemandByCreationDateAndAccount(LocalDate date1, LocalDate date2,int num)
    {
        Compte compte=compteRepository.findByNumCompte(num);
        return demandeRepository.findByCompteAndDateCreationBetween(compte,date1,date2);
    }
    public Collection<Demande> findDemandByStatusAndAccount(int num,String status)
    {
        Compte compte=compteRepository.findByNumCompte(num);
        return demandeRepository.findByCompteAndStatus(compte,status);
    }

    public Collection<Demande> findDemandeByCreationDateAndStatusAndAccount(int num,String status,LocalDate date1,LocalDate date2)
    {
        Compte compte=compteRepository.findByNumCompte(num);
        return demandeRepository.findByCompteAndStatusAndDateCreationBetween(compte,status,date1,date2);
    }
    public Collection<Demande> findDemandeBySubscriber(String username)
    {
        Collection<Compte> comptes= abonneRepository.findByUsername(username).getComptes();
        List<Demande> demandes=new ArrayList<>();
        comptes.forEach((compte)->demandeRepository.findByCompte(compte).forEach(demande -> demandes.add(demande)));
        return demandes;
    }
    public Collection<Demande> findDemandByCreationDateAndUsername(LocalDate date1, LocalDate date2,String username)
    {
        Collection<Compte> comptes= abonneRepository.findByUsername(username).getComptes();
        List<Demande> demandes=new ArrayList<>();
        comptes.forEach((compte)->demandeRepository.findByCompteAndDateCreationBetween(compte,date1,date2).forEach(demande -> demandes.add(demande)));
        return  demandes;
    }

    public Collection<Demande> findDemandByStatusAndUsername(String username,String status)
    {
        Collection<Compte> comptes= abonneRepository.findByUsername(username).getComptes();
        List<Demande> demandes=new ArrayList<>();
        comptes.forEach((compte)->demandeRepository.findByCompteAndStatus(compte,status).forEach(demande -> demandes.add(demande)));
        return  demandes;
    }
    public Collection<Demande> findDemandeByCreationDateAndStatusAndUsername(String username,String status,LocalDate date1,LocalDate date2)
    {
        Collection<Compte> comptes= abonneRepository.findByUsername(username).getComptes();
        List<Demande> demandes=new ArrayList<>();
        comptes.forEach(
        					(compte)->demandeRepository.findByCompteAndStatusAndDateCreationBetween(compte,status,date1,date2).
                forEach(
                        demande -> demandes.add(demande)));
        return demandes;
    }
    public void deleteDemandeByIdentifier(long id)
    {
    	Demande demande=demandeRepository.findById(id);
    	demandeRepository.delete(demande);
    }
}
