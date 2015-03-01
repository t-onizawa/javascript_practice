module.exports = function(grunt) {

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    // Compass
    compass: {
      dev: {
        options: {
          config: 'sass/config.rb'
        }
      }
    },

    // CSS min
    cssmin: {
      compress: {
        files: {
          'css/common.min.css':['css/common.css']
        }
      }
    },

    // Js min
    uglify: {
      min: {
        files: {
          'js/common.min.js':['js/common.js']
        }
      }
    },

    // Watch
    watch: {
      files: [
        'sass/common.scss',
        'sass/core/*.scss',

        'css/*.css',

        'js/*.js'
      ],
      tasks: ['compass', 'cssmin', 'uglify']
    }

    

  });

  var taskName;
  for ( taskName in pkg.devDependencies ) {
    if ( taskName.substring(0, 6) == 'grunt-' ) {
      grunt.loadNpmTasks(taskName);
    }
  }

  grunt.registerTask('default', ['compass', 'cssmin', 'uglify', 'watch']);
};
