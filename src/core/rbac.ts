import {
  TConfig,
  TPermission,
  TPermissionSet,
} from "../types/permission.types";

/**
 * RoleBasedAccessControl (RBAC) class
 *
 * A generic, type-safe utility to manage permissions for a user or role.
 * Supports checking, adding, and validating permissions dynamically.
 *
 * @template TPerm - A string literal union type representing allowed permissions.
 */
export class RoleBasedAccessControl<TPerm extends TPermission> {
  /** Internal set of permissions */
  private permissions: TPermissionSet;

  /**
   * Initialize the RBAC system with an optional list of permissions.
   * @param config Configuration object containing initial permissions.
   */
  constructor(config: TConfig) {
    this.permissions = new Set(config.permissions ?? []);
  }

  /**
   * Get all currently assigned permissions.
   * @returns A Set of permissions.
   */
  getPermissions(): TPermissionSet {
    return this.permissions;
  }

  /**
   * Replace the current permissions with a new set.
   * @param permissions Array of permissions to set.
   */
  setPermission(permissions: TPerm[]): void {
    this.permissions = new Set(permissions);
  }

  /**
   * Add one or more permissions to the current set.
   * Duplicate permissions are automatically ignored.
   * @param perms Array of permissions to add.
   * @returns Updated Set of permissions.
   */
  addPermissions(perms: TPerm[]): TPermissionSet {
    perms.forEach((p) => this.permissions.add(p));
    return this.permissions;
  }

  /**
   * Check if a specific permission exists in the current set.
   * @param perm The permission to check.
   * @returns True if the permission exists, false otherwise.
   */
  hasPermission(perm: TPerm): boolean {
    return this.permissions.has(perm);
  }

  /**
   * Validate if the current permissions satisfy a given set of permissions.
   *
   * Supports checking a single permission or multiple permissions with an `all` flag:
   * - `all = true`  → all permissions must exist (default behavior)
   * - `all = false` → at least one permission must exist
   *
   * @param perms A single permission or an array of permissions to validate.
   * @param all Boolean flag to control validation behavior (default: true).
   * @returns True if validation passes, false otherwise.
   *
   * @example
   * const rbac = new RoleBasedAccessControl<{ read: 'read', write: 'write' }>({ permissions: ['read'] });
   * rbac.can('read'); // true
   * rbac.can(['read', 'write'], true); // false
   * rbac.can(['read', 'write'], false); // true
   */
  can(perms: TPerm | TPerm[], all: boolean = true): boolean {
    if (!Array.isArray(perms)) return this.hasPermission(perms);

    return all
      ? perms.every((perm) => this.hasPermission(perm)) // All permissions must exist
      : perms.some((perm) => this.hasPermission(perm)); // At least one permission exists
  }
}
