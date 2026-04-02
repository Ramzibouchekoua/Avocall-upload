import moment from 'moment';

// Pack contract: price in TND, amount in millimes, months = subscription duration, walletAdd = consultations credited
export const PACK_CONTRACT = {
  PACK_1M: { price: 199, amount: 199000, months: 1, walletAdd: 3 },
  PACK_6M: { price: 999, amount: 999000, months: 6, walletAdd: 15 },
  PACK_12M: { price: 1799, amount: 1799000, months: 12, walletAdd: 30 },
};

export const getPackByAmount = (amount) => {
  return Object.entries(PACK_CONTRACT).find(([, v]) => v.amount === Number(amount))?.[1] || null;
};

export const getPackByCode = (packCode) => {
  return PACK_CONTRACT[packCode] || null;
};

export const extendWalletExpiration = (user, months) => {
  const now = moment();
  const base =
    user.walletExpirationDate && moment(user.walletExpirationDate).isAfter(now)
      ? moment(user.walletExpirationDate)
      : now;
  user.walletExpirationDate = base.add(months, 'months').toDate();
};
