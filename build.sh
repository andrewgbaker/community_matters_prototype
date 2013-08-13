#!/bin/bash

cat js/app.js > js/app.js

# PLUGINS
cat js/libs/jquery.isotope.min.js >> js/app.js
cat js/libs/jquery.ba-bbq.js >> js/app.js
cat js/libs/pinned.jQuery.js >> js/app.js
cat js/libs/jquery.fitvids.min.js >> js/app.js
cat js/libs/video.js >> js/app.js
cat js/libs/jquery.flexslider-min.js >> js/app.js
cat js/libs/underscore.js >> js/app.js

# PLUGINS
cat js/resources/detail.js >> js/app.js
cat js/resources/isotope_setup.js >> js/app.js
cat js/resources/thumb.js >> js/app.js
cat js/pinnbank.js >> js/app.js
cat js/main.js >> js/app.js


minifyjs -m -i js/app.js -o js/app.min.js
echo "done"