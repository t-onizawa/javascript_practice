window.onload = function () {

	var table = document.getElementById('employee_table');
	var tbody = table.getElementsByTagName('tbody');
	var reset = document.getElementById('initialize');
	var add = document.getElementById('add');
	var name = document.getElementById('name');
	var nickname = document.getElementById('nickname');

	var tableEvent = {
		reset: function () {
			// for ( var i = 1; i < table.rows.length; i++ ) {
			// 	table.deleteRow(i);
			// }
			for ( var e = 0; e < employee_data.length; e++ ) {
				this.createCell(employee_data[e].name, employee_data[e].nickname);
			}
			this.deleteCell();
		},
		createCell: function (name, nickname) {
			var tr = document.createElement('tr');
			tbody[0].appendChild(tr);

			var tdName = document.createElement('td');
			tdName.appendChild(document.createTextNode(name));
			tr.appendChild(tdName);

			var tdNickname = document.createElement('td');
			tdNickname.appendChild(document.createTextNode(nickname));
			tr.appendChild(tdNickname);

			var tdButton = document.createElement('td');
			var button = document.createElement('input');
			button.type = 'button';
			button.value = '削除';
			button.name = 'delete';
			tdButton.appendChild(button);
			tr.appendChild(tdButton);
		},
		addDate: function () {
			var nameInner = name.value;
			var nicknameInner = nickname.value;
			if ( !nameInner || !nicknameInner ) {
				alert('未入力事項があります');
				return;
			}
			this.createCell(nameInner, nicknameInner);
		},
		deleteCell: function () {
			var deleteBtn = document.getElementsByName('delete');
			if ( deleteBtn ) {
				for ( var i = 0; i < deleteBtn.length; i++ ) {
					addListener(deleteBtn[i], 'click', function () {
						deleteTr = this.parentNode.parentNode;
						tbody[0].removeChild(deleteTr);
					}, false);
				}
			}
		}
	};
	
	addListener(add, 'click', function () {
		tableEvent.addDate();
	}, false);

	addListener(reset, 'click', function () {
		tableEvent.reset();
	}, false); 
	
	function addListener(element, eventType, functionP, capture){ 
		if ( element.addEventListener ) {
			element.addEventListener(eventType, functionP, capture); 
		} else {
			element.attachEvent('on' + eventType, functionP); 
		}
	}
	
};