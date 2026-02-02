package com.backend.apnapharma.specification;

import java.util.UUID;

import org.springframework.data.jpa.domain.Specification;

import com.backend.apnapharma.entities.Product;

public class ProductSpecification {
	public static Specification<Product> hasCategoryId(UUID categorId){
        return  (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("category").get("id"),categorId);
    }

    public static Specification<Product> hasCategoryTypeId(UUID typeId){
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("categoryType").get("id"),typeId);
    }
}
