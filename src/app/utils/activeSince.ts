export function getAccountAgeInMonths(createdAt: string): number {
  const createdDate = new Date(createdAt);
  const now = new Date();

  const yearsDiff = now.getFullYear() - createdDate.getFullYear();
  const monthsDiff = now.getMonth() - createdDate.getMonth();
  const daysDiff = now.getDate() - createdDate.getDate();

  let totalMonths = yearsDiff * 12 + monthsDiff;

  if (daysDiff < 0) {
    totalMonths -= 1;
  }

  return Math.max(1, totalMonths);
}
