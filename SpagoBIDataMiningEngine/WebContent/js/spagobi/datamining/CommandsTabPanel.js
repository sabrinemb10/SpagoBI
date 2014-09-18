/** SpagoBI, the Open Source Business Intelligence suite
 * Copyright (C) 2012 Engineering Ingegneria Informatica S.p.A. - SpagoBI Competency Center
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0, without the "Incompatible With Secondary Licenses" notice. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/. **/

/**
 *     
 *  @author
 *  Monica Franceschini
 */
 
  
Ext.define('Sbi.datamining.CommandsTabPanel', {
	extend: 'Ext.tab.Panel',
	
	layout: {
        type: 'fit'
    },
    
	//title: 'Data Mining Engine',
    activeTab: 0,
    tosetactive:0,
    fillVarPanel: null,
   
	config:{
		border: 0

	},
	
	constructor : function(config) {
		this.initConfig(config||{});

		
		this.varWin = Ext.create('Ext.Window', {
	        width: 600,
	        height: 200,
	        x: 10,
	        y: 100,
	        autoScroll: true,
	        plain: true,
	        autoDestroy: false,
	        headerPosition: 'right',
	        closeAction:'hide',
	        layout: 'fit',
	        items: []
	    });
		this.callParent(arguments);
	},

	initComponent: function() {		
		this.callParent();
		this.getCommands();
		this.setActiveTab(this.tosetactive);
	}

	, getCommands: function(){
		
		var thisPanel = this;
		
		var service = Ext.create("Sbi.service.RestService",{
			url: "command"
		});
		
		var functionSuccess = function(response){

			if(response != null && response.responseText !== undefined && response.responseText !== null && response.responseText !== ''){
			
				var res = Ext.decode(response.responseText);				
				
				if(res && Array.isArray(res)){

					for (var i=0; i< res.length; i++){						
						var command = res[i];

						var name = command.name;
						var mode = command.mode;
						var label = command.label;


						var outputsTab= Ext.create("Sbi.datamining.OutputsTabPanel",{
					        title: '<span style="color: #28596A;">'+label+'</span>',
					        iconCls: 'tab-icon',
					        tabPosition: 'left',
					        xtype: 'tab',
							listeners: {
					            'tabchange': function (tabPanel, tab) {
					               tabPanel.setOutputAutoMode(tab.output);
					            }
					        },
					        commandName: name
					    });
						
						thisPanel.add(outputsTab);

						if(mode == 'auto'){
							this.setActiveTab(i);
						}
						var tabElem = thisPanel.dockedItems.items[0].items.items[i].getEl();
						
						Ext.get(tabElem).on('click', function(e, t) {
							thisPanel.addVariables();
				        });
					}	
				}

			}
			
		};
		service.callService(this, functionSuccess);
	}
	, setCommandAutoMode: function(command, activetab){
		var thisPanel = this;
		
		var service = Ext.create("Sbi.service.RestService",{
			url: "command"
			,pathParams: [command] 
		});
		
		var functionSuccess = function(response){

			if(response != null && response.responseText !== undefined && response.responseText !== null && response.responseText !== ''){
			
				var res = Ext.decode(response.responseText);		
				
				if(res != null && res !== undefined){
					var autooutput = res.outputName;
					this.setActiveTab(activetab);

				}
			}

		};
		service.callService(this, functionSuccess);
	}
	, addVariables: function(){
		var commandName = this.getActiveTab().commandName;
		this.fillVarPanel = Ext.create('Sbi.datamining.FillVariablesPanel',{callerName : commandName, caller: 'command'});
		this.varWin.add(this.fillVarPanel);
		this.varWin.show();
	}

	
});