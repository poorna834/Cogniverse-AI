const generateCertificateId = () => {
  return (
    "SF-" +
    Math.random().toString(36).substring(2, 8).toUpperCase() +
    "-" +
    Date.now().toString().slice(-5)
  );
};

module.exports = generateCertificateId;