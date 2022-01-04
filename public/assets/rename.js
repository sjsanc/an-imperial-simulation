const fs = require("fs");

const dirs = ".";

fs.readdir(dirs, (err, files) => {
  files.forEach((file, i) => {
    fs.rename("./" + file, `./ICON_${i + 565}.png`, (e) => {
      if (e) console.log(e);
    });
  });
});
