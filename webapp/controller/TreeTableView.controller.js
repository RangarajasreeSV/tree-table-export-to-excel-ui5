sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/export/Spreadsheet"
], (Controller, JSONModel, MessageToast, Spreadsheet) => {
    "use strict";

    return Controller.extend("com.example.treeexporttoexcel.controller.TreeTableView", {
        onInit() {
            var oView = this.getOwnerComponent();
            var oDataModel = new JSONModel();
            var aData = {
                "Employees": [
                    {
                        "EmployeeID": "E001",
                        "EmployeeName": "Ramesh",
                        "Designation": "Manager",
                        "FamilyMembers": [
                            {
                                "MemberName": "Anitha",
                                "Age": 35,
                                "Relationship": "Wife",
                                "ExpenseShare": 40
                            },
                            {
                                "MemberName": "Rohith",
                                "Age": 10,
                                "Relationship": "Son",
                                "ExpenseShare": 20
                            },
                            {
                                "MemberName": "Ramanaiah",
                                "Age": 65,
                                "Relationship": "Father",
                                "ExpenseShare": 20
                            },
                            {
                                "MemberName": "Kamala",
                                "Age": 60,
                                "Relationship": "Mother",
                                "ExpenseShare": 20
                            }
                        ]
                    },
                    {
                        "EmployeeID": "E002",
                        "EmployeeName": "Sumana",
                        "Designation": "Developer",
                        "FamilyMembers": [
                            {
                                "MemberName": "Bhargav",
                                "Age": 35,
                                "Relationship": "Husband",
                                "ExpenseShare": 20
                            },
                            {
                                "MemberName": "Prasanna",
                                "Age": 9,
                                "Relationship": "Daughter",
                                "ExpenseShare": 20
                            },
                            {
                                "MemberName": "Ananda",
                                "Age": 58,
                                "Relationship": "Father",
                                "ExpenseShare": 40
                            },
                            {
                                "MemberName": "Srinidhi",
                                "Age": 55,
                                "Relationship": "Mother",
                                "ExpenseShare": 20
                            }
                        ]
                    },
                    {
                        "EmployeeID": "E003",
                        "EmployeeName": "Manish",
                        "Designation": "Auditor",
                        "FamilyMembers": [
                            {
                                "MemberName": "Bhumesh",
                                "Age": 58,
                                "Relationship": "Father",
                                "ExpenseShare": 60
                            },
                            {
                                "MemberName": "Rajeswari",
                                "Age": 50,
                                "Relationship": "Mother",
                                "ExpenseShare": 40
                            }
                        ]
                    }

                ]
            }

            oDataModel.setData(aData);
            oView.setModel(oDataModel);
        },
        onExcelExport() {
            var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            var oTable = this.byId("employeeTreeTable");
            var oBinding = oTable.getBinding("rows");
            var aData = oBinding.getModel().getProperty("/Employees");
            var aExportData = this._convertTreeForExport(aData);
            var aCols = [
                {
                    label : oBundle.getText("employeeID"),
                    property :"EmployeeID"
                },
                {
                     label : oBundle.getText("employeeName"),
                    property :"EmployeeName"

                },
                {
                      label : oBundle.getText("designation"),
                    property :"Designation"
                },
                {
                       label :oBundle.getText("familyMemberName"),
                    property :"MemberName"

                },
                {

                       label : oBundle.getText("relation"),
                    property :"Relationship"
                },
                  {

                       label : oBundle.getText("age"),
                    property :"Age"
                }, {

                       label :  oBundle.getText("expense"),
                    property :"ExpenseShare"
                }
            ]
            var oSettings = {
                workbook: {
                    columns: aCols,
                    context: {
                        sheetName: oBundle.getText("sheetName")
                    }
                },
                dataSource: aExportData,
                fileName: oBundle.getText("fileName"),
                worker: false
            };
            var oSpreadsheet = new Spreadsheet(oSettings);
            oSpreadsheet.build().then(function () {
                MessageToast.show(oBundle.getText("successMessage"));
            }).finally(function () {
                oSpreadsheet.destroy();
            })
        },
        _convertTreeForExport(aNodes, iLevel =0, aResult =[]){
            aNodes.forEach(oNode => {
                   var oCopy = { ...oNode };
                delete oCopy.FamilyMembers;
                oCopy.level = iLevel + 1;
                oCopy.IndentedName = `${"".repeat(iLevel*4)}${oNode.name}`
                aResult.push(oCopy);
                if(oNode.FamilyMembers && oNode.FamilyMembers.length > 0){
                    this._convertTreeForExport(oNode.FamilyMembers, iLevel + 1, aResult);
                }
            });
               return aResult
        }
    });
});