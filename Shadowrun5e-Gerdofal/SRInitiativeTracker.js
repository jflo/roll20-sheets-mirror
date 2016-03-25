on('chat:message', function(msg) {
    if(msg.type == 'general' && (msg.rolltemplate.indexOf('sr') == 0) && (msg.content.indexOf('Initiative') > -1)) {
        //script should only respond to template rolls from sr which have 'Initiative' in them somewhere
        
        var initScore = msg.inlinerolls[1].results.total;
        var turnorder;
        var player = getObj("player", msg.playerid);
        //log(player);
        var charId = player.get("speakingas");
        //log(charId);
        charId = charId.slice(charId.indexOf('|')+1);
        //log(charId);
        var character = getObj("character", charId);
        var token = findObjs({_type:"graphic",represents:charId});
        //log(token[0]);
        //log(character);
        if(Campaign().get("turnorder") == "") {
            turnorder = []; //NOTE: We check to make sure that the turnorder isn't just an empty string first. If it is treat it like an empty array.
        } else {
            turnorder = JSON.parse(Campaign().get("turnorder"));
        }

    //Add a new custom entry to the end of the turn order.
        turnorder.push({
            id: token[0].get("_id"),
            pr: initScore
            //custom: character.get("name")
        });
        Campaign().set("turnorder", JSON.stringify(turnorder));
    }
});

on('chat:message', function(msg) {
    if(msg.content == '!nextpass') {

        if(Campaign().get("turnorder") == "") {
            turnorder = []; 
        } else {
            turnorder = JSON.parse(Campaign().get("turnorder"));
        }

        nextPassOrder = [];
        //foreach obj in turnorder
        //if pr < 10 remove from []
        //otherwise pr = pr-10
        //sort array desc
        Campaign().set("turnorder", JSON.stringify(nextPassOrder));   
    }

});