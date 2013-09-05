Utils.Common = {
	/**
	* @description Utility method that will parse the URL and 
	* retrieve the params passed in.
	*
	* @param strParamName the param name of the desired value
	* @return value of the URL param
	*/
	getURLParam: function(strParamName) {
		var strReturn = "",
			strHref = window.location.href,
			bFound=false,
	  		cmpstring = strParamName + "=",
			cmplen = cmpstring.length;

		if ( strHref.indexOf("?") > -1 ) {
			var strQueryString = strHref.substr(strHref.indexOf("?") + 1),
				aQueryString = strQueryString.split("&"),
				aQueryStringLen = aQueryString.length;

			while ( aQueryStringLen-- ) {
		  		if ( aQueryString[aQueryStringLen].substr(0,cmplen) == cmpstring ) {
					var aParam = aQueryString[aQueryStringLen].split("=");
					strReturn = aParam[1];
					bFound=true;
					break;
		  		}  
			}
	  	}
		if ( !bFound ) return "";
		return strReturn;
	},
	/**
	* @description Utility method that will clone an object literal in javascript.
	* This is in order to overcome the reference issue like this:
	* 	var foo = [1, 2, 3];
	*	var bar = foo;
	*	bar[1] = 5;
	*	alert(foo[1]);
	*	// alerts 5
	*
	* @param obj: object to be cloned
	* @return newObj
	*/
	cloneObj: function(obj) {
		var newObj = (obj instanceof Array) ? [] : {};
		for (i in obj) {
			if (!obj.hasOwnProperty(i)) {
				continue;
			}
			
			if (obj[i] && typeof obj[i] == "object") {
				newObj[i] = obj[i].deepCopy();
			} else {
				newObj[i] = obj[i];
			}
		} 
		return newObj;		
	},

	/**
	* @description this is function that will update a given object by diving deep 
	* into the object structure and changing the given value. The changed given value
	* has the following structure:
	* <ul>
	* 	<li>Map object containing:
	*		<ul>
	*			<li>Key: the name of the distinguishing row for example 'rowText'</li>
	*			<li>Value: this is another Map object that contains:
	*				<ul>
	*					<li>Key: the value for the distinguishing row for example 'section'</li>
	*					<li>Value: object that will be changed for example {isVisible: false}</li>
	*				</ul>
	*			</li>
	*		</ul>
	*	</li>
	* </ul>
	*
	* @param obj Object that will be updated
	* @param changedValuesMap a map object containing all the changed values (see description)
	* TODO update the keySet() function
	*/
	updateObject: function(obj, changedValuesMap) {
		var keys = changedValuesMap.keySet();
		var dataLen = keys.length;
		
		while(dataLen--) {
			var key = keys[dataLen];
			var changedValueMap = changedValuesMap.get(key);
			
			var keys2 = changedValueMap.keySet();
			var dataLen2 = keys2.length;
			
			while(dataLen2--) {
				var key2 = keys2[dataLen2];
				var changedValue = changedValueMap.get(key2);
				
				for(var i = 0; i < obj.length; i++) {
					var thisObj = obj[i];
					for (var thisName in thisObj) {
						if(thisName === key && thisObj[thisName] === key2) {
							if(typeof changedValue === 'object') {
								for (var thisKey in changedValue) {
									if (typeof thisObj[thisKey] == 'function') {
										thisObj[thisKey](changedValue[thisKey]);
									} else {
										thisObj[thisKey] = changedValue[thisKey];
									}//end if 'function'
								}//end for
							}//end if 'object'
						}//end check for name and value
					}//end for
				}//end for
			}//end while
		}//end while
		
		return obj;
	},

	/**
	* @description this function will take the URL and parse out all 
	* the query Strings and create a query param object with the following
	* structure:
	* <ul>
	*	<li>Name of the query string param</li>
	*	<li>Value of the query string param</li>
	* </ul>
	*
	* @return queryParamObj
	*/
	createQueryParamObj: function() {
		var queryParamObj = {},
			strHref = window.location.href;
		
		if(strHref.indexOf('?') >= 0) {
			var queryStrings = strHref.slice(strHref.indexOf('?') + 1, strHref.length);
			
			//remove hash event information for now
			if(queryStrings.indexOf('#') >= 0) {
				queryStrings = queryStrings.slice(0, queryStrings.indexOf('#'));
			}
			
			//Create an array object containing the query strings
			var queryStringsArr = queryStrings.split('&');
			var dataLen = queryStringsArr.length;
			
			//loop through the query strings and add them to the queryParamObj
			while(dataLen--) {
				var thisQueryString = queryStringsArr[dataLen];
				//Split the query string name and value
				var thisQueryStringArr = thisQueryString.split('=');
				queryParamObj[thisQueryStringArr[0]] = decodeURIComponent(thisQueryStringArr[1]);
			}
		}
		
		return queryParamObj;
	}
}