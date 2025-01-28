export const passwordValidation = (str) => {
  // Error when str no character (empty)
  if (!str.length) {
    return "Password tidak boleh kosong";
  }

  // Regex test str has 8 long characters
  const hasEightLength =
    /[A-Za-z\d !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,}$/.test(str);

  if (!hasEightLength) {
    return "Password minimal 8 karakter";
  }

  // Regex test str has 1 digit character
  const hasDigit =
    /^(?=.*[0-9])[A-Za-z\d !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,}$/.test(str);

  if (!hasDigit) {
    return "Password harus berisi minimal 1 angka";
  }

  // Regex test str has 1 lowercase character
  const hasLowercase =
    /^(?=.*[a-z])[A-Za-z\d !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,}$/.test(str);

  if (!hasLowercase) {
    return "Password harus berisi minimal 1 huruf kecil";
  }

  
  // // Regex test str has 1 uppercase character
  // const hasUppercase =
  //   /^(?=.*[A-Z])[A-Za-z\d !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,}$/.test(str);

  // if (!hasUppercase) {
  //   return "Password must contain at least 1 uppercase letter(s)";
  // }

  // // Regex test str has 1 special character [ ~`! @#$%^&*()_-+={[}]|\:;"'<,>.?/ ]
  // const hasSpecialCharacter =
  //   /^(?=.*[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,}$/.test(
  //     str
  //   );

  // if (!hasSpecialCharacter) {
  //   return "Password must contain at least 1 non-alphanumeric character(s)";
  // }

  // No error after str pass all validation
  return "";
};
