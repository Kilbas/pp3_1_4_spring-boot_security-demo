package ru.kata.spring.boot_security.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.security.Principal;

@RestController
public class UserController {

    private final UserServiceImpl userService;

    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("/js/user")
    public ResponseEntity<User> getUser(Principal principal) {
        System.out.println("User request: " + userService.getUserByLogin(principal.getName()));
        return ResponseEntity.ok(userService.getUserByLogin(principal.getName()));
    } //userService.ifLogin(user.getLogin())

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


}
