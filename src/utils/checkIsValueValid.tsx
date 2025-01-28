export const checkIsValueValid = name => {
    if (!name) {
      return false;
    }
    // Check whether "name" contains empty "space" character
    const value = String(name).trim();
    const isValid = Boolean(value);
  
    return isValid;
  };
  