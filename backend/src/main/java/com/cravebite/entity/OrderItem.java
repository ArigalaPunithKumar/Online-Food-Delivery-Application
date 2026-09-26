package com.cravebite.entity;
import jakarta.persistence.*;
import java.math.BigDecimal;
@Entity @Table(name="order_items")
public class OrderItem {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @ManyToOne(fetch=FetchType.LAZY,optional=false) @JoinColumn(name="order_id",nullable=false) private Order order;
 @ManyToOne(fetch=FetchType.LAZY,optional=false) @JoinColumn(name="menu_item_id",nullable=false) private MenuItem menuItem;
 @Column(nullable=false) private Integer quantity;
 @Column(nullable=false,precision=10,scale=2) private BigDecimal price;
 public void setOrder(Order v){order=v;} public void setMenuItem(MenuItem v){menuItem=v;} public void setQuantity(Integer v){quantity=v;} public void setPrice(BigDecimal v){price=v;}
}
