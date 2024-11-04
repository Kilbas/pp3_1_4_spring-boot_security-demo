package ru.kata.spring.boot_security.demo.init;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;


import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;

@Component
public class Init {



    private final UserService userService;

    @Autowired
    public Init(UserService userService) {
        this.userService = userService;
    }

    @PostConstruct
    public void initDB() {

        Role roleAdmin = new Role("ROLE_ADMIN","Admin Role");
        Role roleUser = new Role("ROLE_USER","User Role");

        Set<Role> adminRolesSet = new HashSet<>();
        Set<Role> userRolesSet = new HashSet<>();

        userService.addRole(roleAdmin);
        userService.addRole(roleUser);

        adminRolesSet.add(roleAdmin);
        adminRolesSet.add(roleUser);
        userRolesSet.add(roleUser);


        User admin = new User("Alexey","Kuznetsov", 25,"admin","admin", adminRolesSet);
        admin.setId(1L);

        User user = new User("Semen","Shniperson", 15,"user","user",userRolesSet);
        user.setId(2L);

        userService.saveUser(admin);
        userService.saveUser(user);

    }
}
