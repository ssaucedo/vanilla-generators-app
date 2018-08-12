import { reducers } from './helpers';
import { executor } from './flow-executor';
import { EFFECTS } from './effects';

window.onload = function (e) {
	init();
}

function init() {
	executor(demoUserFlow());
	CodeMirror(document.getElementById('editor'), {
		value: `	


function* demoUserFlow() {
	yield waitForUserInteraction({ event: 'click', id: 'box-one' });
	console.log('This is the very first interaction');
	stepCompleted('box-one');
	
	yield waitForUserInteraction({ event: 'click', id: 'box-two' });
	console.log('This is the second interaction')
	stepCompleted('box-two');
	
	yield waitForUserInteraction({ event: 'click', id: 'box-three' });
	console.log('This is the third interaction')
	stepCompleted('box-three');
	
	yield waitForUserInteraction({ event: 'click', id: 'box-four'});
	console.log('This is the last interaction')
	stepCompleted('box-four');
	createFlowCompletedElement('flow-completed');
	createRestartElement('restart');
	
	yield waitForUserInteraction({ event: 'click', id: 'restart' });
	window.location.reload();
}

/**
 *  HELPERS
 */

// DOM manipulation.
const stepCompleted = (id) => {
	const element = document.getElementById(id);
	element.className = 'step-completed';
	element.innerText = "🎉";
};

// DOM manipulation.
const createFlowCompletedElement = (id) => {
	const newDiv = document.createElement('div'); 
	newDiv.id = id;
	newDiv.appendChild(document.createTextNode(
		"Congratulations, flow completed"));
	newDiv.classList.add('flow-completed');	
	document.getElementById('completion-elements').appendChild(newDiv);
};

// DOM manipulation.
const createRestartElement = (id) => {
	const newDiv = document.createElement('div'); 
	newDiv.id = id;
	newDiv.innerText = "💀";
	newDiv.classList.add('restart');	
	document.getElementById('completion-elements').appendChild(newDiv);
}
`,
		mode:  "javascript",
		lineNumbers: true,
    	styleActiveLine: true,
		matchBrackets: true,
		theme: 'darcula'
	  });
};

const waitForUserInteraction = (obj) => ({
	type: EFFECTS.USER_INTERACTION,
	...obj,
});

/**
 *  DOM manipulation.
 */
const createFlowCompletedElement = (id) => {
	const newDiv = document.createElement('div'); 
	newDiv.id = id;
	newDiv.appendChild(document.createTextNode("Congratulations, flow completed"));
	newDiv.classList.add('flow-completed');	
	document.getElementById('completion-elements').appendChild(newDiv);
};

/**
 *  DOM manipulation.
 */
const createRestartElement = (id) => {
	const newDiv = document.createElement('div'); 
	newDiv.id = id;
	newDiv.innerText = "💀";
	newDiv.classList.add('restart');	
	document.getElementById('completion-elements').appendChild(newDiv);
}

/**
 *  DOM manipulation.
 */
const stepCompleted = (id) => {
	const element = document.getElementById(id);
	element.className = 'step-completed';
	element.innerText = "🎉";
};

function* demoUserFlow() {
	yield waitForUserInteraction({ event: 'click', id: 'box-one' });
	console.log('This is the very first interaction');
	stepCompleted('box-one');
	
	yield waitForUserInteraction({ event: 'click', id: 'box-two' });
	console.log('This is the second interaction')
	stepCompleted('box-two');
	
	yield waitForUserInteraction({ event: 'click', id: 'box-three' });
	console.log('This is the third interaction')
	stepCompleted('box-three');
	
	yield waitForUserInteraction({ event: 'click', id: 'box-four'});
	console.log('This is the last interaction')
	stepCompleted('box-four');
	createFlowCompletedElement('flow-completed');
	createRestartElement('restart');
	
	yield waitForUserInteraction({ event: 'click', id: 'restart' });
	window.location.reload();
}
