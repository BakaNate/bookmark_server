function formatString(str) {
  let retStr = str;

  retStr = str.replaceAll('/', '%2F');
  retStr = retStr.replace(':', '%3A');
  return retStr;
}

module.exports = {
  formatString,
};
