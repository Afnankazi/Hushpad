package com.Hushpad.Hushpad.Config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class CoustomLoggingFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        System.out.println("requested uri is "+ request.getRequestURI() + " the remorte user and and header is "+ request.getRemoteUser() + request.getHeader("Authorization"));
        filterChain.doFilter(request, response);
        System.out.println("after filtering request" +  response.getStatus());
    }
}
