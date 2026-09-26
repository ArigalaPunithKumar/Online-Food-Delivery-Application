package com.cravebite.entity;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
@Entity @Table(name="orders")
public class Order {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(name="customer_name",nullable=false,length=150) private String customerName;
 @Column(name="customer_email",length=200) private String customerEmail;
 @Column(name="customer_phone",length=20) private String customerPhone;
 @Column(name="delivery_address",nullable=false,columnDefinition="TEXT") private String deliveryAddress;
 @Column(name="total_amount",nullable=false,precision=10,scale=2) private BigDecimal totalAmount;
 @Column(nullable=false,length=50) private String status="PLACED";
 @Column(name="created_at") private LocalDateTime createdAt;
 @OneToMany(mappedBy="order",cascade=CascadeType.ALL,orphanRemoval=true) private List<OrderItem> items=new ArrayList<>();
 @PrePersist void prePersist(){if(createdAt==null)createdAt=LocalDateTime.now();}
 public Long getId(){return id;} public String getCustomerName(){return customerName;} public String getCustomerEmail(){return customerEmail;} public String getCustomerPhone(){return customerPhone;} public String getDeliveryAddress(){return deliveryAddress;} public BigDecimal getTotalAmount(){return totalAmount;} public String getStatus(){return status;} public List<OrderItem> getItems(){return items;}
 public void setCustomerName(String v){customerName=v;} public void setCustomerEmail(String v){customerEmail=v;} public void setCustomerPhone(String v){customerPhone=v;} public void setDeliveryAddress(String v){deliveryAddress=v;} public void setTotalAmount(BigDecimal v){totalAmount=v;} public void addItem(OrderItem item){items.add(item);item.setOrder(this);}
}
