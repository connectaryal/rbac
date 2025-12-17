/**
 * Represents a single permission.
 * By default, it's a string, but it can be a union of literal strings
 * for stricter type safety and IDE autocomplete.
 */
export type TPermission = string;

/**
 * Represents a single role name.
 * Can be a string or a union of literal strings for type safety.
 */
export type TRole = string;

/**
 * Represents a set of permissions.
 * Internally used by RBAC to efficiently manage permission checks.
 *
 * @template TPerm - Type of permission strings.
 */
export type TPermissionSet<TPerm extends string = string> = Set<TPerm>;

/**
 * Represents a set of roles.
 * Internally used by RBAC to efficiently manage role assignments.
 *
 * @template TRoleName - Type of role name strings.
 */
export type TRoleSet<TRoleName extends string = string> = Set<TRoleName>;

/**
 * Defines the permissions associated with each role.
 *
 * @template TRoleName - Type of role name strings.
 * @template TPerm - Type of permission strings.
 */
export type TRoleDefinitions<
  TRoleName extends TRole = TRole,
  TPerm extends TPermission = TPermission,
> = Record<TRoleName, TPerm[]>;

/**
 * Configuration object for initializing the Role-Based Access Control (RBAC) system.
 *
 * @template TRoleName - Type of role name strings.
 * @template TPerm - Type of allowed permission strings.
 */
export interface TConfig<
  TRoleName extends TRole = TRole,
  TPerm extends TPermission = TPermission,
> {
  /**
   * List of permissions directly assigned.
   * These permissions are always available regardless of roles.
   * @optional
   */
  permissions?: TPerm[];

  /**
   * List of roles assigned to the user.
   * Permissions are resolved from role definitions.
   * @optional
   */
  roles?: TRoleName[];

  /**
   * Defines which permissions each role has.
   * Maps role names to arrays of permissions.
   * @optional
   */
  roleDefinitions?: TRoleDefinitions<TRoleName, TPerm>;
}
