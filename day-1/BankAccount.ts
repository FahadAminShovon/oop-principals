export class BankAccount {
  #accountNumber: string;
  #accountName: string;
  #balance: number;

  constructor({
    accountName,
    accountNumber,
    balance,
  }: {
    accountNumber: string;
    accountName: string;
    balance: number;
  }) {
    this.#accountName = accountName;
    this.#accountNumber = accountNumber;
    this.#balance = balance;
  }

  #isTrasferable(amount: number) {
    return this.#balance - amount > 0;
  }

  withdraw(amount: number) {
    if (this.#isTrasferable(amount)) {
      this.#balance = this.#balance - amount;
      console.log(`Withdrawn ${amount} from ${this.#accountName}`);
      console.log(`New balance: ${this.#balance}`);
    } else {
      console.log('Insufficient balance');
    }
  }

  deposit(amount: number) {
    if (amount > 0) {
      this.#balance = this.#balance + amount;
      console.log(`Deposited ${amount} to ${this.#accountName}`);
      console.log(`New balance: ${this.#balance}`);
    } else {
      console.log('Invalid amount');
    }
  }

  transfer(amount: number, bankAccount: BankAccount) {
    if (this.#isTrasferable(amount)) {
      bankAccount.deposit(amount);
      this.#balance = this.#balance - amount;
      console.log(`Transferred ${amount} to ${bankAccount.#accountName}`);
      console.log(`New balance: ${this.#balance}`);
    } else {
      console.log('Insufficient balance');
    }
  }

  showDetails() {
    console.log(`Account Name: ${this.#accountName}`);
    console.log(`Account Number: ${this.#accountNumber}`);
    console.log(`Balance: ${this.#balance}`);
  }
}
