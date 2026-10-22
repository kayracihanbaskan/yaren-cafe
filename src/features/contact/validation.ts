export type ContactValues = { name: string; email: string; message: string };
export type ContactErrorCode = "required" | "invalid_email";
export type ContactErrors = Partial<
  Record<keyof ContactValues, ContactErrorCode>
>;
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (!values.name.trim()) errors.name = "required";
  if (!values.email.trim()) errors.email = "required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "invalid_email";
  if (!values.message.trim()) errors.message = "required";
  return errors;
}
