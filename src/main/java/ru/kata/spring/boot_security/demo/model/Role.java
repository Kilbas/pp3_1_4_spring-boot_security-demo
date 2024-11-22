package ru.kata.spring.boot_security.demo.model;

import lombok.Data;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.security.core.GrantedAuthority;
import javax.persistence.*;

@Entity
@Data
@Table(name = "roles")
public class Role implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true)
    private String role;

    private String value;

    public Role() {
    }

    public Role(String role) {
        this.role = role;
    }

    public Role(String role, String value) {
        this.role = role;
        this.value = value;
    }

    @Override
    public String getAuthority() {
        return getRole();
    }
}
