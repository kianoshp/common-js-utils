Utils.Form = {
	/**
	* @description Utility method that will take the "placeholder" attribute
	* value and place as text in the input field and default instruction text
	* or label. Once the user focuses in the input field the text will be removed.
	* This is a work around for IE < 10 which does not process the placeholder attribute.
	*
	* @param placeholderClass: css style added to the input field
	*/
	activatePlaceHolder: function(placeholderClass) {
		if('placeholder' in document.createElement('input')) return false;
		var inputs = this.getAllPlaceholderEls();
		var inputLen = inputs.length;
		while (inputLen--) {
            if (inputs[inputLen].getAttribute("placeholder") && inputs[inputLen].getAttribute("placeholder").length > 0) {
                inputs[inputLen].value = inputs[inputLen].getAttribute("placeholder");
                if(placeholderClass) {
                    inputs[inputLen].classList.add(placeholderClass);
                }
                inputs[inputLen].onclick = function() {
                    if (this.value == this.getAttribute("placeholder")) {
                        this.value = "";
                    }
                    return false;
                }
                inputs[inputLen].onblur = function() {
                    if (this.value.length < 1) {
                        this.value = this.getAttribute("placeholder");
                    }
                }
			}
		}		
	},

	/**
	* @description Utility method that will get all the elements that
	* have the ability to add placeholder attribute (and be visible).
	*
	* @return array of elements that match the input type
	*/
	getAllPlaceholderEls: function() {
		var inputTypes = ['text', 'tel', 'email', 'url', 'search'],
			dataLen = inputTypes.length,
			inputQueryString = 'input',
			inputTypeString = '[type="%s"]';

		while (dataLen--) {
			inputQueryString += inputTypeString.replace('%s', inputTypes[dataLen]);
			if (dataLen > 0) inputQueryString += ","; 
		}

		return document.querySelectorAll(inputQueryString);
	}	
}