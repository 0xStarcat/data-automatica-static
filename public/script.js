const messageBox = document.querySelector('#messages-box')
const replyBox = document.querySelector('#reply-box')

let texts = [
	{msg: "Hi there! 👋", delay: 2000, question: false},
	{msg: "Thanks for coming by! Would you like to hear a little bit about Data Automatica?", delay: 3500, question: true}, 
	{msg: "Great!!", delay: 2500, question: false},
	{msg: "We're a collective that develops and designs beautiful web apps + software with social, civic, and community value.", delay: 6500, question: false},
	{msg: "We especially love to support grassroots organizations, researchers, and activists!", delay: 4000, question: true},
	{msg: "Thanks for asking!", delay: 3000, question: false},
	{msg: "Media platforms, data visualizations & scrapers, software products, you name it!", delay: 5000, question: true},
	{msg: "You already have my number, silly! 😂", delay: 2000, question: false},
	{msg: "You can always send us an email at <a href='mailto:mail@automatix.xyz?Subject=Data Automatica' target='_top'>mail@automatix.xyz</a> though!", delay: 3000, question: false},
	{msg: "It was nice chatting with you!", delay: 3000, question: true},
	{msg: "❤️❤️❤️", delay: 2000, question: false}
]

let answers = [
	{choices: [{msg: "Sure! 🙂", delay: 250, question: false}, {msg: "No thanks! 🙃", delay: 250, question: false}], noMessage: 'Ok! Have a nice day :)'},
	{choices: [{msg: "Cool! What sort of stuff do you make?", delay: 250, question: false}, {msg: "Cool, thanks!", delay: 250, question: false}], noMessage: 'Yup!'},
	{choices: [{msg: "Awesome! How do I stay in touch?", delay: 250, question: false}, {msg: "Nice!", delay: 250, question: false}], noMessage: "Feel free to send us an email at <a href='mailto:mail@automatix.xyz?Subject=Data Automatica' target='_top'>mail@automatix.xyz</a> if you have any questions! :)"},
	{choices: [{msg: "💕", delay: 250, question: false}, {msg: "👍", delay: 250, question: false}], noMessage: '✌️ '}
]

function playMessages() {
	if (texts.length <= 0) return

	
	appendTextMessage(texts[0])


	function appendTextMessage(message) {
			let messageRow = document.createElement('div')
			messageRow.className += 'message-row'
			let clearFloat = document.createElement('div')
			clearFloat.className += 'clear-float'
			let newMyMessage = document.createElement('div') 
			newMyMessage.className += 'my-message message'
			let typing = document.createTextNode('...')
			
			newMyMessage.appendChild(typing)
			setTimeout(() => {
				// Pin "typing" message
				messageRow.appendChild(newMyMessage)
				messageBox.appendChild(messageRow)
				messageBox.appendChild(clearFloat)
				window.scrollTo(0,document.body.scrollHeight);

				setTimeout(() => {

					// Pin my message
					let newMyMessageText = message.msg
					newMyMessage.innerText = ''
					newMyMessage.innerHTML = newMyMessageText
					messageRow.appendChild(newMyMessage)
					window.scrollTo(0,document.body.scrollHeight);

					if (message.question) {
						appendQuestion(answers[0])
					} else {
						playMessages()	
					}
				}, message.delay)
			}, (Math.random() * 500) + 1000)

		window.scrollTo(0,document.body.scrollHeight)
		texts.shift()
	}

	function appendQuestion(replies) {
		setTimeout(() => {
			replies.choices.forEach((answer, i) => {
				let newReply = document.createElement('button')
				let newReplyText = document.createTextNode(answer.msg)

				if (i == 0) {
					newReply.setAttribute('onclick', 'messageYes()')

				} else {
					newReply.setAttribute('onclick', 'messageNo()')
				}
				newReply.appendChild(newReplyText)
				replyBox.appendChild(newReply)
				window.scrollTo(0,document.body.scrollHeight);
			})
			
		}, 0)

	}
}

function messageYes() {
	// Send your message
	replyBox.innerHTML = ''
	let messageRow = document.createElement('div')
	messageRow.className += 'message-row'
	let clearFloat = document.createElement('div')
	clearFloat.className += 'clear-float'
	let reply = document.createElement('div')
	reply.className = 'your-message message'
	let replyText = answers[0].choices[0].msg
	reply.innerHTML = replyText

	messageRow.appendChild(reply)
	messageRow.appendChild(clearFloat)
	messageBox.appendChild(messageRow)
	
	// Keep sending my messages
	playMessages()
	window.scrollTo(0,document.body.scrollHeight)
	answers.shift()

}

function messageNo() {
	// Send your message
	replyBox.innerHTML = ''
	let messageRow = document.createElement('div')
	messageRow.className += 'message-row'
	let clearFloat = document.createElement('div')
	clearFloat.className += 'clear-float'
	let reply = document.createElement('div')
	reply.className = 'your-message message'
	let replyText = answers[0].choices[1].msg
	reply.innerHTML = replyText

	messageRow.appendChild(reply)
	messageRow.appendChild(clearFloat)
	messageBox.appendChild(messageRow)
	window.scrollTo(0,document.body.scrollHeight);

	// Send my last message
	messageRow = document.createElement('div')
	messageRow.className += 'message-row'
	clearFloat = document.createElement('div')
	clearFloat.className += 'clear-float'
	let newMyMessage = document.createElement('div') 
	newMyMessage.className += 'my-message message'
	let typing = document.createTextNode('...')
	
	newMyMessage.appendChild(typing)
	setTimeout(() => {
		messageRow.appendChild(newMyMessage)
		messageBox.appendChild(messageRow)
		messageBox.appendChild(clearFloat)
		window.scrollTo(0,document.body.scrollHeight);
	}, (Math.random() * 500) + 1000)

	setTimeout(() => {

			let newMyMessageText = answers[0].noMessage
			newMyMessage.innerText = ''
			newMyMessage.innerHTML = newMyMessageText
			messageRow.appendChild(newMyMessage)
			window.scrollTo(0,document.body.scrollHeight);

	}, 3000)
}
playMessages()
