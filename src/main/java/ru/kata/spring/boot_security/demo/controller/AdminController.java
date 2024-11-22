package ru.kata.spring.boot_security.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.util.List;
import java.util.Set;

@RestController
public class AdminController {

    private final UserServiceImpl userService;
    private final RoleServiceImpl roleService;

    public AdminController(UserServiceImpl userService, RoleServiceImpl roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/js/users")
    public ResponseEntity<List<User>> getUsers() {
        System.out.println("User request: " + userService.getAllUsers());
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/js/roles")
    public ResponseEntity<Set<Role>> getRoles() {
        System.out.println("User request: ");
        return ResponseEntity.ok(roleService.findAllRole());
    }

    @PostMapping("/js/saveUser")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        System.out.println("Saving a user: " + user);
        userService.saveUser(user);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/js/editUser")
    public ResponseEntity<User> editUser(@RequestBody User user) {
        System.out.println("Edit user: " + user);
        userService.updateUser(user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/js/deleteUser")
    public ResponseEntity<User> deleteUser(@RequestBody User user) {
        System.out.println("Delete user: " + user);
        userService.removeUserById(user.getId());
        return ResponseEntity.ok(user);
    }


}
