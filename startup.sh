#!/bin/bash
source virtualenvwrapper.sh
deactivate cv
git clone https://github.com/djlittler/MagicMirror.git display
workon cv
npm run start

echo "Command sequence finished succesfully"
