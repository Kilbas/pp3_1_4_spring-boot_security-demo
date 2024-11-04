package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {

    void saveUser(User user);

    User getUserById(Long id);

    User getUserByLogin(String login);

    void removeUserById(long id);

    List<User> getAllUsers();

    void updateUser(User user);

    boolean ifLogin (String login);



    void addRole(Role role);

}
