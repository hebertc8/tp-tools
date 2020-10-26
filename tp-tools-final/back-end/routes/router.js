const routes = require("../controllers/routes.controller");
const oauth = require("../middleware/oauth");

module.exports = (router) => {
    //Login
    router.post("/ccmslogin", (req, res) => {
        oauth.login(req, res);
    });

    //Refresh token
    router.post("/refreshToken", (req, res) => {
        oauth.refresh(req, res);
    });

    //CRUD

    MapSpRouter("/sqlgetCampaign", "SP_Users");
    MapSpRouter("/sqlgetTools", "SP_Tools");
    MapSpRouter("/sqlgetUrls", "SP_Urls");


    MapSpRouter("/sqlget", "spGetCentral");
    MapSpRouter("/sqlupdate", "spUpdateCentral");
    MapSpRouter("/sqlinsert", "spInsertCentral");
    MapSpRouter("/sqldelete", "spDeleteCentral");

    //Test
    router.post("/test", routes.test);
    router.post("/test2", routes.test2);

    function MapSpRouter(route, spName) {
        router.post(route, oauth.oauthOther, (req, res) =>
            routes.CallSp(spName, req, res)
        );
    }
};