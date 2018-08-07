

const https = require('https');
const xml2js = require('xml2js');

const Osc = require('node-osc');
const client = new Osc.Client("localhost", 5555);
const oscServer = new Osc.Server(5554, 'localhost');

console.log("INITILIZED");

oscServer.on('fetch', function (url) {
    console.log('Message:');
    console.log(url[1]);


    https.get(url[1], (res) => {

        let data = '';

        res.on("data", (chunk) => {
            // console.log(chunk);

            data += chunk;
        });

        res.on("end", () => {
            // console.log(data);

            let parser = xml2js.Parser();

            parser.parseString(data, (err, result)=>{
                
                console.log();

                payload = {
                    data: result.site.observed[0].datum
                }

                console.log();

                if(!err){
                    for(let x in result.site.observed[0].datum){

                    client.send('datum', JSON.stringify(result.site.observed[0].datum[x]), function (err) {
                        if (err) {
                          console.error(new Error(err));
                        }
                        
                      });
                    }
                }


            });

        });

    });







})