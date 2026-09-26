package com.cravebite.repository;
import com.cravebite.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
public interface OrderRepository extends JpaRepository<Order,Long>{}
