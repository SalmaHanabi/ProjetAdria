package com.chequierAdria.Controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequierAdria.Entities.Compte;
import com.chequierAdria.Services.CompteService;

@RestController
@RequestMapping("/api/compte")
@CrossOrigin
public class CompteController 
{
	@Autowired
	CompteService compteService;
	
	@PostMapping("")
	ResponseEntity<Compte> addSubscriber(@Valid @RequestBody Compte cpt)
	{
		Compte compte=compteService.save(cpt);
		return new ResponseEntity<Compte>(compte, HttpStatus.CREATED);
	}

}
