/**
 * シーザー暗号を使って文字列を暗号化する
 * @param text 暗号化する文字列
 * @param shift シフト数
 * @returns 暗号化された文字列
 */
export default function CaesarCipher(text: string, shift: number): string {
  // 右シフトのみをサポートし、大文字と小文字は区別する
  return text
    .split("")
    .map((char) => {
      const charCode = char.charCodeAt(0);

      if (charCode >= 65 && charCode <= 90) {
        // 大文字
        return String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
      } else if (charCode >= 97 && charCode <= 122) {
        // 小文字
        return String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
      } else {
        // 英字以外の文字はそのまま返す
        return char;
      }
    })
    .join("");
}
