type TransactionTypes = 'WITHDRAW' | 'BILL';

type Transaction = {
  type: TransactionTypes;
  amount: number;
  date: Date;
};

const MAXIMUM_LIMIT = 500_000;
const DAILY_LIMIT = 100_000;
const PER_TRANSACTION_LIMIT = 20_000;

export class CreditCard {
  #balance: number;
  #transactions: Transaction[];

  public constructor(balance = MAXIMUM_LIMIT) {
    this.#balance = balance;
    this.#transactions = [];
  }

  #validateAmount(amount: number) {
    if (amount < 0) {
      throw new Error('Invalid amount');
    }
    if (amount > MAXIMUM_LIMIT) {
      throw new Error('Amount exceeds maximum limit');
    }
  }

  #validateBalance(amount: number) {
    if (this.#balance - amount < 0) {
      throw new Error('Insufficient balance');
    }
  }

  #getTotalSpendingOfToday() {
    const today = new Date();
    return this.#transactions
      .filter(
        (transaction) =>
          // dummy date comparison, it'll come from db in real world
          transaction.date.getDate() === today.getDate() &&
          transaction.type === 'WITHDRAW'
      )
      .reduce((total, transaction) => total + transaction.amount, 0);
  }

  withdraw(amount: number) {
    this.#validateAmount(amount);
    if (this.#getTotalSpendingOfToday() + amount > DAILY_LIMIT) {
      throw new Error('Daily limit exceeded');
    }
    if (amount > PER_TRANSACTION_LIMIT) {
      throw new Error('Per transaction limit exceeded');
    }
    this.#validateBalance(amount);
    this.#balance -= amount;
    this.#transactions.push({
      type: 'WITHDRAW',
      amount,
      date: new Date(),
    });
  }

  payBill(amount: number) {
    this.#validateAmount(amount);
    this.#validateBalance(amount);
    this.#balance -= amount;
    this.#transactions.push({
      type: 'BILL',
      amount,
      date: new Date(),
    });
  }

  getBalance() {
    return this.#balance;
  }

  getTransactions() {
    return this.#transactions;
  }
}
