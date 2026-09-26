package com.cravebite.controller;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController
public class HealthController {
 private final JdbcTemplate jdbcTemplate;
 public HealthController(JdbcTemplate j){jdbcTemplate=j;}
 @GetMapping("/") public Map<String,String> root(){return Map.of("service","CraveBite Spring Boot API","status","running");}
 @GetMapping("/health") public Map<String,String> health(){return Map.of("status","ok");}
 @GetMapping("/ready") public Map<String,String> ready(){jdbcTemplate.queryForObject("SELECT 1",Integer.class);return Map.of("status","ready","database","connected");}
}
