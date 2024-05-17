package com.example.canteenfoodordering.controller;

import com.example.canteenfoodordering.model.Order;
import com.example.canteenfoodordering.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/place-order")
    public String placeOrder(@RequestBody Order order) {
        return orderService.placeOrder(order);
    }
}
