module.exports = {
  nanoid: () => 'mocked-id-' + Math.random().toString(36).substr(2, 9),
  customAlphabet: () => () => 'mocked-custom-id'
};
