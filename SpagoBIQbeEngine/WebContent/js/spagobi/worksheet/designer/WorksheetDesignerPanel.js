/**
 * SpagoBI - The Business Intelligence Free Platform
 *
 * Copyright (C) 2004 - 2008 Engineering Ingegneria Informatica S.p.A.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * 
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.

 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 * 
 **/

/**
 * Object name
 * 
 * [description]
 * 
 * 
 * Public Properties
 * 
 * [list]
 * 
 * 
 * Public Methods
 * 
 * [list]
 * 
 * 
 * Public Events
 * 
 * [list]
 * 
 * Authors - Alberto Ghedin
 */
Ext.ns("Sbi.worksheet.designer");

Sbi.worksheet.designer.WorksheetDesignerPanel = function(config) { 

	var defaultSettings = {
		title: LN('sbi.worksheet.designer.worksheetdesignerpanel.title')
	};

	if(Sbi.settings && Sbi.settings.worksheet && Sbi.settings.worksheet.designer && Sbi.settings.worksheet.designer.worksheetDesignerPanel) {
		defaultSettings = Ext.apply(defaultSettings, Sbi.settings.worksheet.designer.worksheetDesignerPanel);
	}

	var c = Ext.apply(defaultSettings, config || {});
	
	Ext.apply(this, c);
	
	this.initPanels();
	
	c = Ext.apply(c, {
			layout: 'border',
			autoScroll: true,
			items: [
			        {
			        	id: 'designToolsPanel',
			        	region: 'west',
			        	width: 275,
			        	collapseMode:'mini',
			        	autoScroll: true,
			        	split: true,
			        	layout: 'fit',
			        	items: [this.designToolsPanel]
			        },
			        {
			        	id: 'sheetsContainerPanel',	  
			        	region: 'center',
			        	split: true,
			        	collapseMode:'mini',
			        	autoScroll: true,
			        	layout: 'fit',
			        	items: [this.sheetsContainerPanel]
			        }
			        ]
	}); 
	Sbi.worksheet.designer.WorksheetDesignerPanel.superclass.constructor.call(this, c);	 		

};

Ext.extend(Sbi.worksheet.designer.WorksheetDesignerPanel, Ext.Panel, {
	designToolsPanel: null,
	sheetsContainerPanel: null,
	worksheetTemplate: {},   // the initial worksheet template; to be passed as a property of the constructor's input object!!!

	initPanels: function(){
		this.designToolsPanel = new Sbi.worksheet.designer.DesignToolsPanel();
		this.designToolsPanel.on('toolschange',function(change){
			this.sheetsContainerPanel.updateActiveSheet(change);
		},this);
		this.sheetsContainerPanel = new Sbi.worksheet.designer.SheetsContainerPanel({
			sheets : this.worksheetTemplate.sheets || []  
		});
		this.sheetsContainerPanel.on('sheetchange',function(activeSheet){
			this.designToolsPanel.updateToolsForActiveTab(activeSheet);
		},this);
	}
	
});
