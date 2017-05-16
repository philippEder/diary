/**
 * Created by Philipp on 24.02.2017.
 */

var service = "http://localhost:3000";
var limit = 7;

function sendEntryPost() {
    var entryValue = document.getElementById("entry").value;
    var data = {entry:entryValue};

    $.post(
        service+"/newEntry",
        data,
        function(data) {
            document.getElementById("entries").innerHTML=toDiaryEntriesHtml(data);
        }
    );
}

function getEntries() {

    var data = {limit:limit}

    $.post(
        service+"/entries",
        data,
        function( data ) {
            document.getElementById("entries").innerHTML=toDiaryEntriesHtml(data);
        }
    );

    limit+=7;
}
