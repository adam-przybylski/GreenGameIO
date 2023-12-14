package io.greengame.greengameio.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests((requests) -> { requests
                        .requestMatchers("/api/v1/users").hasAnyAuthority("ROLE_USER", "ROLE_ADMINISTRATOR")
                        .requestMatchers("/api/v1/authentication").permitAll()
                        .requestMatchers("/api/v1/odznaki").permitAll()
                        .requestMatchers("/api/v1/odznaki/nazwaOdznaki/{name}").permitAll()
                        .requestMatchers("/api/v1/odznaki/idOdznaki/{id}").permitAll()
                        .requestMatchers("/api/v1/odznaki/tworzenieOdznaki").permitAll()
                        .requestMatchers("/api/v1/odznakaManager").permitAll()
                        .requestMatchers("/api/v1/odznakaManager/odznaka/{id}").permitAll()
                        .requestMatchers("/api/v1/odznakaManager/user/{id}").permitAll()
                        .requestMatchers("/api/v1/odznakaManager/przyznajOdznake").permitAll()
                        .requestMatchers("/api/v1/odznakaManager/przypnij").permitAll()
                        .requestMatchers("/api/v1/odznakaManager/gracze/{id}").permitAll()
                        .requestMatchers("/api/v1/odznakaManager/dodajOdznake").permitAll();
        })
                .httpBasic(Customizer.withDefaults())
                .formLogin(Customizer.withDefaults());
        http.csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
