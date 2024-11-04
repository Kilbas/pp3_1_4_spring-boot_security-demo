package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.security.Principal;
import java.util.List;
import java.util.Set;

@RestController
public class Controller {

    final private UserServiceImpl userService;
    final private RoleServiceImpl roleService;

    @Autowired
    public Controller(UserServiceImpl userService, RoleServiceImpl roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/js/user")
    public ResponseEntity<User> getUser(Principal principal) {
        System.out.println("User request: " + userService.getUserByLogin(principal.getName()));
        return ResponseEntity.ok(userService.getUserByLogin(principal.getName()));
    }

    @GetMapping("/js/userLogin/{login}")
    public ResponseEntity<User> getUserLogin(@PathVariable String login) {
        System.out.println("User request: " + userService.ifLogin(login));
        if (userService.ifLogin(login)) {
            System.out.println("User request: " + userService.getUserByLogin(login));
            return ResponseEntity.ok(userService.getUserByLogin(login));
        }
        return ResponseEntity.ok(new User());
    }

    @GetMapping("/js/user/{id}")
    public ResponseEntity<User> getUserId(@PathVariable long id) {
        System.out.println("request id: " + userService.getUserById(id));
        return ResponseEntity.ok(userService.getUserById(id));
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
