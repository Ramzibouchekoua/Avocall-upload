/**
 * Extends a user's walletExpirationDate by the given number of months.
 * If the user already has a future expiration date, the extension is applied
 * from that date (accumulates). Otherwise it extends from now.
 *
 * Uses day-safe month arithmetic: if the base day doesn't exist in the target
 * month (e.g. Jan 31 + 1 month), it rolls back to the last day of that month.
 *
 * @param {Object} user - Mongoose user document
 * @param {number} months - Number of months to add
 */
export const extendWalletExpiration = (user, months) => {
  const now = new Date();
  const base =
    user.walletExpirationDate && user.walletExpirationDate > now
      ? new Date(user.walletExpirationDate)
      : new Date(now);

  const targetMonth = base.getMonth() + months;
  const targetYear = base.getFullYear() + Math.floor(targetMonth / 12);
  const normalizedMonth = ((targetMonth % 12) + 12) % 12;

  // Use day 0 of the following month to find the last day of targetMonth,
  // clamping the day if it overflows (e.g. Jan 31 + 1 month → Feb 28/29).
  const maxDay = new Date(targetYear, normalizedMonth + 1, 0).getDate();
  const safeDay = Math.min(base.getDate(), maxDay);

  user.walletExpirationDate = new Date(targetYear, normalizedMonth, safeDay, base.getHours(), base.getMinutes(), base.getSeconds());
};
