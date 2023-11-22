const caesar = (cipher_text, params) => {
  let encoded_text = "";
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("")

  for (let char_index = 0; char_index < cipher_text.length; char_index++) {
    let char = cipher_text[char_index];
    const charIndex = alphabet.indexOf(char.toLowerCase())
    if (charIndex != -1) {
      const encoded_char = alphabet[(charIndex + params) % alphabet.length];
      encoded_text += (char == char.toUpperCase()) ? encoded_char.toUpperCase() : encoded_char
    } else {
      encoded_text += char;
    }
  }
  return encoded_text;
}

module.exports = caesar
