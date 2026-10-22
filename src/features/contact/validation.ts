export type ContactValues = { name: string; email: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (!values.name.trim())
    errors.name = "Sana nasıl seslenelim? Adını yazabilir misin?";
  if (!values.email.trim())
    errors.email = "E-posta adresini ekleyebilir misin?";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Geçerli bir e-posta adresi yazabilir misin?";
  if (!values.message.trim())
    errors.message = "Sohbete başlamak için bir mesaj yazabilir misin?";
  return errors;
}
