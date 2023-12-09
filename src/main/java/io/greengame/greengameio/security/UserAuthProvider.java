package io.greengame.greengameio.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import io.greengame.greengameio.dtos.UserDto;
import io.greengame.greengameio.services.AuthenticationService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Collections;

@RequiredArgsConstructor
@Component
public class UserAuthProvider {

    @Value("${security.jwt.token.secret-key:secret-value}")
    private String secretKey;

    private final AuthenticationService authenticationService;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(String login) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime validity = now.plusHours(1);
        return JWT.create()
                .withIssuer(login)
                .withIssuedAt(Instant.from(now))
                .withExpiresAt(Instant.from(validity))
                .sign(Algorithm.HMAC256(secretKey));
    }

    public Authentication validateToken(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secretKey)).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        UserDto userDto = authenticationService.findByLogin(decodedJWT.getSubject());
        return new UsernamePasswordAuthenticationToken(userDto, null, Collections.singleton(new SimpleGrantedAuthority("ROLE_" + userDto.getUserType().name())));
    }
}
