'use strict';

const utils = require('@iobroker/adapter-core');
const axios = require('axios').default;

class Rs extends utils.Adapter {
	constructor(options) {
		super({
			...options,
			name: 'rs',
		});
		this.on('ready', this.onReady.bind(this));
		this.on('stateChange', this.onStateChange.bind(this));
		// this.on('objectChange', this.onObjectChange.bind(this));
		// this.on('message', this.onMessage.bind(this));
		this.on('unload', this.onUnload.bind(this));
	}
	async onReady() {
		this.log.info('config option1: ' + this.config.option1);
		this.log.info('config option2: ' + this.config.option2);
		await this.setObjectNotExistsAsync('phoneNumber', {
			type: 'state',
			common: {
				name: 'phoneNumber',
				type: 'string',
				role: 'value',
				read: true,
				write: true,
			},
			native: {},
		});
		await this.setObjectNotExistsAsync('phoneName', {
			type: 'state',
			common: {
				name: 'phoneName',
				type: 'string',
				role: 'value',
				read: true,
				write: true,
			},
			native: {},
		});
		this.subscribeStates('phoneNumber');
		await this.setStateAsync('phoneNumber', { val: '', ack: true });
		await this.setStateAsync('phoneName', { val: '', ack: true });
	}
	onUnload(callback) {
		try {
			callback();
		} catch (e) {
			callback();
		}
	}
	onStateChange(id, state) {
		if (state) {						
			this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
		} else {
			// The state was deleted
			this.log.info(`state ${id} deleted`);
		}
	}
}

if (require.main !== module) {
	module.exports = (options) => new Rs(options);
} else {
	new Rs();
}
