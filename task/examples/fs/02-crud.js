const fs = require('fs');

fs.mkdir(`${__dirname}/new-folder`, (err) => {
    if (err) {
        console.log(err);
        return;
    }

    fs.writeFile(`${__dirname}/new-folder/new-file`, 'Hello World!', (err) => {
        if (err) {
            console.log(err);
            return;
        }

        fs.readFile(`${__dirname}/new-folder/new-file`, {encoding: 'utf8'}, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(data);

            fs.rename(`${__dirname}/new-folder/new-file`, `${__dirname}/new-folder/file`, function (err) {
                if (err) {
                    console.log(err);
                    return;
                }

                fs.unlink(`${__dirname}/new-folder/file`, function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    fs.rmdir(`${__dirname}/new-folder`, function (err) {
                        if (err) {
                            console.log(err)
                        }
                    });
                });
            });
        });
    });
});
