const fs = require('fs')
const http = require('http')
const path = require('path')
// const { extname } = require('path')



const server = http.createServer((req, res) => {
    // Weg zu der angefragen Datei erstellen
    let filePath = path.join('./public', req.url === "/" ? "index.html" : req.url)
    console.log("Pfad: ", filePath)

    // was für einen Dateityp haben wir?
    let extName = path.extname(filePath)
    console.log("Endung: ", extName)

    // Setzen den content jenachdem, was die Dateiendung ist
    let contentType = "text/html"
    switch (extName) {
        case '.js':
            contentType = 'text/javascript'
            break;
        case '.css':
            contentType = 'text/css'
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg'
            break;
        case '.png':
            contentType = 'image/png'
            break;
        case '.ico':
            contentType = 'image/x-icon'
            break;
        // Hier alle Dateitypen, die ihr auf der HP habt, anlegen
    }
    console.log("contentType", contentType)

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err)
            if (err.code === "ENOENT") {
                fs.readFile('./public/404.html', (err, data) => {
                    res.writeHead(200, { 'Content-Type': "text/html" })
                    res.end(data)
                })
            } else {
                res.writeHead(500)
                res.end(`Some Error: ${err.code}`)
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType })
            res.end(data)
        }
    })
})

server.listen(3000, () => console.log("Server running on port 3000"))



