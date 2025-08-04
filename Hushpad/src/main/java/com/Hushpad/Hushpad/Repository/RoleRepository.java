package com.Hushpad.Hushpad.Repository;

import com.Hushpad.Hushpad.model.AppRoles;
import com.Hushpad.Hushpad.model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Roles, Integer> {
    Optional<Roles> findByRoleName(AppRoles appRole);
}
