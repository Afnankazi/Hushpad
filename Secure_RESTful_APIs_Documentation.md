# AIM: Creating Secure, Production-Ready RESTful APIs

## 1. What are RESTful APIs?
RESTful APIs (Representational State Transfer) are a set of rules and conventions for building and interacting with web services. They use standard HTTP methods (GET, POST, PUT, DELETE) to perform CRUD (Create, Read, Update, Delete) operations on resources. RESTful APIs are stateless, scalable, and easy to integrate with various clients.

## 2. Key Principles of RESTful APIs
1. **Statelessness**: Each request from a client must contain all the information needed to process it. The server does not store any client context between requests.
2. **Client-Server Separation**: The client and server are independent, allowing them to evolve separately.
3. **Uniform Interface**: Resources are identified by URLs, and standard HTTP methods are used to interact with them.
4. **Layered System**: The API can be designed in layers, allowing for scalability and flexibility.
5. **Cacheability**: Responses should define whether they are cacheable to improve performance.

## 3. Best Practices for Secure RESTful APIs

### 1. Use HTTPS
Always use HTTPS to encrypt data in transit. This ensures that sensitive information, such as authentication tokens and user data, is not exposed to attackers.

### 2. Implement Authentication and Authorization
Use secure authentication mechanisms like OAuth 2.0 or JSON Web Tokens (JWT) to verify the identity of users. Implement role-based access control (RBAC) to restrict access to resources based on user roles.

```java
// Example of JWT authentication in Spring Boot
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
        .csrf().disable()
        .authorizeRequests()
        .antMatchers("/api/public/**").permitAll()
        .antMatchers("/api/admin/**").hasRole("ADMIN")
        .anyRequest().authenticated()
        .and()
        .oauth2ResourceServer().jwt()
        .and()
        .build();
}
```

### 3. Validate and Sanitize Input
Always validate and sanitize user input to prevent SQL injection, cross-site scripting (XSS), and other injection attacks.

```java
// Example of input validation in Spring Boot
@Valid
@PostMapping("/api/notes")
public ResponseEntity<Note> createNote(@RequestBody @Valid Note note) {
    return ResponseEntity.ok(noteService.save(note));
}
```

### 4. Use Rate Limiting
Implement rate limiting to prevent abuse and protect your API from denial-of-service (DoS) attacks.

```java
// Example of rate limiting with Bucket4j
@Bean
public FilterRegistrationBean<RateLimitFilter> rateLimitFilter() {
    FilterRegistrationBean<RateLimitFilter> registrationBean = new FilterRegistrationBean<>();
    registrationBean.setFilter(new RateLimitFilter());
    return registrationBean;
}
```

### 5. Return Proper HTTP Status Codes
Use appropriate HTTP status codes to indicate the result of an API request:
- `200 OK`: Request succeeded
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid input
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Access denied
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

### 6. Log and Monitor API Activity
Log all API requests and responses, including errors, for auditing and debugging purposes. Use monitoring tools to detect anomalies and potential security threats.

### 7. Use Pagination for Large Responses
For endpoints that return large datasets, implement pagination to improve performance and reduce server load.

```java
// Example of pagination in Spring Boot
@GetMapping("/api/notes")
public ResponseEntity<Page<Note>> getNotes(Pageable pageable) {
    return ResponseEntity.ok(noteService.findAll(pageable));
}
```

## 4. Implementation in Hushpad

### Secure Note Management API

#### Controller
```java
@RestController
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @GetMapping
    public ResponseEntity<List<Note>> getAllNotes() {
        return ResponseEntity.ok(noteService.getAllNotes());
    }

    @PostMapping
    public ResponseEntity<Note> createNote(@RequestBody @Valid Note note) {
        return ResponseEntity.ok(noteService.save(note));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
```

#### Service
```java
@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    public Note save(Note note) {
        return noteRepository.save(note);
    }

    public void delete(Long id) {
        noteRepository.deleteById(id);
    }
}
```

#### Repository
```java
@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {}
```

## 30% Extra: Advanced Security Features in Hushpad

### 1. Role-Based Access Control (RBAC)
In Hushpad, we use roles to restrict access to certain endpoints. For example, only admins can delete notes:

```java
@PreAuthorize("hasRole('ADMIN')")
@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
    noteService.delete(id);
    return ResponseEntity.noContent().build();
}
```

### 2. JWT Authentication
We use JSON Web Tokens (JWT) to authenticate users and secure API endpoints. The token is included in the `Authorization` header of each request:

```java
@GetMapping("/api/secure-data")
public ResponseEntity<String> getSecureData(@RequestHeader("Authorization") String token) {
    if (jwtService.validateToken(token)) {
        return ResponseEntity.ok("Secure data");
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
```

### 3. API Rate Limiting
To prevent abuse, we use the Bucket4j library to limit the number of requests a user can make within a specific time frame:

```java
public class RateLimitFilter implements Filter {

    private final Bucket bucket = Bucket4j.builder()
        .addLimit(Bandwidth.classic(10, Refill.greedy(10, Duration.ofMinutes(1))))
        .build();

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        if (bucket.tryConsume(1)) {
            chain.doFilter(request, response);
        } else {
            ((HttpServletResponse) response).setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        }
    }
}
```

### 4. Secure Data Storage
All sensitive data, such as passwords, are hashed using strong algorithms like bcrypt before being stored in the database:

```java
public String hashPassword(String password) {
    return BCrypt.hashpw(password, BCrypt.gensalt());
}
```

### 5. Protected Route Components
In Hushpad, we use protected route components to ensure that only authenticated users can access certain parts of the application. This is implemented using React Router and the Context API.

#### Implementation

```javascript
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../Store/Contextapi';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(MyContext);

  if (!token) {
    // Redirect to login page if the user is not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
```

#### Usage
Wrap the routes that need protection with the `ProtectedRoute` component:

```javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
```

### Key Benefits:
1. **Access Control**: Ensures that only authenticated users can access protected routes.
2. **Seamless User Experience**: Redirects unauthenticated users to the login page, maintaining a smooth flow.
3. **Reusability**: The `ProtectedRoute` component can be reused across the application for different routes.

By implementing protected route components, we add an additional layer of security to our application, ensuring that sensitive pages are only accessible to authorized users.

By implementing these advanced security features, we ensure that our RESTful APIs are secure, reliable, and production-ready.
