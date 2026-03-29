# Security Documentation

## Overview

This document outlines all security measures implemented in
the Event Management API. The API follows industry best
practices for securing REST endpoints and protecting against
common vulnerabilities.

## 1. Input Validation

### Joi Schema Validation

All incoming requests are validated using the **Joi** schema
validation library. This prevents malicious or malformed data
from reaching your application logic.

#### Validation Rules Applied:

**Event Name**
- Type: string
- Length: 3-60 characters
- Required: yes

**Event Date**
- Type: ISO 8601 date-time
- Must be a future date (greater than "now")
- Required: yes

**Capacity**
- Type: integer
- Range: 5-10,000 attendees
- Required: yes

**Registration Count**
- Type: integer
- Range: 0 to capacity
- Default: 0
- Constraint: When status is "completed",
  registrationCount must equal capacity

**Status & Category**
- Type: string (enum)
- Status options: active, cancelled, completed
- Category options: conference, workshop, meetup, seminar, general
- Default status: active
- Default category: general

#### Validation Middleware

The `validateRequest` middleware validates three parts:
1. **Body** - Request payload validation
2. **Params** - URL parameters validation
3. **Query** - Query string validation

Configuration options:
- `stripBody: true` - Removes unknown fields from request body
- `stripQuery: true` - Removes unknown fields from query
- `stripParams: false` - Preserves all parameters
- `abortEarly: true` - Stops at first validation error
- `convert: true` - Auto-converts types when possible

## 2. HTTP Security Headers (Helmet.js)

### Helmet Configuration

Helmet.js sets various HTTP headers to protect against
common attacks. Configuration differs between development
and production environments.

#### Security Headers Applied:

**Content Security Policy (CSP)**
- Development: Disabled for easier testing
- Production: Enabled with strict directives
  - Prevents inline scripts and styles
  - Blocks object embeds
  - Prevents framing attacks
  - Allows only same-origin resources

**HSTS (HTTP Strict Transport Security)**
- Development: 1 minute max-age
- Production: 1 year (31536000 seconds)
- includeSubDomains: Enabled in production
- preload: Enabled in production
- Forces HTTPS connections

**Additional Security Headers:**
- `hidePoweredBy` - Removes "X-Powered-By" header
- `noSniff` - Prevents MIME type sniffing attacks
- `frameguard: deny` - Prevents clickjacking (blocks framing)
- `referrerPolicy: no-referrer` - Prevents referrer leaking
- `crossOriginResourcePolicy: same-origin` (production) -
  Restricts cross-origin access to resources

## 3. Cross-Origin Resource Sharing (CORS)

### CORS Configuration

CORS is configured differently based on the environment:

#### Development Environment
- Origin: Allow all (`true`)
- Credentials: Enabled
- Purpose: Ease testing during development

#### Production Environment
- Origin: Whitelist from `ALLOWED_ORIGINS`
  environment variable (comma-separated)
- Credentials: Enabled for authenticated requests
- Methods: GET, POST, PUT, DELETE
- Headers: Content-Type, Authorization
- Purpose: Only allow trusted origins

### Configuration File
Location: `src/config/corsConfig.ts`

Set `ALLOWED_ORIGINS` in `.env` for production:
```
ALLOWED_ORIGINS=https://example.com,https://app.example.com
```

## 4. Environment Variables & Secrets

### Best Practices Implemented

**Configuration Loading**
- Environment variables loaded early using `dotenv.config()`
- Before internal imports to ensure secrets are available

**Secrets Protected**
- Firebase credentials stored in `ServiceKey.json`
- Added to `.gitignore` to prevent accidental commits
- Git pre-commit hooks can prevent secret leaks
- GitHub push protection blocks commits with secrets

**Never Commit Sensitive Data**
- API keys, credentials, tokens
- Database passwords
- Firebase configuration files
- Private signing keys

## 5. Request Logging

### Morgan HTTP Logger

All requests are logged using **Morgan** middleware with
"combined" format, which logs:
- HTTP method and URL
- Status code
- Response time
- User agent
- Referrer information

Location: `app.ts`

This helps with:
- Monitoring suspicious request patterns
- Debugging request issues
- Security auditing

## 6. Data Sanitization

### Input Sanitization

**Unknown Field Removal**
- Request body: Unknown fields are stripped
  (stripBody: true)
- Query parameters: Unknown fields are stripped
  (stripQuery: true)
- URL parameters: All preserved but validated

**Type Conversion**
- Automatic type conversion enabled
- Dates converted to ISO format
- Numbers parsed from strings when valid

## 7. Error Handling

### Safe Error Messages

Errors are logged internally but don't expose sensitive
information to clients:

**What Clients See**
- Validation errors with field names and requirements
- HTTP status codes
- Generic error messages (e.g., "Event not found")

**What's NOT Exposed**
- Stack traces
- Internal server details
- Database information
- System paths

## 8. Firebase Security

### Database Rules

Firebase Realtime Database rules should be configured to:
- Restrict read/write access to authenticated users
- Validate data structure on writes
- Prevent unauthorized access
- Enforce business logic rules

### ServiceKey.json

- Never committed to version control
- Never exposed in API responses
- Only accessible server-side
- Credentials should be rotated regularly

## 9. Environment-Based Configuration

### .env File

Examples of environment variables:
```
NODE_ENV=development
PORT=3000
ALLOWED_ORIGINS=http://localhost:3000
```

### NODE_ENV Usage

**Development (NODE_ENV=development)**
- Relaxed CORS
- Disabled CSP
- Extended debug time limits
- Cross-origin resources allowed

**Production (NODE_ENV=production)**
- Strict CORS whitelist required
- CSP fully enabled
- Shorter timeouts
- Same-origin only

## 10. Additional Security Recommendations

### For Production Deployment

1. **Enable HTTPS**
   - Use valid SSL/TLS certificates
   - Update HSTS max-age to 1 year
   - Redirect HTTP to HTTPS

2. **API Rate Limiting**
   - Consider implementing rate limiting
   - Prevents brute force attacks
   - Protects against DDoS

3. **Authentication & Authorization**
   - Implement JWT or similar token-based auth
   - Protect sensitive endpoints
   - Refresh tokens should be short-lived

4. **Database Security**
   - Use strong, unique passwords
   - Enable Firebase security rules
   - Regular backups and audit logs

5. **Dependency Management**
   - Regular `npm audit` checks
   - Keep dependencies updated
   - Remove unused packages

6. **Monitoring & Alerts**
   - Monitor error rates
   - Alert on suspicious patterns
   - Log and review security events

7. **API Security Scanning**
   - Regular penetration testing
   - Static code analysis
   - OWASP vulnerability scanning

## 11. Security Testing

### Validation Testing
Test endpoints with invalid data:
- Invalid date formats
- Out-of-range numbers
- Missing required fields
- Unknown fields in request body

### CORS Testing
Verify CORS headers are correct:
```bash
curl -H "Origin: http://example.com" \
  http://localhost:3000/api/v1/events \
  -H "Access-Control-Request-Method: GET"
```

### Security Headers Testing
Use online tools or curl to verify headers:
```bash
curl -I http://localhost:3000/api/v1/health
```

## 12. Vulnerability References

### OWASP Top 10
- A01:2021 - Broken Access Control
- A02:2021 - Cryptographic Failures
- A03:2021 - Injection
- A05:2021 - Cross-Site Request Forgery (CSRF)
- A06:2021 - Broken Access Control
- A07:2021 - Cross-Site Scripting (XSS)

### Resources
1. OWASP Top 10 - https://owasp.org/www-project-top-ten/
2. Helmet.js - https://helmetjs.github.io/
3. Joi Documentation - https://joi.dev/api/
4. Express.js Security - https://expressjs.com/en/advanced/best-practice-security.html
5. Node.js Security Checklist - https://nodejs.org/en/docs/guides/nodejs-security/

## Summary

The Event Management API implements multiple layers of
security including input validation, HTTP security headers,
CORS protection, and safe error handling. For production
deployments, additional measures like authentication,
rate limiting, and monitoring are recommended.