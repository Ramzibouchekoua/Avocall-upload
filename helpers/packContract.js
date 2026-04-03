// Pack contract: maps payment amounts (in millimes) to wallet credit and expiration rules.
// Old packs keep the same amounts and now include a 1-year expiration.
// New packs use distinct amounts and offer different credit/expiration combinations.
export const PACK_CONTRACTS = {
  // Old packs – kept for backward compatibility, 1-year expiration
  100000: { walletAdd: 1, months: 12, packCode: 'OLD_PACK_1' },   // 100 TND
  199000: { walletAdd: 1, months: 12, packCode: 'OLD_PACK_2' },   // 199 TND (old instant)

  // New packs
  199001: { walletAdd: 3, months: 1, packCode: 'NEW_PACK_1M' },   // 199 TND – 1 month
  999000: { walletAdd: 15, months: 6, packCode: 'NEW_PACK_6M' },  // 999 TND – 6 months
  1799000: { walletAdd: 30, months: 12, packCode: 'NEW_PACK_12M' }, // 1799 TND – 1 year
};
