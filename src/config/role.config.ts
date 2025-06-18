const ROLES = ['user', 'admin', 'editor', 'super'] as const;

type RoleType = (typeof ROLES)[number];

export type { RoleType };

export { ROLES };
