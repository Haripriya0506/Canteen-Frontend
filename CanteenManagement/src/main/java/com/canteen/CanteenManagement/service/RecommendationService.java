package com.canteen.CanteenManagement.service;

import com.canteen.CanteenManagement.model.Order;
import com.canteen.CanteenManagement.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RecommendationService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private WeatherService weatherService;

    public String suggestItem(Long userId, String city) {
        List<Order> orders = orderRepository.findTop10ByUserIdOrderByOrderDateDesc(userId);
        boolean likesCold = orders.stream().anyMatch(order ->
                order.getItems().stream()
                        .anyMatch(item -> item.getMenuItem().getName().toLowerCase().contains("ice cream") ||
                                item.getMenuItem().getName().toLowerCase().contains("cool")));
        double temp = weatherService.getCurrentTemperature(city);

        if (temp > 30 && likesCold) {
            return "It's hot outside! Enjoy a cold ice cream or a cool drink.";
        } else if (temp > 30) {
            return "Try a refreshing cool drink!";
        } else if (temp < 15) {
            return "Stay warm with our hot snacks!";
        } else {
            return "Check out today's specials in the canteen!";
        }
    }
}
