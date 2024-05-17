package com.example.canteenfoodordering.model;

import lombok.Data;

import java.util.List;

@Data
public class Order {
    private Long id;
    private String userName;
    private String contactNumber;
    private String deliveryAddress;
    private List<Menu> items; // List of menu items in the order
    private double totalPrice;
}
