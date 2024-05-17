package com.example.canteenfoodordering.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Menu {
    private Long id;
    private String name;
    private String description;
    private Double price;
}
