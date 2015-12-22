/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;
// import createComponent from 'helpers/shallowRenderHelper';

// import Main from 'components/Main';
import State from 'adapters/TorrentStateConstants';
import Utils from 'utils/main';

import {assert, expect} from 'chai';

const expectedFunctions = {
	isConnecting: 'CONNECTING',
	isSeeding: 'SEEDING',
	isDownloading: 'DOWNLOADING',
	isInvalid: 'INVALID',
	isUnknown: 'UNKNOWN',
	isKnown: '!UNKNOWN',
	isStopped: 'STOPPED',
	isPaused: 'PAUSED',
	isDone: 'DONE',
	isErrored: 'ERRORED',
	isUninitialized: 'UNINITIALIZED',
	isInitialized: '!UNINITIALIZED',
	isLoading: 'LOADING',
	isRemoved: 'REMOVED'
};


describe('Main Utils', () => {
	it('should populateStateChecks', () => {
		const TestClass = function() {
			this._state = State.UNINITIALIZED;
			this.getState = function() {
				return this._state;
			};
			this.setState = function(state) {
				this._state = state; 
			};
		};

		Utils.populateStateChecks(TestClass, State);

		for(let XYZ in State) {
			for(let func in expectedFunctions) {
				let test = new TestClass();
				test.setState(XYZ);
				let isXYZ = test[func]();

				if(expectedFunctions[func][0] === '!') {
					isXYZ.should.equal(XYZ !== expectedFunctions[func].substring(1));
				} else {
					isXYZ.should.equal(XYZ === expectedFunctions[func]);
				}
			}

		};
		assert.equal((new TestClass()).isValid, undefined);

	});
});