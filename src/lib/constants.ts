export const SALT_ROUNDS = 10;

export const ROLES = ["student", "admin"] as const;

export const COURSE_STATUSES = ["enrolled", "dropped"] as const;

export const NAVBAR_LINKS = [
  {
    label: "Student",
    href: "/student",
  },
  {
    label: "Admin",
    href: "/admin",
  }
] as const;