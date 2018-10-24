const messageBox = document.querySelector('#messages-box')
const replyBox = document.querySelector('#reply-box')

let textQueue = []
let texts = {
  "start" : [
    {msg: "Hi there! :)", delay: 1000, question: false, introduction: true},
    {msg: "Would you like to hear a little bit about Data Automatica, LLC?", delay: 1500, question: true, introduction: true}
  ],
  "hearMore": [
    {msg: "Great!!", delay: 1500, question: false},
    {msg: "Data Automatica does web application development, product research + design, and business + organizational technology consulting.", delay: 2000, question: true},
  ],
  "pastClients": [
    {msg: "We've worked with individuals, organizations, and businesses of all shapes and sizes - from entrepeneurs, to nonprofits, startups, and larger companies.", delay: 2000, question: false},
    {msg: "If you'd like specific names or references, feel free to ask anytime!", delay: 1500, question: true}
  ],
  "contact": [
    {msg: "You already have my number, silly! 😂", delay: 1000, question: false},
    {msg: "You can always send us an email at <a href='mailto:data-automatica@protonmail.com?Subject=Data Automatica' target='_top'>data-automatica@protonmail.com</a> though!", delay: 2000, question: true},
  ],
  "goodbye": [
    {msg: "It was nice chatting with you!", delay: 1000, question: false},
    {msg: "❤️❤️❤️", delay: 1000, question: false, final: true}
  ]
}

let repliesQueue = []
let introductionReply = {
  choices: [
    {
      msg: "Sure!", delay: 250, question: false
    },
    {
      msg: "No thanks! 🙃", delay: 250, question: false
    }
  ],
  nextTextKey: 'hearMore',
  noMessage: {
    msg: 'Ok! Have a nice day :)'
  }
}

let answers = [
	{
    choices: [
      {
        msg: "Cool! Who have you worked with before?", delay: 250, question: false
      },
      {
        msg: "Cool, thanks!", delay: 250, question: false
      }
    ],
    nextTextKey: 'pastClients',
    noMessage: {
      msg: 'Yup!'
    }
  },
	{
    choices: [
      {
        msg: "How do I stay in touch?", delay: 250, question: false
      },
      {
        msg: "Nice!", delay: 250, question: false
      }
    ],
    nextTextKey: 'contact',
    noMessage: {
      msg: "Feel free to send us an email at <a href='mailto:data-automatica@protonmail.com?Subject=Data Automatica' target='_top'>data-automatica@protonmail.com</a> if you have any questions! :)"
    }
  },
	{
    choices: [
      {
        msg: "❤️", delay: 250, question: false
      },
      {
        msg: "😜", delay: 250, question: false
      }
    ],
    nextTextKey: 'goodbye',
    noMessage: {
      msg: '✌️ '
    }
  }
]

function loadmessages(nextMessageKey) {
  texts[nextMessageKey].forEach(message => {
    textQueue.push(message)
  })
}

function playNextMessage() {
  addMessageElements(textQueue[0], belongsToMe=true, continuePlay=!textQueue[0].final)
	textQueue.shift()
}

function appendQuestions(replies) {
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
}


function messageYes() {
	// Send your message
	replyBox.innerHTML = ''
  loadmessages(repliesQueue[0].nextTextKey)
  addMessageElements(repliesQueue[0].choices[0], belongsToMe=false, continuePlay=true)
  repliesQueue.shift()
}

function messageNo() {
	// Send your message
	replyBox.innerHTML = ''
  addMessageElements(repliesQueue[0].choices[1], belongsToMe=false, continuePlay=false)

	// Send my last message
  addMessageElements(repliesQueue[0].noMessage, belongsToMe=true, continuePlay=false)
}

function addMessageElements(message, belongsToMe=true, continuePlay=true, ) {
  let messageRow = document.createElement('div')
  messageRow.className += 'message-row'
  let clearFloat = document.createElement('div')
  clearFloat.className += 'clear-float'
  let newMessage = document.createElement('div')
  newMessage.className += belongsToMe ? 'my-message message' : 'your-message message'

  if (belongsToMe) {
    let typing = document.createTextNode('...')
    newMessage.appendChild(typing)
  }

  setTimeout(() => {
    // Pin "typing" message
    messageRow.appendChild(newMessage)
    messageBox.appendChild(messageRow)
    messageBox.appendChild(clearFloat)
    window.scrollTo(0,document.body.scrollHeight);

    setTimeout(() => {

      // Pin my message
      newMessage.innerText = ''
      newMessage.innerHTML = message.msg
      messageRow.appendChild(newMessage)
      window.scrollTo(0,document.body.scrollHeight);

      if (message.question && message.introduction) {
        repliesQueue.push(introductionReply)
        appendQuestions(repliesQueue[0])
      } else if (message.question) {
        repliesQueue.push(answers[0])
        answers.shift()
        appendQuestions(repliesQueue[0])
      } else if (continuePlay) {
        playNextMessage()
      } else {
        return
      }
    }, belongsToMe ? message.delay : 0)
  }, belongsToMe ? (Math.random() * 500) + 1000 : 0)

  window.scrollTo(0,document.body.scrollHeight)

}

loadmessages('start')
playNextMessage()
