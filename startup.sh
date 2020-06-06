#!/bin/bash
deactivate cv
git pull https://github.com/djlittler/MagicMirror.git display
workon cv
npm run start

echo "Command sequence finished succesfully"


deactivate cv && git pull https://github.com/djlittler/MagicMirror.git display && workon cv && npm run start


