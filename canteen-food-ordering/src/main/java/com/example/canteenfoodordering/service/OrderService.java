package com.example.canteenfoodordering.service;

import com.example.canteenfoodordering.model.Order;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final List<Order> orders = new ArrayList<>();

    public String placeOrder(Order order) {
        // Simulate payment process (dummy payment)
        boolean paymentSuccessful = simulatePayment();

        if (paymentSuccessful) {
            // If payment is successful, confirm the order and add it to the list of orders
            orders.add(order);
            return "Order placed successfully. Your order will be delivered shortly.";
        } else {
            // If payment fails, return an error message
            return "Payment failed. Please try again.";
        }
    }

    private boolean simulatePayment() {
        // Simulate payment process
        // For demonstration purposes, generate a random number
        // If the number is even, consider payment successful; otherwise, payment failed

        // Generate a random number between 1 and 10
        int randomNumber = (int) (Math.random() * 10) + 1;

        // Simulate payment success for even numbers
        return randomNumber % 2 == 0;
    }


    // Implement other order-related operations as needed
}
