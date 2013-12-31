const Lang = imports.lang;
const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;

const AudioInputSubMenu = new Lang.Class({
    Name: 'AudioInputSubMenu',
    Extends: PopupMenu.PopupSubMenuMenuItem,

    _init: function() {
        this.parent('Audio Input: Connecting...', true);

        this._control = Main.panel.statusArea.aggregateMenu._volume._control;
        
        this._control.connect('default-source-changed', Lang.bind(this, function() {
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
        this.label.set_text("In: " + this._control.get_default_source().get_description());
    },
    
    _updateSourceList: function () {
        this.menu.removeAll();

        sourcelist = this._control.get_sources();
        control = this._control;

        for (i = 0; i < sourcelist.length; i++) {
            source = sourcelist[i];
            item = new PopupMenu.PopupMenuItem(source.get_description());
            item.connect('activate', Lang.bind(source, function() {
                control.set_default_source(this);
            }));
            this.menu.addMenuItem(item);
        }
    },
});

let audioInputSubMenu = null;

function init() {
}

function enable() {
    if (audioInputSubMenu != null)
        return;
    audioInputSubMenu = new AudioInputSubMenu();
    Main.panel.statusArea.aggregateMenu._volume.menu.addMenuItem(audioInputSubMenu);
}

function disable() {
    audioInputSubMenu.destroy();
    audioInputSubMenu = null;
}
