export const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  return remainder === parseInt(cpf.charAt(10));
};

export const validateCNPJ = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/\D/g, '');
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;
  let sum = 0;
  let remainder;

  for (let i = 1; i <= 12; i++) {
    sum += parseInt(cnpj.charAt(i - 1)) * (i <= 4 ? i + 8 : i - 4);
  }

  remainder = sum % 11;
  if (remainder < 2) remainder = 0;
  else remainder = 11 - remainder;

  if (remainder !== parseInt(cnpj.charAt(12))) return false;

  sum = 0;
  for (let i = 1; i <= 13; i++) {
    sum += parseInt(cnpj.charAt(i - 1)) * (i <= 5 ? i + 9 : i - 5);
  }

  remainder = sum % 11;
  if (remainder < 2) remainder = 0;
  else remainder = 11 - remainder;

  return remainder === parseInt(cnpj.charAt(13));
};
