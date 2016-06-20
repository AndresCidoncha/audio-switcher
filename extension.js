const Lang = imports.lang;
const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;

const AudioOutputSubMenu = new Lang.Class({
	Name: 'AudioOutputSubMenu',
	Extends: PopupMenu.PopupSubMenuMenuItem,

	_init: function() {
		this.parent('Audio Output: Connecting...', true);

		this._control = Main.panel.statusArea.aggregateMenu._volume._control;

		this._controlSignal = this._control.connect('default-sink-changed', Lang.bind(this, function() {
			this._updateDefaultSink();
		}));

		this._updateDefaultSink();

		this.menu.connect('open-state-changed', Lang.bind(this, function(menu, isOpen) {
			if (isOpen)
				this._updateSinkList();
		}));

		//Unless there is at least one item here, no 'open' will be emitted...
		let item = new PopupMenu.PopupMenuItem('Connecting...');
		this.menu.addMenuItem(item);
	},

	_updateDefaultSink: function () {
		defsink = this._control.get_default_sink();
		//Unfortunately, Gvc neglects some pulse-devices, such as all "Monitor of ..."
		if (defsink == null)
			this.label.set_text("Other");
		else
			this.label.set_text(defsink.get_description());
	},

	_updateSinkList: function () {
		this.menu.removeAll();

		let defsink = this._control.get_default_sink();
		let sinklist = this._control.get_sinks();
		let control = this._control;

		for (let i=0; i<sinklist.length; i++) {
			let sink = sinklist[i];
			if (sink === defsink)
				continue;
			let item = new PopupMenu.PopupMenuItem(sink.get_description());
			item.connect('activate', Lang.bind(sink, function() {
				control.set_default_sink(this);
			}));
			this.menu.addMenuItem(item);
		}
		if (sinklist.length == 0 ||
			(sinklist.length == 1 && sinklist[0] === defsink)) {
			item = new PopupMenu.PopupMenuItem("No more Devices");
			this.menu.addMenuItem(item);
		}
	},

	destroy: function() {
		this._control.disconnect(this._controlSignal);
		this.parent();
	}
});

const AudioInputSubMenu = new Lang.Class({
	Name: 'AudioInputSubMenu',
	Extends: PopupMenu.PopupSubMenuMenuItem,

	_init: function() {
		this.parent('Audio Input: Connecting...', true);

		this._control = Main.panel.statusArea.aggregateMenu._volume._control;

		this._controlSignal = this._control.connect('default-source-changed', Lang.bind(this, function() {
			this._updateDefaultSource();
		}));

		this._updateDefaultSource();

		this.menu.connect('open-state-changed', Lang.bind(this, function(menu, isOpen) {
			if (isOpen)
				this._updateSourceList();
		}));

		//Unless there is at least one item here, no 'open' will be emitted...
		item = new PopupMenu.PopupMenuItem('Connecting...');
		this.menu.addMenuItem(item);
	},

	_updateDefaultSource: function () {
		defsource = this._control.get_default_source();
		//Unfortunately, Gvc neglects some pulse-devices, such as all "Monitor of ..."
		if (defsource == null)
			this.label.set_text("Other");
		else
			this.label.set_text(defsource.get_description());
	},

	_updateSourceList: function () {
		this.menu.removeAll();

		let defsource = this._control.get_default_source();
		let sourcelist = this._control.get_sources();
		let control = this._control;

		for (i = 0; i < sourcelist.length; i++) {
			let source = sourcelist[i];
			if (source === defsource) {
				continue;
			}
			let item = new PopupMenu.PopupMenuItem(source.get_description());
			item.connect('activate', Lang.bind(source, function() {
				control.set_default_source(this);
			}));
			this.menu.addMenuItem(item);
		}
		if (sourcelist.length == 0 ||
			(sourcelist.length == 1 && sourcelist[0] === defsource)) {
			item = new PopupMenu.PopupMenuItem("No more Devices");
			this.menu.addMenuItem(item);
		}
	},

	destroy: function() {
		this._control.disconnect(this._controlSignal);
		this.parent();
	}
});

let audioOutputSubMenu = null;
let audioInputSubMenu = null;
let savedUpdateVisibility = null;

function init() {
}

function enable() {
	if ((audioInputSubMenu != null) || (audioOutputSubMenu != null))
		return;
	audioInputSubMenu = new AudioInputSubMenu();
	audioOutputSubMenu = new AudioOutputSubMenu();

	//Try to add the output-switcher right below the output slider...
	let volMen = Main.panel.statusArea.aggregateMenu._volume._volumeMenu;
	let items = volMen._getMenuItems();
	let i = 0;
	while (i < items.length)
		if (items[i] === volMen._output.item)
			break;
		else
			i++;
	volMen.addMenuItem(audioOutputSubMenu, i+1);
	
	//Try to add the input-switcher right below the input slider...
	let volMen = Main.panel.statusArea.aggregateMenu._volume._volumeMenu;
	let items = volMen._getMenuItems();
	let i = 0;
	while (i < items.length)
		if (items[i] === volMen._input.item)
			break;
		else
			i++;
	volMen.addMenuItem(audioInputSubMenu, i+1);

	//Make input-slider allways visible.
	savedUpdateVisibility = Main.panel.statusArea.aggregateMenu._volume._volumeMenu._input._updateVisibility;
	Main.panel.statusArea.aggregateMenu._volume._volumeMenu._input._updateVisibility = function () {};
	Main.panel.statusArea.aggregateMenu._volume._volumeMenu._input.item.actor.visible = true;
}

function disable() {
	audioInputSubMenu.destroy();
	audioInputSubMenu = null;
	audioOutputSubMenu.destroy();
	audioOutputSubMenu = null;

	Main.panel.statusArea.aggregateMenu._volume._volumeMenu._input._updateVisibility = savedUpdateVisibility;
	savedUpdateVisibility = null;
	Main.panel.statusArea.aggregateMenu._volume._volumeMenu._input._updateVisibility();
}
