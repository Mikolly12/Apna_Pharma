package com.backend.apnapharma.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductVariantDto {

	private UUID id;
    private String size;
    private Integer stockQuantity;
}
