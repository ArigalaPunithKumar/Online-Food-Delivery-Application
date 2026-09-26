package com.cravebite.repository;
import com.cravebite.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface MenuItemRepository extends JpaRepository<MenuItem,Long>{List<MenuItem> findByAvailableTrue();}
