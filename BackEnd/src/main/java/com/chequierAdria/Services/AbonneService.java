package com.chequierAdria.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.chequierAdria.Entities.Abonne;
import com.chequierAdria.Exception.UsernameAlreadyExistException;
import com.chequierAdria.Repositories.AbonneRepository;


@Service
public class AbonneService
{
	@Autowired
	AbonneRepository abonneRepository;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	public Abonne save(Abonne abonne)
	{
		try
		{
			abonne.setPassword(bCryptPasswordEncoder.encode(abonne.getPassword()));
			abonne.setUsername(abonne.getUsername());
			return abonneRepository.save(abonne);
		}
		catch(Exception e)
		{
			throw new UsernameAlreadyExistException("Username"+abonne.getUsername()+"Already Exists");
		}
	}
	public Iterable<Abonne> findAllSubscribers()
	{
        return abonneRepository.findAll();
    }
	
	
	
}
