# Security Policy

## Supported Versions

We release security updates for the following versions of @connectaryal/rbac:

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |
| < 1.0   | :x:                |

We release security updates only for the latest major version. Please upgrade to the latest version to receive security fixes.

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

We take security seriously and appreciate your efforts to responsibly disclose vulnerabilities.

### How to Report

Please report security vulnerabilities by emailing: **aryalshiva005@gmail.com**

You should receive an acknowledgment within **48 hours**. If you don't receive a response within 48 hours, please follow up via email to ensure we received your original message.

### What to Include in Your Report

To help us triage and fix the vulnerability quickly, please include:

- **Type of vulnerability** (e.g., XSS, privilege escalation, information disclosure)
- **Full paths of source file(s)** related to the vulnerability
- **Location** of the affected source code (tag/branch/commit or direct URL)
- **Step-by-step instructions** to reproduce the issue
- **Proof-of-concept or exploit code** (if possible)
- **Impact assessment** - How could an attacker exploit this?
- **Affected versions** - Which versions are vulnerable?
- **Any special configuration** required to reproduce

### Example Report

```
Subject: Security Vulnerability in usePermission Hook

Type: Information Disclosure
Affected Versions: 1.0.0 - 1.2.0
Severity: Medium

Description:
The usePermission hook exposes sensitive permission data in development mode
through console.log statements that aren't properly stripped in production builds.

Steps to Reproduce:
1. Create production build with NODE_ENV=production
2. Open browser console
3. Use usePermission hook with includeDetails: true
4. Observe sensitive permission data logged to console

Impact:
Attackers could view permission structure and identify potential privilege
escalation paths.

Suggested Fix:
Remove console.log statements or wrap them in proper __DEV__ checks.
```

## Disclosure Policy

When you report a vulnerability, here's what happens:

1. **Acknowledgment (0-48 hours)**
   - We'll acknowledge receipt of your report
   - We'll provide a point of contact for updates

2. **Initial Assessment (48-72 hours)**
   - We'll assess the severity and impact
   - We'll determine if the report is valid
   - We'll provide an initial timeline

3. **Investigation (1-7 days)**
   - We'll investigate the vulnerability
   - We'll develop and test a fix
   - We'll keep you updated on progress

4. **Fix & Release (7-30 days)**
   - We'll prepare a security patch
   - We'll release a new version
   - We'll publish a security advisory

5. **Public Disclosure (After fix is released)**
   - We'll publicly disclose the vulnerability
   - We'll credit you in the advisory (unless you prefer anonymity)
   - We'll notify users through multiple channels

### Timeline

- **Acknowledgment**: Within 48 hours
- **Initial assessment**: Within 72 hours  
- **Fix development**: 7-30 days (varies by severity)
- **Public disclosure**: After fix is released and users have time to update

## Severity Classification

We classify vulnerabilities using the following severity levels:

### Critical
- Remote code execution
- Authentication bypass
- Mass data exposure
- **Response time**: 24-48 hours
- **Fix target**: 3-7 days

### High
- Privilege escalation
- SQL injection (if backend integration exists)
- Sensitive data exposure
- **Response time**: 48-72 hours
- **Fix target**: 7-14 days

### Medium
- Information disclosure
- Denial of service
- Logic errors in permission checks
- **Response time**: 3-5 days
- **Fix target**: 14-30 days

### Low
- Minor information leaks
- Non-exploitable bugs
- Edge case issues
- **Response time**: 5-7 days
- **Fix target**: 30-60 days

## Security Update Process

When we release a security update:

1. **Security Advisory** - Published on GitHub Security Advisories
2. **Patched Version** - Released to npm with security tag
3. **Release Notes** - Detailed information about the fix
4. **Notifications Sent**:
   - GitHub release announcement
   - npm security advisory
   - Twitter/social media (for high/critical issues)
   - Direct email to known enterprise users
5. **Documentation Update** - This SECURITY.md file is updated

## Security Best Practices for Users

To help keep your application secure when using @connectaryal/rbac:

### 🔒 General Security

1. **Keep Updated**
   ```bash
   npm update @connectaryal/rbac
   ```
   Always use the latest version to get security fixes.

2. **Use Dependency Scanning**
   ```bash
   npm audit
   ```
   Regularly audit your dependencies for vulnerabilities.

### ⚠️ Client-Side Authorization Warning

**CRITICAL: This library provides client-side authorization for UI/UX purposes ONLY.**

**Never rely solely on client-side checks for security!**

✅ **DO:**
- Use for UI gating (showing/hiding buttons, menu items)
- Use for user experience improvements
- Always validate permissions on your backend/API
- Implement server-side authorization
- Use HTTPS in production

❌ **DON'T:**
- Trust client-side permission checks for security
- Store sensitive data based on client permissions
- Skip server-side validation
- Use as your only authorization layer

### 🔐 Secure Implementation

```tsx
// ✅ GOOD: Client + Server validation
function DeleteButton({ itemId }) {
  const canDelete = useHasPermission('delete');
  
  const handleDelete = async () => {
    try {
      // Server will validate permissions again
      await api.delete(`/items/${itemId}`);
    } catch (error) {
      if (error.status === 403) {
        alert('Permission denied');
      }
    }
  };
  
  // Client-side check only hides UI
  if (!canDelete) return null;
  
  return <button onClick={handleDelete}>Delete</button>;
}

// ❌ BAD: Client-only validation
function DeleteButton({ itemId }) {
  const canDelete = useHasPermission('delete');
  
  const handleDelete = async () => {
    // Dangerous: No server-side check!
    await api.delete(`/items/${itemId}`);
  };
  
  return <button onClick={handleDelete}>Delete</button>;
}
```

### 💾 Storage Security

**If you implement permission persistence:**

❌ **DON'T:**
- Store permissions in localStorage (XSS vulnerability)
- Store sensitive permission data in cookies without httpOnly flag
- Expose permission structure to client

✅ **DO:**
- Use secure, httpOnly cookies for session-based permissions
- Validate all permissions server-side
- Fetch permissions from authenticated API
- Implement proper session management

### 🌐 Production Environment

```tsx
// ✅ GOOD: Remove debug info in production
{process.env.NODE_ENV === 'development' && (
  <PermissionDebug />
)}

// ❌ BAD: Exposing debug info in production
<PermissionDebug />
```

### 🔑 Authentication Integration

```tsx
// ✅ GOOD: Load permissions after authentication
function App() {
  const { user, isAuthenticated } = useAuth();
  const [permissions, setPermissions] = useState(null);
  
  useEffect(() => {
    if (isAuthenticated) {
      // Fetch permissions from authenticated API
      fetchUserPermissions(user.id).then(setPermissions);
    }
  }, [isAuthenticated, user]);
  
  if (!permissions) return <Loading />;
  
  return (
    <RBACProvider config={permissions}>
      <Dashboard />
    </RBACProvider>
  );
}
```

## Known Security Considerations

### Client-Side Nature

This is a **client-side only** library. All permission logic runs in the browser and can be:
- Inspected via DevTools
- Modified by users
- Bypassed with browser extensions

**Solution**: Always validate on the server.

### No Built-in Encryption

This library does not encrypt permission data. All permissions are stored in plain JavaScript objects.

**Solution**: Don't store sensitive information in permission names or roles.

### No Persistent Storage

By default, permissions are not persisted. If you implement persistence:
- Avoid localStorage (XSS risk)
- Use secure, httpOnly cookies
- Validate on every request

### TypeScript Type Safety

TypeScript provides compile-time safety but can be bypassed at runtime.

**Solution**: Validate permission strings at runtime if accepting user input.

## Security Features

What we do to keep @connectaryal/rbac secure:

✅ **No External Dependencies** - Reduces supply chain attack risk  
✅ **TypeScript** - Type safety reduces bugs  
✅ **No eval() or Function()** - No dynamic code execution  
✅ **No Network Calls** - Library never makes HTTP requests  
✅ **Client-Side Only** - No server assumptions  
✅ **Immutable Patterns** - Reduces state manipulation risks  
✅ **Regular Updates** - Active maintenance and security patches  

## Vulnerability History

We believe in transparency. Past vulnerabilities will be listed here:

**No vulnerabilities reported yet.** 🎉

When vulnerabilities are discovered and fixed, we'll list them here with:
- CVE number (if assigned)
- Affected versions
- Severity rating
- Fixed in version
- Description and mitigation

## Security Checklist for Contributors

If you're contributing code, please ensure:

- [ ] No external dependencies added without discussion
- [ ] No use of `eval()`, `Function()`, or dynamic code execution
- [ ] No network calls or external API access
- [ ] Proper input validation for user-provided data
- [ ] TypeScript types are properly defined
- [ ] No sensitive data logged to console
- [ ] Security implications considered and documented
- [ ] Tests include security-relevant scenarios

## Contact

- **Security vulnerabilities**: aryalshiva005@gmail.com
- **General security questions**: [GitHub Discussions](https://github.com/connectaryal/rbac/discussions)
- **Other issues**: [GitHub Issues](https://github.com/connectaryal/rbac/issues)

## Bug Bounty

We currently do not have a formal bug bounty program. However, we deeply appreciate responsible disclosure and will:

- Publicly acknowledge your contribution (with your permission)
- Give you credit in release notes and security advisories
- Feature you as a security contributor on our website
- Provide recommendation/reference letters if requested

For significant vulnerabilities, we may offer:
- Swag and merchandise
- Financial compensation (if sponsorship allows)
- Co-authorship on security blog posts

---

## Acknowledgments

We thank the following security researchers for responsibly disclosing vulnerabilities:

*(No reports yet - you could be the first!)*

---

**Thank you for helping keep @connectaryal/rbac and its users safe!** 🔒

If you have questions about this security policy, please email aryalshiva005@gmail.com.

---

*Last updated: January 2025*