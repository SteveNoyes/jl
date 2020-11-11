module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  const mozjpeg = require('imagemin-mozjpeg');
  const optipng = require('imagemin-optipng');
  const svgo = require('imagemin-svgo');

  const sass = require('node-sass');
  require('load-grunt-tasks')(grunt);


  grunt.initConfig({
    concat: {
      dist: {
        src: ['js/app.js', 'js/main.js'],
        dest: 'js/script.js',
      },
    },

    jshint: {
      beforeconcat: ['js/app.js', 'js/main.js'],
      afterconcat: ['js/script.js']
    },

    uglify: {
     my_target: {
       files: {
         'dist/script.min.js': ['js/script.js']
       }
     }
   },

   sass: {
      options: {
        implementation: sass,
        sourceMap: true
      },
      dist: {
        files: {
          'css/style.css': 'scss/style.scss'
        }
      }
    },

    cssmin: {
      target: {
        files: [{
          src:['css/style.css'],
          dest: 'dist/style.min.css'
        }]
      }
    },

    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3,
          use: [mozjpeg(), svgo(), optipng()]
        },
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.{png,jpg,svg}'],
          dest: 'dist/img'
        }]
      }
    },

    watch: {
      options: {
        spawn: true,
        interrupt: true
      },
      js: {
        files: ['js/app.js', 'js/main.js'],
        tasks: ['concat', 'uglify']
      },

      sass: {
        files: ['scss/_base.scss', 'scss/_main.scss', 'scss/_variables.scss'],
        tasks: ['sass']
      },

      cssmin: {
        files: ['css/style.css'],
        tasks: ['cssmin']
      }
    }


  });

  grunt.registerTask('default', ['watch'])

}
