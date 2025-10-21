/*global QUnit*/

sap.ui.define([
	"com/example/treeexporttoexcel/controller/TreeTableView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("TreeTableView Controller");

	QUnit.test("I should test the TreeTableView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
