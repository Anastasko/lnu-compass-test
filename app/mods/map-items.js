var xls_to_json = require("xls-to-json");

xls_to_json({
    input: "instor.xls",  // input xls
    output: "output.json",
    sheet: "Лист1"  // specific sheetname
}, function(err, result) {
    if(err) {
        console.error(err);
    } else {
        let x = 0;
        result.filter(r => r.room).forEach(r => {
            console.log(r);console.log( ',');
            ++x;
        });
        console.log(x);
    }
});