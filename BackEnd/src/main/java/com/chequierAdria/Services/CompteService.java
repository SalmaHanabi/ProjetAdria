package com.chequierAdria.Services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chequierAdria.Entities.Abonne;
import com.chequierAdria.Entities.Compte;
import com.chequierAdria.Repositories.AbonneRepository;
import com.chequierAdria.Repositories.CompteRepository;

@Service
public class CompteService 
{
	@Autowired
	CompteRepository compteRepository;
	@Autowired
	AbonneRepository abonneRepository;
	public Compte save(Compte cpt)
	{
		return compteRepository.save(cpt); 
	}
	public Iterable<Compte> findAllAccounts(String username)
	{
        Abonne abonne=abonneRepository.findByUsername(username);
        return compteRepository.findByAbonne(abonne);
    }

}
