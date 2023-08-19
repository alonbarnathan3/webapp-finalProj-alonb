function saveToFile(data) {
    fs.readFile('data.json', function (err, res) {
        var json = JSON.parse(res)
        json["items"].push(data)
        fs.writeFile("data.json", JSON.stringify(json), function(err){
            if (err) throw err;
            console.log('The data was appended to file!');
          });
    })
}
module.exports = {
    saveToFile
}
