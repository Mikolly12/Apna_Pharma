package com.backend.apnapharma.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.apnapharma.entities.Category;

@Repository
public interface CategoryRepository  extends JpaRepository<Category, UUID> {
}
