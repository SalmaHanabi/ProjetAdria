package com.chequierAdria.Controllers;

import javax.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.chequierAdria.Entities.Abonne;
import com.chequierAdria.Payload.JWTLoginSucessReponse;
import com.chequierAdria.Payload.LoginRequest;
import com.chequierAdria.Security.JWTTokenProvider;
import com.chequierAdria.Services.AbonneService;
import com.chequierAdria.Services.MapValidationErrorService;
import static com.chequierAdria.Security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("api/abonne")
@CrossOrigin
public class AbonneController
{
	@Autowired
	AbonneService abonneService;
    @Autowired
	private JWTTokenProvider tokenProvider;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;
    @Autowired
    private AuthenticationManager authenticationManager;
	@PostMapping("/register")
	ResponseEntity<?> addSubscriber(@Valid @RequestBody Abonne ab,BindingResult result)
	{
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if(errorMap != null)return errorMap;
    	Abonne abonne=abonneService.save(ab);
    	return new ResponseEntity<Abonne>(abonne, HttpStatus.CREATED);
	}
	@GetMapping("/all")
    public Iterable<Abonne> getAllSubscribers()
	{
		return abonneService.findAllSubscribers();
	}
	 @PostMapping("/login")
	 public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
	 ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
	 if(errorMap != null) return errorMap;
	 Authentication authentication = authenticationManager.authenticate(
	 new UsernamePasswordAuthenticationToken(
	     loginRequest.getUsername(),
	     loginRequest.getPassword()));
	     SecurityContextHolder.getContext().setAuthentication(authentication);
	     String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(authentication);

	        return ResponseEntity.ok(new JWTLoginSucessReponse(true, jwt));
	    }
}
