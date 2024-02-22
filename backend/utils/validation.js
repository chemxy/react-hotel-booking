function isValidText(value, minLength = 1) {
  return value && value.trim().length >= minLength;
}

function isValidDate(dateString) {

  const validDatePattern = new RegExp(/^\d+-\d{2}-\d{2}$/);
  if (!validDatePattern.test(dateString)) {
    return false;
  }
  const date = dateString.split('-');
  if (Number(date[1]) > 12 || Number(date[1]) < 1) {
    return false;
  }
  if ([1, 3, 5, 7, 8, 10, 12].includes(Number(date[1])) && Number(date[2] > 31)) {
    return false;
  }
  if ([4, 6, 9, 11].includes(Number(date[1])) && Number(date[2] > 30)) {
    return false;
  }
  if ([2].includes(Number(date[1])) && Number(date[2] > 29)) {
    return false;
  }

  return true;
}

function isValidImageUrl(value) {
  return value && value.startsWith('http');
}

function isValidEmail(value) {
  return value && value.includes('@');
}

exports.isValidText = isValidText;
exports.isValidDate = isValidDate;
exports.isValidImageUrl = isValidImageUrl;
exports.isValidEmail = isValidEmail;