package com.chequierAdria.Repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import com.chequierAdria.Entities.Abonne;

@RepositoryRestResource
@Repository

public interface AbonneRepository extends CrudRepository<Abonne,Long>
{
	Abonne getById(Long id);
	Abonne findByUsername(String username);
}
