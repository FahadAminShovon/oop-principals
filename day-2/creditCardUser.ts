import { CreditCard } from './Creditcard';

// Create a new CreditCard instance with a starting balance of MAXIMUM_LIMIT (500,000)
const creditCard = new CreditCard();

// Show initial balance and transactions
console.log('Initial Balance:', creditCard.getBalance());
console.log('Initial Transactions:', creditCard.getTransactions());

// Scenario 1: Attempt to withdraw an amount within the allowed transaction limit
console.log('\n=== Withdrawal Within Limit ===');
try {
  creditCard.withdraw(10_000); // Withdraw 10,000
  console.log('Balance after withdrawal:', creditCard.getBalance());
  console.log('Transactions:', creditCard.getTransactions());
} catch (error) {
  console.error('Error:', error.message);
}

// Scenario 2: Attempt to withdraw an amount greater than the per transaction limit
console.log('\n=== Withdrawal Exceeds Per Transaction Limit ===');
try {
  creditCard.withdraw(30_000); // Exceeds per transaction limit of 20,000
} catch (error) {
  console.error('Error:', error.message); // Expected to fail with "Per transaction limit exceeded"
}

// Scenario 3: Attempt to withdraw an amount greater than the daily limit
console.log('\n=== Withdrawal Exceeds Daily Limit ===');
try {
  // First withdrawal for today
  creditCard.withdraw(50_000); // Withdraw 50,000
  // Attempt another withdrawal that exceeds daily limit (assuming it's the same day)
  creditCard.withdraw(60_000); // Total today = 50,000 + 60,000 = 110,000, which exceeds DAILY_LIMIT of 100,000
} catch (error) {
  console.error('Error:', error.message); // Expected to fail with "Daily limit exceeded"
}

// Scenario 4: Attempt to withdraw an amount greater than the available balance
console.log('\n=== Withdrawal Exceeds Balance ===');
try {
  creditCard.withdraw(600_000); // More than available balance (MAXIMUM_LIMIT - 10,000 left after prior withdrawals)
} catch (error) {
  console.error('Error:', error.message); // Expected to fail with "Insufficient balance"
}

// Scenario 5: Attempt to withdraw with an invalid (negative) amount
console.log('\n=== Invalid Withdrawal ===');
try {
  creditCard.withdraw(-100); // Invalid withdrawal amount (negative)
} catch (error) {
  console.error('Error:', error.message); // Expected to fail with "Invalid amount"
}

// Scenario 6: Pay a bill with a valid amount
console.log('\n=== Pay Bill ===');
try {
  creditCard.payBill(5_000); // Pay a bill of 5,000
  console.log('Balance after bill payment:', creditCard.getBalance());
  console.log('Transactions:', creditCard.getTransactions());
} catch (error) {
  console.error('Error:', error.message);
}

// Scenario 7: Pay a bill with an invalid (negative) amount
console.log('\n=== Invalid Bill Payment ===');
try {
  creditCard.payBill(-1_000); // Invalid bill payment amount (negative)
} catch (error) {
  console.error('Error:', error.message); // Expected to fail with "Invalid amount"
}

// Scenario 8: Pay a bill with an amount greater than available balance
console.log('\n=== Pay Bill Exceeds Balance ===');
try {
  creditCard.payBill(500_000); // Exceeds available balance
} catch (error) {
  console.error('Error:', error.message); // Expected to fail with "Insufficient balance"
}

// Show final balance and transactions
console.log('\n=== Final Balance and Transactions ===');
console.log('Final Balance:', creditCard.getBalance());
console.log('Final Transactions:', creditCard.getTransactions());
