var express  = require("express");
var path = require('path')
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({
    extended : false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/:id', function(req, res){


    var dateObj;
    var id = req.params.id;
    if(isNaN(id) === false) {
        //id is a number string
        var unix =Math.floor(  (new Date(parseInt(id))).getTime() / 1000  ) ;
        var parsed =new Date(parseInt(id)) ;
        var date = (parsed).toString().replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/,'$2-$1-$3');

        console.log("success!!!: "+unix);

    } else  {
        var unix =Math.floor(  (new Date(id)).getTime() / 1000  ) ;

        var parsed =new Date(id) ;
        var date = (parsed).toString().replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/,'$2-$1-$3');

    }



    if(isNaN(unix) ===false) {

        dateObj = {
            unix : unix,
            natural : date
        }

    } else {
            dateObj = {
                unix : null,
                natural : null
            }
    }

   // var TimeNoramal = parsed.toISOString()
    console.log("****************\nunix :"+unix+"\ndate: "+date);
    res.send(dateObj);
}).listen(8080 || process.env.PORT);