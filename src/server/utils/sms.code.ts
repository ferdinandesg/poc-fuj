export function generateSMSCode() {
  const CHARS = "0123456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    const pos = Math.floor(Math.random() * (10 - 0) + 0);
    code += CHARS[pos];
  }
  return code;
}
