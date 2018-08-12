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
	yield waitFor('click').on('box-one');
	console.log('This is the very first interaction');
	stepCompleted('box-one');
	
	yield waitFor('click').on('box-two');
	console.log('This is the second interaction')
	stepCompleted('box-two');
	
	yield waitFor('click').on('box-three');
	console.log('This is the third interaction')
	stepCompleted('box-three');
	
	yield waitFor('click').on('box-four');
	console.log('This is the last interaction')
	stepCompleted('box-four');
	createFlowCompletedElement('flow-completed');
	createRestartElement('restart');

	yield waitFor('click').on('restart');

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

const waitFor = (event) => ({
	on: (elementId) => ({
		type: EFFECTS.USER_INTERACTION,
		id: elementId,
		event,
	})
})

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
	yield waitFor('click').on('box-one');
	console.log('This is the very first interaction');
	stepCompleted('box-one');
	
	yield waitFor('click').on('box-two');
	console.log('This is the second interaction')
	stepCompleted('box-two');
	
	yield waitFor('click').on('box-three');
	console.log('This is the third interaction')
	stepCompleted('box-three');
	
	yield waitFor('click').on('box-four');
	console.log('This is the last interaction')
	stepCompleted('box-four');
	createFlowCompletedElement('flow-completed');
	createRestartElement('restart');

	yield waitFor('click').on('restart');

	window.location.reload();
}
