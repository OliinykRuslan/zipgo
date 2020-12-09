To build this project the used by Node.js, npm, Gulp, bower


For start project it necessary execute commands in the command line:
npm install
bower install
gulp


More information

For run project, need to have globally installed Nodejs (with npm), Bower and Gulp (npm install -g bower gulp) .
All rest tasks for Gulp will be setup automatically from "package.json"
This will be after the command "npm install"

Any library must be connected in "bower.json" 
These libraries will be downloaded and connected from "bower_components" for development version project.
This will be after the command "bower install"

Development version (dev version) project - this version is for development. Without minification, concatenation etc
Also for faster compiling SCSS, any SCSS file for libraries (source files that can not be changed) connection in "bower.scss". 
So each time compiles only style."scss" - the code only  that is created manually.
For dev version use default task for Gulp - "gulp" or gulp default". In is inclusive compilation SCSS, browserSync, connection libraries etc. 
More information can be seen in "gulpfile.js" - task "default"

Production version - final version project. This version inclusive minification files, concatenate all css to one file, concatenate all js to one file, etc. More information can be seen in "gulpfile.js" - task  "build".
In order to get the final version use "gulp build" task for Gulp
Will be created  a new folder "dist". And in this folder will be placed final version project.