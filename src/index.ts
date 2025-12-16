// src/index.ts
//
// #TODO: remove these example files and make this barrel file

import { RoleBasedAccessControl } from "./core/rbac";
import { TConfig } from "./types/permission.types";
export type AppPermissions = "read" | "write" | "delete" | "update";

const config: TConfig = {
  permissions: ["read", "update"], // autocomplete works here
};

const rbac = new RoleBasedAccessControl<AppPermissions>(config);

console.log(rbac.can(["delete", "read", "update"], false));
