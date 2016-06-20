#Gnome-Shell Extension Audio-Input-Switcher

This extension adds a little entry to the status-menu that shows the currently
selected pulse-audio-input device. Clicking on that will open a submenu with
all available input devices and let's you choose which one to use.

Most importantly this extension is simple as possible. Therefore it does not
include an output switcher or similar.
See Audio-Output-Switcher (https://github.com/AndresCidoncha/audio-output-switcher) 
extension for speaker selection.

##INSTALL

Either via 

    https://extensions.gnome.org

or via

    git clone https://github.com/AndresCidoncha/audio-input-switcher.git ~/.local/share/gnome-shell/extensions/audio-input-switcher@AndresCidoncha

Then resart the gnome-shell via **CTRL+F2**, in the box write **r** and enable the extension using gnome-tweak-tool

To update later, just issue

    (cd ~/.local/share/gnome-shell/extensions/audio-input-switcher@AndresCidoncha && git pull)
    
##CREDITS
Original work by [anduchs](https://github.com/anduchs). I only add support for the lastest versions of Gnome.
