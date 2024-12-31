import { BankAccount } from './BankAccount';

const account1 = new BankAccount({
  accountName: 'John Doe',
  accountNumber: '123456',
  balance: 1000,
});

const account2 = new BankAccount({
  accountName: 'Jane Doe',
  accountNumber: '654321',
  balance: 500,
});

const bankAccounts: BankAccount[] = [account1, account2];

console.log('=== before any transaction ===');
account1.showDetails();
account2.showDetails();

// start transactions
console.log('=== transactions ===');
account1.withdraw(500);
account1.deposit(200);
account1.transfer(300, account2);
account1.transfer(2000, account2);
account1.withdraw(1000);
account1.deposit(-100);
account1.withdraw(1000);
account1.withdraw(100);
account1.showDetails();
account2.showDetails();
console.log('=== end transactions ===');
// end transactions

console.log('=== after transactions ===');
account1.showDetails();
account2.showDetails();

const totalBalance = bankAccounts.reduce(
  (acc, account) => acc + account.balance,
  0
);

console.log(`Total balance: ${totalBalance}`);
