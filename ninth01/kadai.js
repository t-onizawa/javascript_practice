window.onload = function () {
	
	var count = function () {
		var userInfoTbl = document.getElementById('user_info');
		var resultInfoTbl = document.getElementById('result_info');
		var sendBtn = document.getElementById('send');
		var inputs = document.getElementsByTagName('input');
		var inputsLength = inputs.length;
		var countNumber = { name:{}, email:{}, telephone:{}, address:{}, login:{}};
		for ( var key in countNumber ) {
			countNumber[key].focus = 0;
			countNumber[key].max = 0;
			countNumber[key].not = 0;
			countNumber[key].err = 0;
		}
		return {
			init : function () {
				for ( var i = 0; i < inputsLength; i++ ) {
					if ( inputs[i].addEventListener ) {
						inputs[i].addEventListener('focus', this.focusCountUp, false);
						inputs[i].addEventListener('keyup', this.maxCountUp, false);
					} else if ( this.inputs[i].attachEvent ) {
						this.inputs[i].attachEvent('onfocus', this.focusCountUp );
						this.inputs[i].attachEvent('onkeyup', this.maxCountUp );
					}
				}
				if ( sendBtn.addEventListener ) {
					sendBtn.addEventListener('click', this.notEnteredCountUp, false);
					sendBtn.addEventListener('click', this.errorCountUp, false);
					sendBtn.addEventListener('click', this.inputResultTbl, false);
				} else if ( sendBtn.attachEvent ) {
					sendBtn.attachEvent('onclick', this.notEnteredCountUp );
					sendBtn.attachEvent('onclick', this.errorCountUp );
					sendBtn.attachEvent('onclick', this.inputResultTbl );
				}
			},
			focusCountUp : function () {
				if ( this.name == 'name') {
					countNumber.name.focus++;
				} else if ( this.name == 'email') {
					countNumber.email.focus++;
				} else if ( this.name == 'telephone') {
					countNumber.telephone.focus++;
				} else if ( this.name == 'address') {
					countNumber.address.focus++;
				} else if ( this.name == 'login') {
					countNumber.login.focus++;
				}
			},
			maxCountUp : function () {
				var maxLength = this.value.length;
				if ( this.name == 'name') {
					countNumber.name.max = maxLength;
				} else if ( this.name == 'email') {
					countNumber.email.max = maxLength;
				} else if ( this.name == 'telephone') {
					countNumber.telephone.max = maxLength;
				} else if ( this.name == 'address') {
					countNumber.address.max = maxLength;
				} else if ( this.name == 'login') {
					countNumber.login.max = maxLength;
				}
			},
			notEnteredCountUp : function () {
				for ( var i = 0; i < inputsLength; i++ ) {
					if ( !inputs[i].value ) {
						if ( inputs[i].name == 'name') {
							countNumber.name.not++;
						} else if ( inputs[i].name == 'email') {
							countNumber.email.not++;
						} else if ( inputs[i].name == 'telephone') {
							countNumber.telephone.not++;
						} else if ( inputs[i].name == 'address') {
							countNumber.address.not++;
						} else if ( inputs[i].name == 'login') {
							countNumber.login.not++;
						}
					}
				}
			},
			errorCountUp : function () {
				for ( var i = 0; i < inputsLength; i++ ) {
					if ( inputs[i].name == 'name' && inputs[i].value.length === 0 ) {
						countNumber.name.err++;
					} else if ( inputs[i].name == 'email' && !inputs[i].value.match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/) ) {
						countNumber.email.err++;
					} else if ( inputs[i].name == 'telephone') {
						countNumber.telephone.err++;
					} else if ( inputs[i].name == 'address' && inputs[i].value.length === 0 ) {
						countNumber.address.err++;
					} else if ( inputs[i].name == 'login' && !inputs[i].value.match(/[a-zA-Z0-9\._-]*@/)) {
						countNumber.login.err++;
					}
				}
			},
			inputResultTbl : function () {
				var current = 0;
				for ( var key in countNumber ) {
					current++;
					resultInfoTbl.rows[current].cells[1].innerHTML = countNumber[key].focus;
					resultInfoTbl.rows[current].cells[2].innerHTML = countNumber[key].max;
					resultInfoTbl.rows[current].cells[3].innerHTML = countNumber[key].not;
					resultInfoTbl.rows[current].cells[4].innerHTML = countNumber[key].err;
				}
			}
		};
	};
	var countTbl = count();
	countTbl.init();
};

