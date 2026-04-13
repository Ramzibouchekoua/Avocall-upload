// Pack contract: maps payment amounts (in millimes) to wallet credit and expiration rules.
// Old packs keep the same amounts and now include a 1-year expiration.
// New packs use distinct amounts and offer different credit/expiration combinations.
export const PACK_CONTRACTS = {
  // Old packs – kept for backward compatibility, 1-year expiration
  100000: { walletAdd: 1, months: 12, packCode: 'OLD_PACK_1' }, // 100 TND
  149000: { walletAdd: 1, months: 12, packCode: 'OLD_PACK_2' }, // 149 TND (old instant)

  // New packs
  199000: { walletAdd: 3, months: 1, packCode: 'NEW_PACK_1M' }, // 199 TND – 1 month
  999000: { walletAdd: 18, months: 6, packCode: 'NEW_PACK_6M' }, // 999 TND – 6 months
  1799000: { walletAdd: 36, months: 12, packCode: 'NEW_PACK_12M' }, // 1799 TND – 1 year
};

export const getPackContractByAmount = (amount) => {
  const contract = PACK_CONTRACTS[Number(amount)];

  if (!contract) {
    return null;
  }

  return {
    ...contract,
    amount: Number(amount),
  };
};

export const getPackContractByCode = (packCode) => {
  const match = Object.entries(PACK_CONTRACTS).find(([, contract]) => contract.packCode === packCode);

  if (!match) {
    return null;
  }

  const [amount, contract] = match;

  return {
    ...contract,
    amount: Number(amount),
  };
};

export const getAvailablePackContracts = () =>
  Object.entries(PACK_CONTRACTS).map(([amount, contract]) => ({
    ...contract,
    amount: Number(amount),
  }));
