package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;
import java.util.Set;

public interface RoleService {
    Set<Role> findAllRole();

    void saveRole(Role role);

    Role findRoleByRole(String role);

    void addRole(Role role);
}
