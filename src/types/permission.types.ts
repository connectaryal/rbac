/**
 * Represents a single permission.
 * By default, it's a string, but it can be a union of literal strings
 * for stricter type safety and IDE autocomplete.
 */
export type TPermission = string;

/**
 * Represents a set of permissions.
 * Internally used by RBAC to efficiently manage permission checks.
 *
 * @template TPerm - Type of permission strings.
 */
export type TPermissionSet<TPerm extends string = string> = Set<TPerm>;

/**
 * Configuration object for initializing the Role-Based Access Control (RBAC) system.
 *
 * @template TPerm - Type of allowed permission strings.
 */
export interface TConfig<TPerm extends TPermission = TPermission> {
  /**
   * List of permissions directly assigned.
   * These permissions are always available regardless of roles.
   */
  permissions: TPerm[];
}
