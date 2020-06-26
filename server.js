const rt = require("./reasonerTranslator");

const express = require('express')
const cors = require("cors");
var bodyParser = require('body-parser')
const app = express()

app.use(cors())
const port = 3000
var jsonParser = bodyParser.json()

app.post('/query', jsonParser, async (req, res) => {
    console.log(req.body);
    const queryGraph = req.body.message.query_graph;
    let rt1 = new rt(queryGraph);
    //console.log(rt1.findQueryGraphNodeID("DOID:10533"))
    await rt1.queryPlan();
    await rt1.queryExecute();
    //console.log(rt1.query_result);
    rt1.responseTranslate();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(rt1.reasonStdAPIResponse));
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))