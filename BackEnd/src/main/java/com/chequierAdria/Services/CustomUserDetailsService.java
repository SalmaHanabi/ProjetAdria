package com.chequierAdria.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chequierAdria.Entities.Abonne;
import com.chequierAdria.Repositories.AbonneRepository;
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AbonneRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Abonne user = userRepository.findByUsername(username);
        if(user==null) new UsernameNotFoundException("User not found");
        return user;
    }


    @Transactional
    public Abonne loadUserById(Long id){
    	Abonne user = userRepository.getById(id);
        if(user==null) new UsernameNotFoundException("User not found");
        return user;

    }
}