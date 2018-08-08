import { EFFECTS } from './effects';

export const executor = (gen, context) => {
	let next = gen.next();
	if (next.done === true) {
		return;
	} else {
		const { value } = next;
		if (value.type === EFFECTS.USER_ACTION) {
			if (value.event === 'click') {
				const element = document.getElementById(value.id);
				element.addEventListener('click', (event) => {
					value.reaction(event);
					executor(gen, context);
				}, { once: true });
			}
		} else if (value.type === EFFECTS.CONTEXT_UPDATE) {
			executor(gen, value.update(context));
		}
	}
};
