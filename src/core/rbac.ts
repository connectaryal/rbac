import {
  TConfig,
  TPermission,
  TPermissionSet,
  TRole,
  TRoleSet,
  TRoleDefinitions,
} from "../types/permission.types";

/**
 * RoleBasedAccessControl (RBAC) class
 *
 * A generic, type-safe utility to manage permissions and roles for a user.
 * Supports checking, adding, and validating permissions both directly and through roles.
 *
 * @template TRoleName - A string literal union type representing allowed role names.
 * @template TPerm - A string literal union type representing allowed permissions.
 */
export class RoleBasedAccessControl<
  TRoleName extends TRole = TRole,
  TPerm extends TPermission = TPermission,
> {
  /** Internal set of direct permissions */
  private permissions: TPermissionSet<TPerm>;

  /** Internal set of assigned roles */
  private roles: TRoleSet<TRoleName>;

  /** Role definitions mapping roles to their permissions */
  private roleDefinitions: TRoleDefinitions<TRoleName, TPerm>;

  /**
   * Initialize the RBAC system with permissions, roles, and role definitions.
   * @param config Configuration object containing initial permissions, roles, and role definitions.
   */
  constructor(config: TConfig<TRoleName, TPerm> = {}) {
    this.permissions = new Set(config.permissions ?? []);
    this.roles = new Set(config.roles ?? []);
    this.roleDefinitions = (config.roleDefinitions ?? {}) as TRoleDefinitions<
      TRoleName,
      TPerm
    >;
  }

  /**
   * Get all currently assigned direct permissions (excluding role-based permissions).
   * @returns A Set of direct permissions.
   */
  getPermissions(): TPermissionSet<TPerm> {
    return new Set(this.permissions);
  }

  /**
   * Get all permissions including both direct permissions and those inherited from roles.
   * @returns A Set of all effective permissions.
   */
  getAllPermissions(): TPermissionSet<TPerm> {
    const allPerms = new Set(this.permissions);

    // Add permissions from all assigned roles
    this.roles.forEach((role) => {
      const rolePerms = this.roleDefinitions[role] ?? [];
      rolePerms.forEach((perm) => allPerms.add(perm));
    });

    return allPerms;
  }

  /**
   * Replace the current direct permissions with a new set.
   * @param permissions Array of permissions to set.
   */
  setPermissions(permissions: TPerm[]): void {
    this.permissions = new Set(permissions);
  }

  /**
   * Add one or more direct permissions to the current set.
   * Duplicate permissions are automatically ignored.
   * @param perms Array of permissions to add.
   * @returns Updated Set of direct permissions.
   */
  addPermissions(perms: TPerm[]): TPermissionSet<TPerm> {
    perms.forEach((p) => this.permissions.add(p));
    return new Set(this.permissions);
  }

  /**
   * Remove one or more direct permissions from the current set.
   * @param perms Array of permissions to remove.
   * @returns Updated Set of direct permissions.
   */
  removePermissions(perms: TPerm[]): TPermissionSet<TPerm> {
    perms.forEach((p) => this.permissions.delete(p));
    return new Set(this.permissions);
  }

  /**
   * Get all currently assigned roles.
   * @returns A Set of role names.
   */
  getRoles(): TRoleSet<TRoleName> {
    return new Set(this.roles);
  }

  /**
   * Replace the current roles with a new set.
   * @param roles Array of role names to set.
   */
  setRoles(roles: TRoleName[]): void {
    this.roles = new Set(roles);
  }

  /**
   * Add one or more roles to the current set.
   * Duplicate roles are automatically ignored.
   * @param roles Array of role names to add.
   * @returns Updated Set of roles.
   */
  addRoles(roles: TRoleName[]): TRoleSet<TRoleName> {
    roles.forEach((role) => this.roles.add(role));
    return new Set(this.roles);
  }

  /**
   * Remove one or more roles from the current set.
   * @param roles Array of role names to remove.
   * @returns Updated Set of roles.
   */
  removeRoles(roles: TRoleName[]): TRoleSet<TRoleName> {
    roles.forEach((role) => this.roles.delete(role));
    return new Set(this.roles);
  }

  /**
   * Check if a specific role is assigned.
   * @param role The role name to check.
   * @returns True if the role is assigned, false otherwise.
   */
  hasRole(role: TRoleName): boolean {
    return this.roles.has(role);
  }

  /**
   * Get the role definitions (mapping of roles to permissions).
   * @returns The role definitions object.
   */
  getRoleDefinitions(): TRoleDefinitions<TRoleName, TPerm> {
    return { ...this.roleDefinitions };
  }

  /**
   * Set or update the role definitions.
   * @param definitions Object mapping role names to arrays of permissions.
   */
  setRoleDefinitions(definitions: TRoleDefinitions<TRoleName, TPerm>): void {
    this.roleDefinitions = definitions;
  }

  /**
   * Add or update a single role definition.
   * @param role The role name.
   * @param permissions Array of permissions for this role.
   */
  defineRole(role: TRoleName, permissions: TPerm[]): void {
    if (!this.hasRole(role)) {
      this.addRoles([role]);
    }

    this.roleDefinitions[role] = permissions;
  }

  /**
   * Remove a role definition.
   * @param role The role name to remove from definitions.
   */
  removeRoleDefinition(role: TRoleName): void {
    delete this.roleDefinitions[role];
  }

  /**
   * Get permissions for a specific role from role definitions.
   * @param role The role name.
   * @returns Array of permissions for the role, or empty array if role not defined.
   */
  getRolePermissions(role: TRoleName): TPerm[] {
    return this.roleDefinitions[role] ?? [];
  }

  /**
   * Check if a specific permission exists (either direct or from roles).
   * @param perm The permission to check.
   * @returns True if the permission exists, false otherwise.
   */
  hasPermission(perm: TPerm): boolean {
    // Check direct permissions first
    if (this.permissions.has(perm)) {
      return true;
    }

    // Check permissions from assigned roles
    for (const role of this.roles) {
      const rolePerms = this.roleDefinitions[role] ?? [];
      if (rolePerms.includes(perm)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Validate if the current permissions (direct + role-based) satisfy a given set of permissions.
   *
   * Supports checking a single permission or multiple permissions with an `every` flag:
   * - `every = true`  → all permissions must exist (default behavior)
   * - `every = false` → at least one permission must exist
   *
   * @param perms A single permission or an array of permissions to validate.
   * @param every Boolean flag to control validation behavior (default: true).
   * @returns True if validation passes, false otherwise.
   *
   * @example
   * const rbac = new RoleBasedAccessControl({
   *   permissions: ['read'],
   *   roles: ['editor'],
   *   roleDefinitions: { editor: ['write', 'update'] }
   * });
   * rbac.can('read'); // true (direct permission)
   * rbac.can('write'); // true (from 'editor' role)
   * rbac.can(['read', 'write'], true); // true (both exist)
   * rbac.can(['read', 'delete'], true); // false (delete doesn't exist)
   * rbac.can(['read', 'delete'], false); // true (at least read exists)
   */
  can(perms: TPerm | TPerm[], every: boolean = true): boolean {
    if (!Array.isArray(perms)) {
      return this.hasPermission(perms);
    }

    return every
      ? perms.every((perm) => this.hasPermission(perm)) // All permissions must exist
      : perms.some((perm) => this.hasPermission(perm)); // At least one permission exists
  }

  /**
   * Check if the user has any of the specified roles.
   * @param roles A single role or an array of role names to check.
   * @param every If true, all roles must be assigned. If false, at least one role must be assigned (default: false).
   * @returns True if the role check passes, false otherwise.
   */
  hasRoles(roles: TRoleName | TRoleName[], every: boolean = false): boolean {
    if (!Array.isArray(roles)) {
      return this.hasRole(roles);
    }

    return every
      ? roles.every((role) => this.hasRole(role)) // All roles must be assigned
      : roles.some((role) => this.hasRole(role)); // At least one role is assigned
  }
}
