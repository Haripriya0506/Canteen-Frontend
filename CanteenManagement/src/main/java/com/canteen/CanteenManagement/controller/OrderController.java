package com.canteen.CanteenManagement.controller;

import com.canteen.CanteenManagement.model.Order;
import com.canteen.CanteenManagement.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    // USER and ADMIN can create orders
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping
    @Transactional
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        if (order.getItems() != null) {
            order.getItems().forEach(item -> item.setOrder(order));
        }
        Order savedOrder = orderRepository.save(order);
        return ResponseEntity.ok(savedOrder);
    }

    // Only ADMIN can view all orders
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    @Transactional(readOnly = true)
    public ResponseEntity<Iterable<Order>> getAllOrders() {
        Iterable<Order> orders = orderRepository.findAll();
        return ResponseEntity.ok(orders);
    }

    // USER and ADMIN can view specific order by id
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Optional<Order> order = orderRepository.findById(id);
        return order.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // USER and ADMIN can update order by id
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order updatedOrder) {
        Optional<Order> existingOrderOpt = orderRepository.findById(id);

        if (existingOrderOpt.isPresent()) {
            Order existingOrder = existingOrderOpt.get();

            existingOrder.setStatus(updatedOrder.getStatus());
            existingOrder.setTotalPrice(updatedOrder.getTotalPrice());

            if (updatedOrder.getUser() != null) {
                existingOrder.setUser(updatedOrder.getUser());
            }

            if (updatedOrder.getItems() != null) {
                existingOrder.getItems().clear();
                updatedOrder.getItems().forEach(item -> {
                    item.setOrder(existingOrder);
                    existingOrder.getItems().add(item);
                });
            }

            Order savedOrder = orderRepository.save(existingOrder);
            return ResponseEntity.ok(savedOrder);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Only ADMIN can delete order
    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        if (!orderRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        orderRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
