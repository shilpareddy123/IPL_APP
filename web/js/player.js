/**
*@Filename:player.js
*@Date:03-12-2016
*@Purpose:loading temas and player information
*@Created By:Shilpa K N
*/
$(function () {
  var products=[];
  function readFirebase(callback) {
      var ref = firebase.database().ref();
      ref.on("value", function (data) {
          console.log("firebase");
          products = data.val();
          callback(products);
      });
  }

  // $("products").on("click",function(){
  $('.main-content').load("web/template/team.html");
// });
  $(window).on('hashchange', function(){
    render(decodeURI(window.location.hash));
  });
  function render(url) {
    console.log(url);
    var temp=url.split('/')[0];
    var map={
        "#":function() {
          console.log("# calling");
          renderProductsPage(products);
    },
      "#team":function() {
        console.log("#team calling....");
        var index=url.split('#team/')[1].trim();
        renderSingleTeamPage(index,products);
      }
    }
if(map[temp]){
  map[temp]()
}
}
 readFirebase(function(data) {

      var list = $('.all-products .products-list');
      var theTemplateScript = $("#products-template").html();
      console.log(theTemplateScript);
      //Compile the template​
      var theTemplate = Handlebars.compile(theTemplateScript);
      list.append(theTemplate(data));
    });

      // Each products has a data-index attribute
      function renderSingleTeamPage(index, data) {
            myPromise().then(function(){
         var list = $('.players-list');
             //$.each(data[index], function (key, value) {
                     var TemplateScript = $("#player-template").html();
                     console.log(TemplateScript);
                     //compile the template
                     var myTemplate = Handlebars.compile(TemplateScript);
                     list.append(myTemplate(data[index].team_players));
             //});
});
}

function myPromise()
  {
      return new Promise(function(resolve,reject){
          $(".main-content").load("web/template/team-info.html",function(){
          resolve();
          });
      });

  }
});
