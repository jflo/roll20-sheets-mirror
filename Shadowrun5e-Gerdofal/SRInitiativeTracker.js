on('chat:message', function(msg) {
    if(msg.type == 'general' && (msg.rolltemplate.indexOf('sr') == 0) && (msg.content.indexOf('Initiative') > -1)) {
        //script should only respond to template rolls from sr which have 'Initiative' in them somewhere
        
        var initScore = msg.inlinerolls[1].results.total;
        
        log("player|"+msg.playerid, "/direct rolled initiative of "+initScore);
        var turnorder;
        if(Campaign().get("turnorder") == "") {
            turnorder = []; //NOTE: We check to make sure that the turnorder isn't just an empty string first. If it is treat it like an empty array.
        } else {
            turnorder = JSON.parse(Campaign().get("turnorder"));
        }

    //Add a new custom entry to the end of the turn order.
        turnorder.push({
            id: "-1",
            pr: initScore,
            custom: msg.who
        });
        Campaign().set("turnorder", JSON.stringify(turnorder));
    }
});