import { EFFECTS } from './effects';

// warning: SIDE EFFECTS.
export const executor = (gen, res) => {
	let {value, done} = gen.next(res);
	if (done === true) {
		return;
	} else {
		if (value.type === EFFECTS.USER_INTERACTION) {
			if (value.event === 'click' || value.event === 'input') {
				const element = document.getElementById(value.id);
				new Promise((res, rej) => {
					element.addEventListener(value.event, (event) => {
						executor(gen, event);
					}, { once: true });
				})
				
			} else {
				console.error('Not supported interaction');
			}
		} else {
			console.error('Not supported effect');
		}
	}
};
