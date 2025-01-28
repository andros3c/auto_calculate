export function formatCurrency(amount) {
   
    // Convert the amount to a string
    const amountStr = amount.toString();
    
    // Split the amount into integer and decimal parts
    const [integerPart, decimalPart] = amountStr.split('.');
    
    // Add dots to the integer part
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    // Combine integer part with decimal part if it exists
    return decimalPart ? `${formattedIntegerPart},${decimalPart}` : formattedIntegerPart;
  }
  