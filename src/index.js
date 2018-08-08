import { reducers } from './helpers';
import { executor } from './flow-executor';
import { EFFECTS } from './effects';

window.onload = function (e) {
	init();
}

function init() {
	const context = { count: 1 };
	executor(demoUserFlow(), context);
};

const userAction = (obj) => ({
	type: EFFECTS.USER_ACTION,
	...obj,
});

const contextUpdate = (obj) => ({
	type: EFFECTS.CONTEXT_UPDATE,
	...obj,
});


const createFlowCompletedElement = (id) => {
	const newDiv = document.createElement('div'); 
	newDiv.id = id;
	newDiv.appendChild(document.createTextNode("Congratulations, flow completed"));
	newDiv.classList.add('flow-completed');	
	document.getElementById('container').appendChild(newDiv);
};

const createRestartElement = (id) => {
	const newDiv = document.createElement('div'); 
	newDiv.id = id;
	newDiv.innerText = "💀";
	newDiv.classList.add('restart');	
	document.getElementById('container').appendChild(newDiv);
}


// Helper for element deletion
const deleteElement = (id) => {
	document.getElementById(id).remove();
};

const stepCompleted = (id) => {
	const element = document.getElementById(id);
	element.className = 'step-completed';
	element.innerText = "🎉";
};

function* demoUserFlow() {
	yield userAction({
		event: 'click', id: 'box-one', reaction: function (event) {
			console.log('This is the very first reaction');
			stepCompleted('box-one');
		}
	});
	yield userAction({
		event: 'click', id: 'box-two', reaction: function (event) {
			console.log('This is the second reaction')
			stepCompleted('box-two');
		}
	});
	yield userAction({
		event: 'click', id: 'box-three', reaction: function (event) {
			console.log('This is the third reaction')
			stepCompleted('box-three');
		}
	});
	yield userAction({
		event: 'click', id: 'box-four', reaction: function (event) {
			console.log('This is the last reaction')
			stepCompleted('box-four');
			createFlowCompletedElement('flow-completed');
			createRestartElement('restart');
			
		}
	});
	yield userAction({
		event: 'click', id: 'restart', reaction: function (event) {
			window.location.reload();		
		}
	});
}
