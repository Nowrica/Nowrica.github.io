
      // Client ID and API key from the Developer Console
      // var API_KEY = 'AIzaSyAwwt6RWeUA6Wq_vkObx4pAi4g9usrhAmA';
      var API_KEY = 'AIzaSyBGNLQFCraqJ4Xh2XgksYNO_-bxU8Kqnac';
      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
      var SCOPES = "https://www.googleapis.com/auth/spreadsheets";
      // var CLIENT_ID: '167979554702-qt3p5o21iro2e82pqfmh8c92in3necc5.apps.googleusercontent.com';
      var spreadsheet_Id = '1k7UAtKcIHl3mUGa60LhWGCKT7vMtlHbRANgZNJhR9v8';
      var CLIENT_ID = '11124481730-bcg8ujjav6h9q6sfvcvo5iuvga9e632s.apps.googleusercontent.com';
      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
          clientId: CLIENT_ID
        }).then(function () {
          console.log('init done!');
        listMajors2();
        listMajors();
        });
      }


      function listUpdate(data, trange) {
        //console.log(data + trange);
      var values = [
          [
            data
          ],
          // Additional rows ...
        ];
        var body = {
          values: values
        };

        gapi.client.sheets.spreadsheets.values.update({
          spreadsheetId: spreadsheet_Id,
          range: 'Sheet2!'+trange,
          valueInputOption: 'RAW',
          resource: body
        }).then(function(response) {
          console.log(response.result);
        }, function(reason) {
          console.error('error: ' + reason.result.error.message);
        });
      }

      //classtable 정리
      function classClear() {
        gapi.client.sheets.spreadsheets.values.clear({
          spreadsheetId: spreadsheet_Id,
          range: 'Sheet2!A2:E2',
          }).then(function(response) {
            listMajors2();
            console.log(response.result);
          }, function(reason) {
        console.error('error: ' + reason.result.error.message);
            });
            gapi.client.sheets.spreadsheets.values.clear({
              spreadsheetId: spreadsheet_Id,
              range: 'Sheet2!A4:E4',
              }).then(function(response) {
                listMajors2();
                console.log(response.result);
              }, function(reason) {
            console.error('error: ' + reason.result.error.message);
                });
          }
      //삭제
      function listClaer(data) {
          var x = data.valueOf() - 1;
        //  console.log(data+':'+x);
        gapi.client.sheets.spreadsheets.batchUpdate({
          spreadsheetId: spreadsheet_Id,
          requests: [
              {
          deleteDimension: {
                  range: {
                    sheetId: '111726217',
                    dimension: 'ROWS',
                    startIndex: x,
                    endIndex: data
                  }
                }
              }]
        }).then(function(response) {
            listMajors();
        console.log(response.result);
      }, function(reason) {
        console.error('error: ' + reason.result.error.message);

      });
    }
      //오른쪽 리스트
      function listMajors() {
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: spreadsheet_Id,
          range: 'Sheet1!C2:E',
        }).then(function(response) {
          var range = response.result;
          var inner = "";
           if(response){
          inner +="<table class='highlight bordered'><tr><th><h5>Name</h5></th><th><h5>Class</h5></th><th><h5>Time</h5></th><th><h5>delete</h5></th></tr>";

          if (range.values) {
            for (i = 0; i < range.values.length; i++) {
              var row = range.values[i];
              var row2 = range.length;
              var x = i.valueOf() + 2;
             inner += "<tr><td><div id='"+row[0]+"' draggable='true' ondragstart='drag(event)'>" + row[0] +"</div></td>";
             inner += "<Td>" + row[1] +"</td>";
             inner += "<Td>" + row[2] +"</td>";
             inner += "<td><a class='waves-effect waves-light btn black' onclick='listClaer("+x+")'>delete</a></td></tr>";
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
      //왼쪽리스트
      function listMajors2() {
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: spreadsheet_Id,
          range: 'Sheet2!A1:E4',
        }).then(function(response) {
          var range = response.result;
          var inner = "";
           if(response){
          inner +="<table class='highlight bordered'><tr>";
          if (range.values) {
            for (i = 0; i < range.values.length; i++) {
              var row = range.values[i];
              var num = 65;
              var x = i+1;
              for (var j = 0; j < 5; j++){
                if (i%2 == 0) {
                  inner += "<th><h5>" + row[j] +"</h5></th>"; //0 2
                }
                else { //1 3
                  var idname = String.fromCharCode(num);
                  num++;
                  if (!row[j]) { // !null
                    inner += "<td id='"+idname+x+"'><div ondrop='drop(event)' ondragover='allowDrop(event)'>&nbsp</div></td>";
                  }else { //nulld
                    inner += "<td id='"+idname+x+"'><div ondrop='drop(event)' ondragover='allowDrop(event)'>" + row[j] +"</div></td>";
                  }
                }
              }
              inner += "</tr>";
              if (range.values.length==3 && i==2) {
              inner +="<tr>";
              var x = 4;
              for (var k = 0; k < 5; k++) {
                  var idname = String.fromCharCode(num);
                  num++;
                  inner += "<td id='"+idname+x+"'><div ondrop='drop(event)' ondragover='allowDrop(event)'>&nbsp</div></td>";
                }
              inner += "</tr>";
              }

            }

          inner +="</table>"
          inner += "<br><div><a class='waves-effect waves-light btn black' onclick='classClear()'>delete</a></div>";
          document.getElementById("classtable").innerHTML = inner;

          //
          } else {
           $("#progress").remove();
        
          }
         }
        }, function(response) {

        });
      }
