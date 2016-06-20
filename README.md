#Gnome-Shell Extension Audio-Output-Switcher

**Output switcher menu**

![The output menu](http://i.imgur.com/Y9e0Cpb.png)

**Input switcher menu**

![The input menu](http://i.imgur.com/jTpnaS9.png)

## Compatibility
  - Gnome Shell 3.10
  - Gnome Shell 3.12
  - Gnome Shell 3.14
  - Gnome Shell 3.16
  - Gnome Shell 3.18
  - Gnome Shell 3.20

## Installation

Via git

`
git clone git@github.com:AndresCidoncha/audio-switcher.git ~/.local/share/gnome-shell/extensions/audio-switcher@AndresCidoncha
`

Then restart the gnome-shell via **ALT+F2**, typing in the box **r** and enable the extension using gnome-tweak-tool

To update later:

`
(cd ~/.local/share/gnome-shell/extensions/audio-switcher@AndresCidoncha && git pull)
`

## Credits

This extension adds two little entries to the status-menu that shows the currently
selected pulse-audio-output and pulse-audio-input devices. Clicking on that will open a submenu with
all available devices and let's you choose which one to use.

All the credits is for anduchs, this extension is based on his work at [Audio Output Switcher](https://github.com/anduchs/audio-output-switcher) and [Audio Input Switcher](https://github.com/anduchs/audio-output-switcher). I only join them and
add support for the lastest versions of Gnome-shell.
