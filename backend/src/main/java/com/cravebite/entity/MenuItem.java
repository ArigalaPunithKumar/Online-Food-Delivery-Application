package com.cravebite.entity;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Entity @Table(name="menu_items")
public class MenuItem {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,length=150) private String name;
 @Column(columnDefinition="TEXT") private String description;
 @Column(nullable=false,length=100) private String category;
 @Column(nullable=false,precision=10,scale=2) private BigDecimal price;
 @Column(name="image_url",length=500) private String imageUrl;
 @Column(name="restaurant_name",length=150) private String restaurantName;
 private Boolean available=true;
 @Column(name="created_at") private LocalDateTime createdAt;
 @PrePersist void prePersist(){if(createdAt==null)createdAt=LocalDateTime.now();}
 public Long getId(){return id;} public String getName(){return name;} public String getDescription(){return description;} public String getCategory(){return category;} public BigDecimal getPrice(){return price;} public String getImageUrl(){return imageUrl;} public String getRestaurantName(){return restaurantName;} public Boolean getAvailable(){return available;}
 public void setName(String v){name=v;} public void setDescription(String v){description=v;} public void setCategory(String v){category=v;} public void setPrice(BigDecimal v){price=v;} public void setImageUrl(String v){imageUrl=v;} public void setRestaurantName(String v){restaurantName=v;} public void setAvailable(Boolean v){available=v;}
}
