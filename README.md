# Gnome-Shell Extension Audio-Output-Switcher

**Output switcher menu**

![The output menu](http://imgur.com/3xliKfp.png)

**Input switcher menu**

![The input menu](http://imgur.com/4jazC67.png)

## Compatibility
  - Gnome Shell 3.26
  - Gnome Shell 3.28
  - Gnome Shell 3.30
  - Gnome Shell 3.32


For Gnome Shell < 3.26, use version 1.0.

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

**Thanks to:**
* [ChuckDaniels87](https://github.com/ChuckDaniels87)
* [Martin Wilck](https://github.com/mwilck)
* [Stefan Betz](https://github.com/encbladexp)
* [Christoph Heiss](https://github.com/christoph-heiss)
