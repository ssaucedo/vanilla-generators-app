import { reducers } from './helpers';
import { executor } from './flow-executor';
import { EFFECTS } from './effects';

window.onload = function (e) {
	init();
}

function init() {
	executor(uniqueFlow());
	CodeMirror(document.getElementById('editor'), {
		value: `

function* uniqueFlow() {
	yield waitFor('click').on('start-flow');
	displayFlow('steps-container');
	
	yield waitFor('click').on('step-one');
	console.log('This is the very first interaction');
	stepCompleted('step-one');
	
	let { target: { value }} = yield waitFor('input').on('step-two');
	while(value.toUpperCase() !== 'MEETUP.JS') {
		value = (yield waitFor('input').on('step-two')).target.value;
	};
	console.log('Correct password')
	stepCompleted('step-two');
	
	yield waitFor('click').on('step-three');
	console.log('This is the third interaction')
	stepCompleted('step-three');
	
	yield waitFor('click').on('step-four');
	console.log('This is the last interaction')
	stepCompleted('step-four');
	createFlowCompletedElement('flow-completed');
	createRestartElement('restart');

	yield waitFor('click').on('restart');

	window.location.reload();
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

/**
 *  DOM manipulation.
 */
const displayFlow = (id) => {
	const element = document.getElementById(id);
	element.style.visibility = "unset" ;

};

function* uniqueFlow() {
	yield waitFor('click').on('start-flow');
	displayFlow('steps-container');
	
	yield waitFor('click').on('step-one');
	console.log('This is the very first interaction');
	stepCompleted('step-one');
	
	let { target: { value }} = yield waitFor('input').on('step-two');
	while(value.toUpperCase() !== 'MEETUP.JS') {
		value = (yield waitFor('input').on('step-two')).target.value;
	};
	console.log('Correct password')
	stepCompleted('step-two');
	
	yield waitFor('click').on('step-three');
	console.log('This is the third interaction')
	stepCompleted('step-three');
	
	yield waitFor('click').on('step-four');
	console.log('This is the last interaction')
	stepCompleted('step-four');
	createFlowCompletedElement('flow-completed');
	createRestartElement('restart');

	yield waitFor('click').on('restart');

	window.location.reload();
}
