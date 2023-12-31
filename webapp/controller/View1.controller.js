sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/viz/ui5/format/ChartFormatter",
    "sap/viz/ui5/controls/VizTooltip"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, ChartFormatter, VizTooltip) {
        "use strict";

        return Controller.extend("com.an.dashboard.controller.View1", {
            onInit: function () {
                 this.getData();
                 this.testingData();
                 this.getHospitalData();
                
            },

            getData: function(){
                var oThat = this;
                $.ajax({
                    type: "GET",
                    url: "https://api.rootnet.in/covid19-in/stats/latest",
                    datatype: 'json',
                    success: function(result){
                          var oDashBoardModel = new JSONModel(result);
                          oThat.getView().setModel(oDashBoardModel, "ReportModel");
                          var oHeadCount = oThat.getView().getModel("ReportModel").getData().data.summary.confirmedCasesIndian;
                          oThat.getView().byId('idObjectHeader').setNumber(oHeadCount);
                          var oObj = {
                            "Andhra": oThat.getView().getModel("ReportModel").getData().data.regional[1].confirmedCasesIndian,
                            "Telangana": oThat.getView().getModel("ReportModel").getData().data.regional[31].confirmedCasesIndian,
                            "TamilNadu": oThat.getView().getModel("ReportModel").getData().data.regional[30].confirmedCasesIndian
                         };
                         var iconmodel = new JSONModel();
                         iconmodel.setData(oObj);
                         var oView = oThat.getView();
                         oView.setModel(iconmodel, "IconTabModel");
                    }
                })
            },
            testingData: function(){
                var oThat = this;
                $.ajax({
                      type: "GET",
                      url:"https://api.rootnet.in/covid19-in/stats/testing/history",
                      datatype:'json',
                      success: function(result){
                            var oTestingModel = new JSONModel();
                            oTestingModel.setData(result);
                         var oView = oThat.getView();
                         oView.setModel(oTestingModel, "testModel");
                      },
                      error: function(){

                      }
                });
            },
            getHospitalData: function(){
                var oThat = this;
                $.ajax({
                    type: "GET",
                    url: "https://api.rootnet.in/covid19-in/hospitals/beds",
                    datatype:'json',
                    success: function(result){
                        var oJSONModel = new sap.ui.model.json.JSONModel();
                        var main = result.data.regional;
                        var data = {
                            main
                        };
                        var oVizFrame = oThat.getView().byId("idVizChart");
                        var oPutawayModel = new sap.ui.model.json.JSONModel(data);
                        oVizFrame.setModel(oPutawayModel);
                    },
                    error: function(){

                    }
                });
            }          
        });
    });
