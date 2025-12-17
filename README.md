# @connectaryal/rbac

> Simple, powerful Role-Based Access Control for React applications

[![npm version](https://badge.fury.io/js/%40connectaryal%2Frbac.svg)](https://www.npmjs.com/package/@connectaryal/rbac)
[![npm downloads](https://img.shields.io/npm/dm/@connectaryal/rbac.svg)](https://www.npmjs.com/package/@connectaryal/rbac)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@connectaryal/rbac)](https://bundlephobia.com/package/@connectaryal/rbac)
[![License](https://img.shields.io/npm/l/@connectaryal/rbac.svg)](https://github.com/connectaryal/rbac/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

**Stop wrestling with complex authorization. Start building features.**

`@connectaryal/rbac` gives you production-ready permission management with zero configuration. Built specifically for React developers who want powerful authorization without the complexity.

```tsx
// Just 3 lines to add permissions
<RBACProvider config={{ roles: ['editor'] }}>
  <Can permissions="edit">
    <EditButton />
  </Can>
</RBACProvider>
```

[**Get Started**](#installation) · [**Examples**](#examples) · [**Full Docs**](./REACT_GUIDE.md) · [**Why not CASL?**](#-vs-casl)

---

## 🎯 Why @connectaryal/rbac?

### The Problem

Most React apps need permission management, but existing solutions are either:
- ❌ **Too complex** - Steep learning curves, verbose APIs
- ❌ **Too basic** - Lack features for real-world apps
- ❌ **Not React-first** - Awkward integrations, poor DX

### The Solution

`@connectaryal/rbac` provides:
- ✅ **Simple by default** - Zero config to get started, powerful when needed
- ✅ **React-first design** - Hooks, components, and patterns that feel native
- ✅ **Comprehensive toolkit** - 6 hooks, 7 components, everything you need
- ✅ **Type-safe** - Full TypeScript support with excellent autocomplete

### The Difference

| Feature | @connectaryal/rbac | CASL | Others |
|---------|-------------------|------|--------|
| **React Integration** | Built-in (6 hooks, 7 components) | Add-on (1 hook, 1 component) | Minimal |
| **Learning Curve** | ⭐⭐⭐⭐⭐ Easy | ⭐⭐⭐ Moderate | Varies |
| **Setup Time** | < 2 minutes | 5-10 minutes | Varies |
| **Multi-tenant Support** | ✅ Built-in sectors | ❌ DIY | ❌ DIY |
| **Explicit Deny Lists** | ✅ Restrictions | Via rules | Limited |
| **Bundle Size** | ~12KB | ~8KB | Varies |

---

## ✨ Features

### 🎯 **Simple by Default**
Zero configuration required. Works out of the box with sensible defaults.

### 🔒 **Powerful When Needed**
Advanced features like sector-based restrictions, role hierarchies, and dynamic updates.

### ⚛️ **React-First Design**
Built specifically for React with hooks and components that feel natural.

### 🪝 **6 Specialized Hooks**
`usePermission`, `useHasPermission`, `useCanAny`, `useCanAll`, `useIsRestricted`, `useRBACContext`

### 🧩 **7 Ready-Made Components**
`<Can>`, `<Cannot>`, `<PermissionGate>`, `<PermissionSwitch>`, `<PermissionBoundary>`, `<RestrictedContent>`, `<PermissionDebug>`

### 🏢 **Multi-Tenant Ready**
Built-in sector/context system for multi-department or multi-tenant apps.

### 🚫 **Explicit Deny Lists**
Restrictions that override all permissions - perfect for compliance and security policies.

### 🎨 **Natural Language API**
Components read like English: `<Can permissions="edit">` or `<Cannot permissions="admin">`

### 📊 **Debug Tools**
Built-in `<PermissionDebug>` component for development.

### 🔍 **Full TypeScript Support**
Autocomplete for permissions, roles, and sectors. Type-safe by default.

---

## 📦 Installation

```bash
npm install @connectaryal/rbac
# or
yarn add @connectaryal/rbac
# or
pnpm add @connectaryal/rbac
```

**Peer Dependencies:**
- React ≥16.8.0 (hooks support)
- React DOM ≥16.8.0

---

## 🚀 Quick Start

### 1. Basic Setup (30 seconds)

```tsx
import { RBACProvider, Can } from '@connectaryal/rbac';

function App() {
  return (
    <RBACProvider config={{
      roles: ['editor'],
      roleDefinitions: {
        viewer: ['read'],
        editor: ['read', 'write'],
        admin: ['read', 'write', 'delete']
      }
    }}>
      <Dashboard />
    </RBACProvider>
  );
}

function Dashboard() {
  return (
    <div>
      <Can permissions="write">
        <button>Edit</button>
      </Can>
      <Can permissions="delete">
        <button>Delete</button>
      </Can>
    </div>
  );
}
```

### 2. Using Hooks

```tsx
import { usePermission, useHasPermission } from '@connectaryal/rbac';

function Editor() {
  // Simple boolean check
  const canEdit = useHasPermission('edit');
  
  // Detailed information
  const { hasPermission, isRestricted, allPermissions } = usePermission('delete', {
    includeDetails: true
  });

  return (
    <div>
      {canEdit && <button>Edit</button>}
      {hasPermission && <button>Delete</button>}
      {isRestricted && <p>Delete is restricted by policy</p>}
    </div>
  );
}
```

### 3. Multiple Permissions

```tsx
import { useCanAll, useCanAny } from '@connectaryal/rbac';

function AdminPanel() {
  // User must have ALL permissions
  const hasFullAccess = useCanAll(['read', 'write', 'delete']);
  
  // User needs at least ONE permission
  const hasAnyAccess = useCanAny(['read', 'write']);

  if (!hasFullAccess) return <LimitedAccess />;
  return <FullAdminPanel />;
}
```

### 4. Advanced: Restrictions & Sectors

```tsx
import { RBACProvider } from '@connectaryal/rbac';

function App() {
  return (
    <RBACProvider config={{
      roles: ['admin'],
      sector: 'finance',
      restrictions: ['permanent_delete'], // Global restriction
      roleDefinitions: {
        admin: ['read', 'write', 'delete']
      },
      sectorRestrictions: {
        finance: ['delete', 'transfer_funds'], // Context-based
        hr: ['export_salary_data']
      }
    }}>
      <Dashboard />
    </RBACProvider>
  );
}
```

---

## 📚 Core Concepts

### Roles
Define user roles and their associated permissions.

```tsx
const config = {
  roles: ['editor', 'reviewer'],
  roleDefinitions: {
    viewer: ['read'],
    editor: ['read', 'write'],
    reviewer: ['read', 'approve'],
    admin: ['read', 'write', 'delete', 'approve']
  }
};
```

### Direct Permissions
Grant permissions directly without roles.

```tsx
const config = {
  permissions: ['special_feature', 'beta_access']
};
```

### Restrictions (Deny Lists)
Explicitly deny permissions, overriding all grants.

```tsx
const config = {
  roles: ['admin'],
  restrictions: ['delete'], // Admin cannot delete
  roleDefinitions: {
    admin: ['read', 'write', 'delete'] // Has permission...
  }
  // Result: Admin can read and write, but NOT delete (restricted)
};
```

### Sectors (Multi-Tenant)
Context-based restrictions for different departments or tenants.

```tsx
const config = {
  roles: ['manager'],
  sector: 'finance',
  roleDefinitions: {
    manager: ['read', 'write', 'delete', 'transfer']
  },
  sectorRestrictions: {
    finance: ['delete', 'transfer'], // Restricted in finance
    hr: ['export'],                  // Restricted in HR
    it: []                           // No restrictions in IT
  }
};

// Later, switch sectors:
rbac.setSector('it'); // Now delete and transfer are allowed
```

---

## 📖 Examples

### E-commerce Dashboard

```tsx
import { RBACProvider, Can, Cannot, usePermission } from '@connectaryal/rbac';

function EcommerceDashboard() {
  return (
    <RBACProvider config={{
      roles: ['manager'],
      roleDefinitions: {
        viewer: ['view_orders', 'view_products'],
        manager: ['view_orders', 'view_products', 'create_orders', 'approve_orders'],
        admin: ['view_orders', 'view_products', 'create_orders', 'approve_orders', 'delete_orders']
      }
    }}>
      <Dashboard />
    </RBACProvider>
  );
}

function Dashboard() {
  const { hasPermission } = usePermission('approve_orders');

  return (
    <div>
      <h1>Orders Dashboard</h1>
      
      <Can permissions="view_orders">
        <OrdersList />
      </Can>

      <Can permissions="create_orders">
        <button>Create New Order</button>
      </Can>

      {hasPermission && <button>Approve Pending Orders</button>}

      <Cannot permissions="delete_orders">
        <div className="alert">
          Contact admin to delete orders
        </div>
      </Cannot>
    </div>
  );
}
```

### Multi-Department SaaS

```tsx
import { RBACProvider, PermissionBoundary } from '@connectaryal/rbac';

function MultiDepartmentApp() {
  const [department, setDepartment] = useState('finance');
  
  return (
    <RBACProvider config={{
      roles: ['admin'],
      sector: department,
      roleDefinitions: {
        admin: ['read', 'write', 'delete', 'export', 'transfer']
      },
      sectorRestrictions: {
        finance: ['delete', 'transfer'],
        hr: ['export'],
        it: []
      }
    }}>
      <DepartmentSelector onChange={setDepartment} />
      <DepartmentDashboard />
    </RBACProvider>
  );
}

function DepartmentDashboard() {
  return (
    <div>
      <PermissionBoundary
        permissions="delete"
        onDenied={<div>Access Denied</div>}
        onRestricted={<div>Delete restricted in this department</div>}
      >
        <button>Delete Record</button>
      </PermissionBoundary>
    </div>
  );
}
```

More examples in:
- [REACT_GUIDE.md](./REACT_GUIDE.md) - Complete React integration guide
- [examples/](./examples/) - Real-world implementations

---

## 🎨 Components

### `<Can>`
Show content when user has permission.

```tsx
<Can permissions="edit">
  <EditButton />
</Can>

<Can permissions={['create', 'delete']} checkType="EVERY">
  <AdminPanel />
</Can>
```

### `<Cannot>`
Show content when user does NOT have permission.

```tsx
<Cannot permissions="premium_features">
  <UpgradePrompt />
</Cannot>
```

### `<PermissionSwitch>`
Render different content based on permission.

```tsx
<PermissionSwitch
  permissions="edit"
  granted={<EditMode />}
  denied={<ViewOnlyMode />}
  loading={<Spinner />}
/>
```

### `<PermissionBoundary>`
Advanced boundary with restriction detection.

```tsx
<PermissionBoundary
  permissions="delete"
  onDenied={<AccessDenied />}
  onRestricted={<PolicyBlocked />}
  onDeniedCallback={() => trackEvent('access_denied')}
>
  <DeleteButton />
</PermissionBoundary>
```

### `<PermissionDebug>`
Development tool to inspect permissions.

```tsx
{process.env.NODE_ENV === 'development' && (
  <PermissionDebug showSummary json />
)}
```

[See all components →](./REACT_GUIDE.md#components)

---

## 🪝 Hooks

### `usePermission(permissions, options)`
Full-featured permission check with detailed information.

```tsx
const { 
  hasPermission,      // boolean | null
  isInitialized,      // boolean
  isRestricted,       // boolean
  restrictionReason,  // 'direct' | 'sector'
  allPermissions,     // Set<Permission>
  currentSector,      // Sector | null
  can                 // (perm) => boolean
} = usePermission('write', { includeDetails: true });
```

### `useHasPermission(permissions, checkType)`
Simple boolean check.

```tsx
const canEdit = useHasPermission('edit');
const canManage = useHasPermission(['create', 'update', 'delete'], 'EVERY');
```

### `useCanAny(permissions)`
Check if user has at least one permission.

```tsx
const hasAnyAccess = useCanAny(['read', 'write']);
```

### `useCanAll(permissions)`
Check if user has all permissions.

```tsx
const hasFullAccess = useCanAll(['read', 'write', 'delete']);
```

### `useIsRestricted(permission)`
Check if a permission is restricted.

```tsx
const isDeleteRestricted = useIsRestricted('delete');
```

### `useRBACContext()`
Access the RBAC instance directly.

```tsx
const { rbac, isInitialized } = useRBACContext();
const summary = rbac?.getPermissionSummary();
```

[See all hooks →](./REACT_GUIDE.md#hooks)

---

## ⚖️ vs CASL

Both are excellent libraries. Here's when to choose each:

### Choose @connectaryal/rbac when:
✅ Building a **React-only** application  
✅ Want **simple, straightforward** RBAC  
✅ Need **comprehensive React hooks** out of the box  
✅ Need **multi-tenant/sector** context switching  
✅ Prefer **explicit restriction** (deny list) model  
✅ Value **developer experience** and quick setup  
✅ Need **ready-made UI components**  

### Choose CASL when:
✅ Need **attribute-based** permissions (check object properties)  
✅ Building **full-stack** app (shared backend logic)  
✅ Need **field-level** permission control  
✅ Require **database integration** (Mongoose/Prisma)  
✅ Want **maximum flexibility** and control  
✅ Need **multi-framework** support (Vue, Angular, etc.)  

**Bottom line:** `@connectaryal/rbac` is simpler and more React-friendly. CASL is more powerful for complex, full-stack scenarios.

[Detailed comparison →](./REACT_GUIDE.md#comparison)

---

## 🎯 When to Use

### ✅ Great for:

- **React-only applications** - Built for React, feels native
- **Role-based permissions** - Straightforward role management
- **Multi-tenant SaaS** - Sector-based restrictions
- **Admin dashboards** - Rich component library
- **E-commerce platforms** - Permission-gated features
- **Content management** - Role-based workflows
- **Quick prototypes** - Zero config, fast setup

### ⚠️ Consider alternatives if:

- **Need attribute-based conditions** → Use CASL (check object properties)
- **Need backend integration** → Use CASL (Mongoose/Prisma support)
- **Need field-level control** → Use CASL (per-field permissions)
- **Building non-React app** → Use framework-specific solution

---

## 📚 Documentation

- **[REACT_GUIDE.md](./REACT_GUIDE.md)** - Complete React integration guide
- **[FEATURES.md](./FEATURES.md)** - Comprehensive feature list
- **[ROLES_GUIDE.md](./ROLES_GUIDE.md)** - Role-based permissions guide
- **[RESTRICTIONS_GUIDE.md](./RESTRICTIONS_GUIDE.md)** - Restrictions and sectors guide
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history
- **[examples/](./examples/)** - Real-world examples

---

## 🤝 Contributing

We welcome contributions! Whether it's:

- 🐛 Bug reports
- 💡 Feature requests
- 📝 Documentation improvements
- 💻 Code contributions

Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT License © [Shiva Aryal](https://github.com/connectaryal)

See [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgments

Inspired by [CASL](https://casl.js.org/) and the React community.

Built with ❤️ for React developers who want simple, powerful authorization.

---

## 💬 Support

- **📚 Documentation**: [Read the docs](./REACT_GUIDE.md)
- **💬 Discussions**: [GitHub Discussions](https://github.com/connectaryal/rbac/discussions)
- **🐛 Issues**: [Report a bug](https://github.com/connectaryal/rbac/issues/new/choose)
- **🐦 Twitter**: [@connectaryal](https://twitter.com/connectaryal)
- **📧 Email**: aryalshiva005@gmail.com

---

## ⭐ Show Your Support

If this project helped you, please consider giving it a ⭐ on [GitHub](https://github.com/connectaryal/rbac)!

It helps others discover the project and motivates continued development.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/connectaryal">Shiva Aryal</a>
</p>