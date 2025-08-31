package com.canteen.CanteenManagement.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "order_items")
@Data
@NoArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "menu_id", referencedColumnName = "id")
    private MenuItem menuItem;

    private int quantity;   // Number of this item in the order

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
