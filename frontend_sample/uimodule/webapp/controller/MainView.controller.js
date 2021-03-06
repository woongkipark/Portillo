sap.ui.define(
  ["./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Fragment) {
    "use strict";

    return Controller.extend("gitpg.myapp.controller.MainView", {



      onInit: function () {
        // let oJson = new JSONModel();
        
        // this.getView().setModel(oJson, 'myNode');
        // oJson.loadData(
        //   'http://localhost:8921/files'
        //   // 'https://port-8921-nodejs-quaint-lizard-lgx0920328747.codeanyapp.com/files'
        // ).then(
        //   function () {
        //     debugger;
        //   }.bind(this)
        // )

        // jquery
        $.ajax(
          'http://localhost:8921/files',
          {
            method: "GET",
            success : function (...params) {
              let Success = JSON.parse(params[0]);
              
              // myData
              let oJson = new JSONModel(Success);

              this.getView().setModel(oJson,'myData')

              debugger;
            }.bind(this),
            error : function (...params) {
              debugger;
            }
          }
        )
      },
      onPress:function (oEvent) {
        let sIdRaiseEvent = oEvent.getSource().getId();

        let sIdLink1 = this.getView().byId('link1').getId();
        let sIdLink2 = this.getView().byId('link2').getId();

        debugger;

        let pFragment ;

        if (sIdRaiseEvent === sIdLink1) {
          pFragment = Fragment.load(
            {
              name : "gitpg.myapp.view.fragments.link1",
              type : "XML",
              id : "link1Fragment",
              controller : this
            }
          )

        } else if (sIdRaiseEvent === sIdLink2) {
          pFragment = Fragment.load(
            {
              name : "gitpg.myapp.view.fragments.link2",
              type : "XML",
              id : "link2Fragment",
              controller : this
            }
          )

        }

        pFragment.then(function (oView) {
          let oMyExtend = this.getView().byId('myExtend');

          oMyExtend.destroyItems(); // myExtend ?????? Item ?????? ??? ????????????
          oMyExtend.addItem(oView); // Item ?????????
        }.bind(this));

      }

    });
  }
);