var ChatBox = function ChatBox(selector, isOpen, users){
	this.container = $(selector);
	this.isOpen = isOpen;
	this.users = users;
};

ChatBox.prototype.makeUsers = function(){
	$(this.container.selector).empty();

	var makeUser = function(user){
		var item = $('<li class="name"></li>');
		var img = $('<img src=' + user.picture + '>');
		var name = $('<div>' + user.name +'</div>');
		item.append(img);
		item.append(name);
		return item;
	};

	//loop through array of objects
	this.users.forEach(function(user){
		$(this.container.selector).append(makeUser(user));
	}.bind(this));

	return this.container;
};

ChatBox.prototype.init = function(idName, right){

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
	sample.append('<ul id="user-name-container"></ul>');	
	

	$('body').append(sample);

	$('#' + idName).on('click', function(){
		this.animateBox(500);
	}.bind(this));
};

ChatBox.prototype.animateBox = function(speed){
	var that = this;
	var box = $(that.container.selector);

	if(!this.isOpen){
		box.animate({
			'height' : '300px'
		}, speed, function(){
				that.isOpen = true;
				if(that.main){
					box.append(that.makeUsers(that.users));				
				}
		})
	} else {
		box.animate({
			'height': '0px'
		}, speed, function(){
			box.empty();
			that.isOpen = false;
		})
	}
};

ChatBox.prototype.registerListeners = function(){
	this.container
};

(function($){
	var fireRef = '';
	var allChats = [];
		//ChatLogic
	var chatWindowCount = 0;
	var body = $('body');


	function ChatWindow(selector, isOpen){
		this.selector = selector;
		this.isOpen = isOpen || false;
	};

	function ChatWindowList(){};
	ChatWindowList.prototype = Object.create(ChatWindow.prototype);

	ChatWindowList.prototype.register = function(){
		ChatWindow.prototype.register.call();
		console.log('in register ChatWindowList');
	};
	ChatWindowList.prototype.makeChatList = function(){
		// make lis and put on page;
	};
	
	function ChatWindowConvo(){};

	ChatWindow.prototype.makeChatBox = function(){
		var right = chatWindowCount * 350;
		var chatBoxCss = {
			'position' : 'fixed',
			'width' :  '300px',
			'background-color' : 'red',
			'bottom' :  0,
			'right' : right,
			'margin-right' : '25px',
			'border': 'solid black',
			'padding' : '2px'
		};


		var temp = "<div id="+ this.selector + ">"+
			"<button>X</button>"+
			"<ul class=chat-list></ul>"+
			"</div>";

		var chatBox = $(temp);

		chatBox.css(chatBoxCss);
		body.append(chatBox);
		allChats.push('#' + this.selector);

	};

// 	ChatWindow.prototype.register = function(done){
// 		done = done || function(){};

// 		var chatBox = $("#" + this.selector);
// 		var enterAnimation = { height: '300px' };
// 		var exitAnimation = { height: '10px' };

// 		chatBox.on('click', 'button', function(){
// 			if(!this.isOpen) {
// 				chatBox.animate(enterAnimation, 500, function(){
// 					console.log('done');
// 					this.isOpen = true;
// 					done();
// 				}.bind(this));
// 			} else {
// 				chatBox.animate(exitAnimation, 500, function(){
// 					console.log('done');
// 					this.isOpen = false;
// 					done();
// 				}.bind(this))
// 			}
// 		}.bind(this));
// 	};




// 	// BSChatAapp
// 	window.BSChat = window.BSChat || {};

// 	BSChat.init = function(){
// 		var MainChat = new ChatWindow('mainChatWindow');
// 		MainChat.makeChatBox();
// 		MainChat.register();

// 		var List = new ChatWindowList('thing');
// 		List.register();
// 	};

// 	BSChat.removeAll = function(){
// 		allChats.forEach(function(chat){
// 			chat = $(chat);
// 			chat.remove();
// 		});
// 	};
// 	BSChat.hide = function(id){};
// 	BSChat.hideAll = function(){};
// 	BSChat.mute = function(){};
// 	BSChat.muteAll = function(){};

// }($));
