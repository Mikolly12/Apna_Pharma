package com.backend.apnapharma.auth.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JWTTokenHelper jwtTokenHelper;

    private static final String[] publicApis= {
            "/api/auth/**"
    };


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // 🔥 ENABLE CORS
            .cors(Customizer.withDefaults())

            // 🔥 DISABLE CSRF (JWT based API)
            .csrf(AbstractHttpConfigurer::disable)

            // 🔥 STATELESS SESSION
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // 🔥 AUTHORIZATION RULES
            .authorizeHttpRequests(authorize -> authorize

                // 🔥 VERY IMPORTANT (CORS FIX)
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // Swagger
                .requestMatchers("/v3/api-docs/**", "/swagger-ui.html", "/swagger-ui/**").permitAll()

                // Public APIs
                .requestMatchers(HttpMethod.GET, "/api/products", "/api/category").permitAll()
                .requestMatchers("/api/auth/**").permitAll()

                // OAuth success endpoint
                .requestMatchers("/oauth2/success").permitAll()

                // Everything else needs auth
                .anyRequest().authenticated()
            )

            // ⚠️ OAuth2 (kept but SAFE)
            .oauth2Login(oauth2 -> oauth2
                .authorizationEndpoint(auth ->
                    auth.baseUri("/oauth2/authorization")
                )
            )

            // 🔥 JWT filter
            .addFilterBefore(
                new JWTAuthenticationFilter(jwtTokenHelper, userDetailsService),
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer(){
        return (web) -> web.ignoring().requestMatchers(publicApis);
    }

    @Bean
    public AuthenticationManager authenticationManager(){
        DaoAuthenticationProvider daoAuthenticationProvider= new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());

        return new ProviderManager(daoAuthenticationProvider);

    }


    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
