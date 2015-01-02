(function($){
	'use strict';
		
	window.app = {};

	var boxStates = {
		'#chatter-box': {
			isOpen: false
		}
	};
	var fakeUsers = [
		{ name: 'Mike', picture: 'http://' },
		{ name: 'Scott', picture: 'http://' },
		{ name: 'Adam Peirce Ceiml', picture: 'http://' }
	];

	var makeUsers = function(users){
		//make ul
		var container = $('#user-name-container');
		container.empty();

		var makeUser = function(user){
			var item = $('<li class="name"></li>');
			var img = $('<img src=' + user.picture + '>');
			var name = $('<div>' + user.name +'</div>');
			item.append(img);
			item.append(name);
			return item;
		};
		//loop through array of objects
		users.forEach(function(user){
			container.append(makeUser(user));
		})
		return container;
	};

	var appBox = function(idName, right, main){
		var sample = $('<div></div>');
		sample.attr('id', idName);

		sample.css({
			'position' : 'fixed',
			'width' :  '300px',
			'background-color' : 'red',
			'bottom' :  0,
			'right' : right,
			'margin-right' : '25px',
			'border': 'solid black',
			'padding' : '2px'
		});

		sample.append('<div class=' + idName + '>Click Me</div>');

		if(main){
			sample.append('<ul id="user-name-container"></ul>');	
		}

		$('body').append(sample);

		$('#' + idName).on('click', function(){
			if(main){
				animateBox('#' + idName, 500, true);
			} else {
				animateBox('#' + idName, 500);
			}
		})
	};
	appBox('chatter-box', 0, true);

	var animateBox = function(selector, speed, main){
		var boxState = boxStates[selector] = boxStates[selector] || {};
		var box = $(selector);
		if(!boxState.isOpen){
			box.animate({
				'height' : '300px'
			}, speed, function(){
					boxState.isOpen = true;
					if(main){
						box.append(makeUsers(fakeUsers));				
					}
			})
		} else {
			box.animate({
				'height': '20px'
			}, speed, function(){
				boxState.isOpen = false;
			})
		}
	};

	var newChatBox = new ChatBox('#user-name-container', false, fakeUsers, true)
	newChatBox.init('chatter-box', 0);

	$('#user-name-container').on('click', 'li.name', function(){
		var privateChat = new ChatBox('.private-chat', false, [], false)
		privateChat.init('chat-room', 350);
	})

}($));