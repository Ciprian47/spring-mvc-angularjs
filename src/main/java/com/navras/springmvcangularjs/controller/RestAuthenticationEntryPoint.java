package com.navras.springmvcangularjs.controller;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Just return 401-unauthorized for every unauthorized request.
 * The client side catches this and handles login itself.
 */
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

    public final void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
    }
}
