package com.example.sbrest.config;

import com.example.sbrest.model.Product;
import com.example.sbrest.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Initialize sample products
        if (productRepository.count() == 0) {
            createSampleProducts();
        }
    }
    
    private void createSampleProducts() {
        Product product1 = new Product(
            "Laptop Pro 15",
            "High-performance laptop with 16GB RAM and 512GB SSD",
            new BigDecimal("1299.99"),
            "Electronics"
        );
        product1.setStockQuantity(50);
        productRepository.save(product1);
        
        Product product2 = new Product(
            "Wireless Mouse",
            "Ergonomic wireless mouse with 2.4GHz connectivity",
            new BigDecimal("29.99"),
            "Electronics"
        );
        product2.setStockQuantity(100);
        productRepository.save(product2);
        
        Product product3 = new Product(
            "Office Chair",
            "Comfortable ergonomic office chair with lumbar support",
            new BigDecimal("199.99"),
            "Furniture"
        );
        product3.setStockQuantity(25);
        productRepository.save(product3);
        
        Product product4 = new Product(
            "Coffee Mug",
            "Ceramic coffee mug with company logo",
            new BigDecimal("12.99"),
            "Accessories"
        );
        product4.setStockQuantity(200);
        productRepository.save(product4);
        
        Product product5 = new Product(
            "Standing Desk",
            "Adjustable height standing desk for home office",
            new BigDecimal("399.99"),
            "Furniture"
        );
        product5.setStockQuantity(15);
        productRepository.save(product5);
    }
}
