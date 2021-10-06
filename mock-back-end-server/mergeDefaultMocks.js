const fs = require('fs');

fs.readdir('./mock-back-end-server/default-mocks', (err, files) => {
  const defaultMocks = [];
  files.forEach((file) => {
    const mock = require(`./default-mocks/${file}`);
    defaultMocks.push(mock);
  });
  fs.writeFileSync(
    './mock-back-end-server/defaultMock.json',
    JSON.stringify(defaultMocks, null, 2)
  );
});
