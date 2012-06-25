/* SpagoBI, the Open Source Business Intelligence suite

* � 2012 Engineering Ingegneria Informatica S.p.A. - SpagoBI Competency Center
* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this file,
* You can obtain one at http://mozilla.org/MPL/2.0/. */
package it.eng.qbe.datasource.naming;

import it.eng.qbe.datasource.configuration.IDataSourceConfiguration;


/**
 * The Interface NamingStrategy.
 * 
 * @author Andrea Gioia
 */
public interface IDataSourceNamingStrategy {
	String getDataSourceName(IDataSourceConfiguration configuration) ;
}
