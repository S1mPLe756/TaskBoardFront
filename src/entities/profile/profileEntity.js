export function ProfileEntity({ id, fullName, avatarUrl, phone, bio,   createdAt }) {
  return {
    id,
    fullName,
    avatarUrl: avatarUrl || null,
    phone,
    bio,
    createdAt,
  };
}