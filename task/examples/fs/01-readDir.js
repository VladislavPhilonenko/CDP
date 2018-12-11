const fs = require('fs');

function readDir(base) {
    fs.readdir(base, (err, files) => {
        if (err) {
            console.log(err);
            return;
        }

        files.forEach(item => {
            fs.stat(`${base}\\${item}`, (err, state) => {
                if (err) {
                    console.log(err);
                    return;
                }

                if (state.isDirectory()) {
                    readDir(`${base}\\${item}`);
                } else {
                    console.log(`${base}\\${item}`);
                }
            });
        });
    });
}

readDir('C:\\Projects\\node-js_cdp\\01');
