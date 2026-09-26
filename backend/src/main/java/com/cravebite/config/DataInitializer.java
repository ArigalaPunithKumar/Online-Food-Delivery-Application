package com.cravebite.config;

import com.cravebite.entity.MenuItem;
import com.cravebite.repository.MenuItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DataInitializer {
 @Bean CommandLineRunner seedMenu(MenuItemRepository repo){
  return args -> {
   if(repo.count()>0) return;
   repo.saveAll(List.of(
    item("Chicken Biryani","Aromatic basmati rice with spicy chicken","Biryani","249.00","images/chicken-biryani.jpg","Paradise"),
    item("Veg Biryani","Flavorful basmati rice with fresh vegetables","Biryani","199.00","images/veg-biryani.jpg","Bawarchi"),
    item("Chicken Burger","Crispy chicken burger with fresh vegetables","Burgers","149.00","images/chicken-burger.jpg","Burger King"),
    item("Veg Burger","Classic vegetable burger with fresh toppings","Burgers","119.00","images/veg-burger.jpg","Burger King"),
    item("Margherita Pizza","Classic pizza with tomato and mozzarella","Pizza","249.00","images/margherita-pizza.jpg","Dominos"),
    item("Chicken Pizza","Pizza topped with spicy chicken","Pizza","299.00","images/chicken-pizza.jpg","Dominos"),
    item("French Fries","Crispy golden French fries","Fast Food","99.00","images/french-fries.jpg","KFC"),
    item("Chicken Wings","Crispy spicy chicken wings","Fast Food","199.00","images/chicken-wings.jpg","KFC"),
    item("Paneer Tikka","Grilled Indian cottage cheese with spices","Indian","219.00","images/paneer-tikka.jpg","Taj Restaurant"),
    item("Masala Dosa","Crispy dosa served with potato masala","South Indian","129.00","images/masala-dosa.jpg","Saravana Bhavan")
   ));
  };
 }
 private MenuItem item(String n,String d,String c,String p,String image,String restaurant){
  MenuItem m=new MenuItem();m.setName(n);m.setDescription(d);m.setCategory(c);m.setPrice(new BigDecimal(p));m.setImageUrl(image);m.setRestaurantName(restaurant);m.setAvailable(true);return m;
 }
}
