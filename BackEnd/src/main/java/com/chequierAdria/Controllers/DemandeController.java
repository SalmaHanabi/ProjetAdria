package com.chequierAdria.Controllers;

import java.security.Principal;
import java.time.LocalDate;
import java.util.Collection;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequierAdria.Entities.Compte;
import com.chequierAdria.Entities.Demande;
import com.chequierAdria.Services.CompteService;
import com.chequierAdria.Services.DemandeService;
import com.chequierAdria.Services.MapValidationErrorService;

@RestController
@RequestMapping("api/demande")
@CrossOrigin
public class DemandeController 
{
	@Autowired
	DemandeService demandeService;
	@Autowired
	CompteService compteService;
	@Autowired
	MapValidationErrorService mapValidationService;
	
	@PostMapping("/ajouter")
	public ResponseEntity<?> addSubscriber(@Valid @RequestBody Demande dmnd,BindingResult bindingResult)
	{
		ResponseEntity<?> errorMap=mapValidationService.mapValidationService(bindingResult);
		if(errorMap!=null) return errorMap;
		Demande demande=demandeService.save(dmnd);
		return new ResponseEntity<Demande>(demande, HttpStatus.CREATED);
	}

    @GetMapping("/all/accounts")
    ResponseEntity<?> getAllAccounts(Principal principal)
    {
        Iterable<Compte> accounts = compteService.findAllAccounts(principal.getName());
        return new ResponseEntity<Iterable<Compte>>(accounts,HttpStatus.OK);
    }

    @GetMapping("/DemandeById")
    ResponseEntity<?> getDemandeById(@Param(value="id") Long id )
    {
       Demande demande =demandeService.findDemand(id);
       return new ResponseEntity<Demande>(demande,HttpStatus.OK);
    }
    
    
    @GetMapping("/all")
    ResponseEntity<?> getAllDemands(Principal principal)
    {
       Collection<Demande> demande =demandeService.findDemandeBySubscriber(principal.getName());
       return new ResponseEntity<Collection<Demande>>(demande,HttpStatus.OK);
    }
    

    @GetMapping("/account")
    ResponseEntity<?> getDemandsByAccount(@Param(value="numCompte") int numCompte)
    {
        Collection<Demande> demande =demandeService.findDemandByAccount(numCompte);
        return new ResponseEntity<Collection<Demande>>(demande,HttpStatus.OK);
    }
    @GetMapping("/account/statusAccount")
    ResponseEntity<?> getDemandsByStatusAndAccount(@Param(value="numCompte") int numCompte,@Param(value="status") String status)
    {
       
        Collection<Demande> demande =demandeService.findDemandByStatusAndAccount(numCompte,status);
        return new ResponseEntity<Collection<Demande>>(demande,HttpStatus.OK);
       
    }
    @GetMapping("/account/numDates")
    ResponseEntity<?> getDemandsByCreationDateAndAccount(@Param(value="dateCreation") String dateCreation,@Param(value="dateEnvoie") String dateEnvoie,@Param(value="numCompte") int numCompte)
    {
  	   LocalDate date_a=LocalDate.parse(dateCreation).plusDays(1);
       LocalDate date_b=date_a;
        Collection<Demande> demande =demandeService.findDemandByCreationDateAndAccount(date_a,date_b,numCompte);
        return new ResponseEntity<Collection<Demande>>(demande,HttpStatus.OK);
    }
    @GetMapping("/account/numStatusDates")
    ResponseEntity<?> getDemandsByStatusAndCreationDate(@Param(value="numCompte") int numCompte,@Param(value="status") String status,@Param(value="dateCreation") String dateCreation,@Param(value="dateEnvoie") String dateEnvoie)
    {
    	   LocalDate date_a=LocalDate.parse(dateCreation).plusDays(1);
           LocalDate date_b=date_a;
        Collection<Demande> demande =demandeService.findDemandeByCreationDateAndStatusAndAccount(numCompte,status,date_a,date_b);
        return new ResponseEntity<Collection<Demande>>(demande,HttpStatus.OK);
    }

    @GetMapping("/Usernamestatus")
    ResponseEntity<?> getDemandsByStatus(Principal principal,@Param(value="status") String status)
    {
        Collection<Demande> demande =demandeService.findDemandByStatusAndUsername(principal.getName(),status);
        return new ResponseEntity<Collection<Demande>>(demande,HttpStatus.OK);
    }

    @GetMapping("/usernameDates")
    ResponseEntity<?> getDemandsByCreationDate(Principal principal,@Param(value="dateCreation") String dateCreation,@Param(value="dateEnvoie") String dateEnvoie)
    {
        LocalDate date_a=LocalDate.parse(dateCreation).plusDays(1);
        LocalDate date_b=date_a;
        Collection<Demande> demande =demandeService.findDemandByCreationDateAndUsername(date_a,date_b,principal.getName());
        return new ResponseEntity<Collection<Demande>>(demande,HttpStatus.OK);
    }
    @GetMapping("/usernameStatusDates")
    ResponseEntity<?> getDemandsByStatusAndCreationDate(Principal principal,@Param(value="status") String status,@Param(value="dateCreation") String dateCreation,@Param(value="dateEnvoie") String dateEnvoie)
    { 
        LocalDate date_a=LocalDate.parse(dateCreation).plusDays(1);
        LocalDate date_b=date_a;
       
        Collection<Demande> demande =demandeService.findDemandeByCreationDateAndStatusAndUsername(principal.getName(),status,date_a,date_b);
        return new ResponseEntity<Collection<Demande>>(demande,HttpStatus.OK);
    }
    
    @DeleteMapping("/delete")
    ResponseEntity<?> deletedemandes(@Param(value="id")Long id)
    {
    	demandeService.deleteDemandeByIdentifier(id);
    	return new ResponseEntity<String>("Deleted",HttpStatus.OK);	
    }




	
}
