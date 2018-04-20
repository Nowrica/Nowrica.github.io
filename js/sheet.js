
      // Client ID and API key from the Developer Console
      var API_KEY = 'AIzaSyAwwt6RWeUA6Wq_vkObx4pAi4g9usrhAmA';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: DISCOVERY_DOCS
        }).then(function () {
          console.log('init done!');
        listMajors2();
        listMajors();
        });
      }

      function listMajors() {
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1k7UAtKcIHl3mUGa60LhWGCKT7vMtlHbRANgZNJhR9v8',
          range: 'Sheet1!C2:E',
        }).then(function(response) {
          var range = response.result;
          var inner = "";
           if(response){
          inner +="<table class='highlight bordered'><tr><th><h5>Name</h5></th><th><h5>Class</h5></th><th><h5>Time</h5></th></tr>";

          if (range.values) {
            for (i = 0; i < range.values.length; i++) {
              var row = range.values[i];
             inner += "<tr><td>" + row[0] +"</td>";
             inner += "<Td>" + row[1] +"</td>";
             inner += "<Td>" + row[2] +"</td></tr>";
            }
          inner +="</table>"
          $("#progress").remove();
          document.getElementById("listtable").innerHTML = inner;

          } else {
           $("#progress").remove();
           document.getElementById("listtable").innerHTML = "<Br><Br><h5>현재 신청인원이 없거나 가이드 일정이 없습니다.</h5><br><img src='http://in.cum2.me/downloads/end.jpg/resize/600x600'>";
          }
         }
        }, function(response) {

        });
      }

      function listMajors2() {
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1k7UAtKcIHl3mUGa60LhWGCKT7vMtlHbRANgZNJhR9v8',
          range: 'Sheet2!A1:E4',
        }).then(function(response) {
          var range = response.result;
          var inner = "";
           if(response){
          inner +="<table class='highlight bordered'><tr>";

          if (range.values) {
            for (i = 0; i < range.values.length; i++) {
              var row = range.values[i];
              for (var j = 0; j < 5; j++){
                if (i%2 == 0) {
                  inner += "<th><h5>" + row[j] +"</h5></th>";
                }else if(i%2 == 1){
                  if (row[j]) {
                      inner += "<td>" + row[j] +"</td>";
                  }else {
                    inner += "<td></td>"
                  }
                }
              }
                inner += "</tr>";
                if (range.values.length==3 && i==2) {
                  inner += "<tr>";
                  for (var x = 0; x < 5; x++) {
                    inner += "<td>&nbsp</td>";
                  }
                  inner += "</tr>";
                }

            }
          inner +="</table>"
          document.getElementById("classtable").innerHTML = inner;

          } else {
           $("#progress").remove();
        
          }
         }
        }, function(response) {

        });
      }
