const TRAPIGraphHandler = require("@biothings-explorer/query_graph_handler");
const swaggerValidation = require("../../middlewares/validate")
const path = require("path");
const smartAPIPath = path.resolve(__dirname, '../../../data/smartapi_specs.json');

class RouteQueryV1ByTeam {
    setRoutes(app) {
        app.post('/v1/team/:team_name/query', swaggerValidation.validate, async (req, res, next) => {
            try {
                const queryGraph = req.body.message.query_graph;
                const enableIDResolution = (req.params.team_name === "Text Mining Provider") ? false : true;
                const handler = new TRAPIGraphHandler.TRAPIQueryHandler(
                    {
                        teamName: req.params.team_name,
                        enableIDResolution
                    },
                    smartAPIPath
                );
                handler.setQueryGraph(queryGraph);
                await handler.query();
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(handler.getResponse()));
            }
            catch (error) {
                next(error);
            }
        });
    }
}

module.exports = new RouteQueryV1ByTeam();