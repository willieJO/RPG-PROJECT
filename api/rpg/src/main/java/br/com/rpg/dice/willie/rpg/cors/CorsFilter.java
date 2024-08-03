package br.com.rpg.dice.willie.rpg.cors;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsFilter implements Filter {

    private List<String> allowedOrigins = Arrays.asList("https://rpg-project.onrender.com", "https://rpg-project-bay.vercel.app", "http://localhost:3000");

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {}

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) resp;

        String originHeader = request.getHeader("Origin");
        if (allowedOrigins.contains(originHeader)) {
            response.setHeader("Access-Control-Allow-Origin", originHeader);
            response.setHeader("Access-Control-Allow-Credentials", "true");

            if ("OPTIONS".equals(request.getMethod())) {
                response.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, OPTIONS");
                response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, Accept");
                response.setHeader("Access-Control-Max-Age", "3600");
                response.setStatus(HttpServletResponse.SC_OK);
                return;
            }

            // Wrap the response to modify the Set-Cookie headers
            CustomHttpServletResponseWrapper responseWrapper = new CustomHttpServletResponseWrapper(response);
            chain.doFilter(req, responseWrapper);
            responseWrapper.processCookies();
        } else {
            chain.doFilter(req, response);
        }
    }

    @Override
    public void destroy() {}

    private class CustomHttpServletResponseWrapper extends HttpServletResponseWrapper {

        public CustomHttpServletResponseWrapper(HttpServletResponse response) {
            super(response);
        }

        public void processCookies() {
            // Convert Collection<String> to List<String>
            Collection<String> headers = super.getHeaders("Set-Cookie");
            if (headers != null) {
                // Clear existing headers
                super.setHeader("Set-Cookie", ""); 
                for (String header : headers) {
                    super.addHeader("Set-Cookie", header + "; SameSite=None; Secure");
                }
            }
        }
    }
}
