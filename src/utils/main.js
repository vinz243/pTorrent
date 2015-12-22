const populateStateCheck = (state, states, target, inverted, oriState) => {
	if(state === 'VALID') return;
	
	let camelState = state.split("_").map((i) => {
		return i[0].toUpperCase() + i.substring(1).toLowerCase();
	}).join("");

	target.prototype['is' + camelState] = function () {
		if(inverted)
			return this.getState() !== states[oriState];
		return this.getState() === states[state];
	};
};

export default {

	populateStateChecks: (target, states) => {
		for (let state in states) {
  		if (states.hasOwnProperty(state)) {
  			populateStateCheck(state, states, target, false);
  			// if UN or IN
  			if((state[0] === 'U' || state[0] === 'I') && state[1] === 'N')
	  			populateStateCheck(state.substring(2), states, target, true, state);

	  	}
		}
	}

}