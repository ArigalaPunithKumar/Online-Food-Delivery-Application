package com.cravebite.controller;
import com.cravebite.dto.OrderRequest;
import com.cravebite.entity.*;
import com.cravebite.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RestController @RequestMapping("/api") @CrossOrigin(origins="*")
public class ApiController {
 private final MenuItemRepository menuItemRepository; private final OrderRepository orderRepository;
 public ApiController(MenuItemRepository m,OrderRepository o){menuItemRepository=m;orderRepository=o;}
 @GetMapping("/menu") public List<MenuItem> menu(){return menuItemRepository.findByAvailableTrue();}
 @PostMapping("/orders") public ResponseEntity<?> createOrder(@RequestBody OrderRequest request){
  if(request.customerName()==null||request.customerName().isBlank()||request.deliveryAddress()==null||request.deliveryAddress().isBlank()||request.items()==null||request.items().isEmpty()) return ResponseEntity.badRequest().body("Customer name, delivery address and items are required.");
  Order order=new Order(); order.setCustomerName(request.customerName()); order.setCustomerEmail(request.customerEmail()); order.setCustomerPhone(request.customerPhone()); order.setDeliveryAddress(request.deliveryAddress()); order.setTotalAmount(request.totalAmount());
  for(OrderRequest.Item item:request.items()){MenuItem menu=menuItemRepository.findById(item.menuItemId()).orElseThrow(); OrderItem oi=new OrderItem(); oi.setMenuItem(menu); oi.setQuantity(item.quantity()); oi.setPrice(item.price()!=null?item.price():menu.getPrice()); order.addItem(oi);}
  Order saved=orderRepository.save(order); return ResponseEntity.ok(Map.of("orderId",saved.getId(),"status",saved.getStatus()));
 }
}
