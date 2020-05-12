const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;
const GObject = imports.gi.GObject;

const AudioOutputSubMenu = GObject.registerClass({
    GTypeName: 'ASAudioOutputSubMenu',
}, class AudioOutputSubMenu extends PopupMenu.PopupSubMenuMenuItem {
    _init() {
		super._init('Audio Output: Connecting...', true);

		this._control = Main.panel.statusArea.aggregateMenu._volume._control;

		this._updateDefaultSink();
		this._updateSinkList();

		this._controlSignal = this._control.connect('default-sink-changed', () => {
			this._updateDefaultSink();
			this._updateSinkList();
		});

		this._control.connect('output-added', () => {
			this._updateSinkList();
		});

		this._control.connect('output-removed', () => {
			this._updateSinkList();
		});
	}

	_updateDefaultSink() {
		let defsink = this._control.get_default_sink();
		//Unfortunately, Gvc neglects some pulse-devices, such as all "Monitor of ..."
		if (defsink == null) {
			this.label.set_text("Other");
		} else {
			this.label.set_text(defsink.get_description());
		}
	}

	_updateSinkList() {
		this.actor.hide();
		this.menu.removeAll();

		let defsink = this._control.get_default_sink();
		let sinklist = this._control.get_sinks();

		sinklist.forEach(sink => {
			if (sink === defsink) {
				return;
			}
			let item = new PopupMenu.PopupMenuItem(sink.get_description());
			item.connect('activate', () => {
				this._control.set_default_sink(sink);
			});
			this.menu.addMenuItem(item);
		});

		if (sinklist.length > 1) {
			this.actor.show();
		}
	}

	destroy() {
		this._control.disconnect(this._controlSignal);
		super.destroy();
	}
});

const AudioInputSubMenu = GObject.registerClass({
    GTypeName: 'ASAudioInputSubMenu',
}, class AudioInputSubMenu extends PopupMenu.PopupSubMenuMenuItem {
    _init() {
		super._init('Audio Input: Connecting...', true);

		this._control = Main.panel.statusArea.aggregateMenu._volume._control;

		this._updateDefaultSource();
		this._updateSourceList();

		this._controlSignal = this._control.connect('default-source-changed', () => {
			this._updateDefaultSource();
			this._updateSourceList();
		});

		this._control.connect('input-added', () => {
			this._updateSourceList();
		});

		this._control.connect('input-removed', () => {
			this._updateSourceList();
		});
	}

	_updateDefaultSource() {
		let defsource = this._control.get_default_source();
		//Unfortunately, Gvc neglects some pulse-devices, such as all "Monitor of ..."
		if (defsource == null) {
			this.label.set_text("Other");
		}
		else {
			this.label.set_text(defsource.get_description());
		}
	}

	_updateSourceList() {
		this.actor.hide();
		this.menu.removeAll();

		let defsource = this._control.get_default_source();
		let sourcelist = this._control.get_sources();

		sourcelist.forEach(source => {
			if (source === defsource) {
				return;
			}
			let item = new PopupMenu.PopupMenuItem(source.get_description());
			item.connect('activate', () => {
				this._control.set_default_source(source);
			});
			this.menu.addMenuItem(item);
		});

		if (sourcelist.length > 1) {
			this.actor.show();
		}
	}

	destroy() {
		this._control.disconnect(this._controlSignal);
		super.destroy();
	}
});

var audioOutputSubMenu = null;
var audioInputSubMenu = null;
var savedUpdateVisibility = null;

function init() {
}

function enable() {
	if ((audioInputSubMenu != null) || (audioOutputSubMenu != null)) {
		return;
	}
	audioInputSubMenu = new AudioInputSubMenu();
	audioOutputSubMenu = new AudioOutputSubMenu();

	//Try to add the switchers right below the sliders...
	let volMen = Main.panel.statusArea.aggregateMenu._volume._volumeMenu;
	let items = volMen._getMenuItems();
	let i = 0;
	let addedInput, addedOutput = false;
	while (i < items.length){
		if (items[i] === volMen._output.item){
			volMen.addMenuItem(audioOutputSubMenu, i+1);
			addedOutput = true;
		} else if (items[i] === volMen._input.item){
			volMen.addMenuItem(audioInputSubMenu, i+2);
			addedInput = true;
		}
		if (addedOutput && addedInput){
			break;
		}
		i++;
	}

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
