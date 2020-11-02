module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', '**/*.js'],
    },

    uglify: {
      build: {
        files: {
          'dist/script.min.js': 'js/script.js'
        },
      },
    },

    concat: {
      dist: {
        src: ['js/app.js', 'js/main.js'],
        dest: 'js/script.js',
      },
    },

    cssmin: {
      build: {
        files: {
          'dist/style.min.css': 'css/style.css'
        },
      },
    },

    watch: {
      script: {
        files: ['**/*.js', '**/*.css'],
        tasks: ['concat', 'uglify', 'cssmin'],
      },
    },


  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');


  grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);

};
