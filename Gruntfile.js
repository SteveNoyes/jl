module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  const mozjpeg = require('imagemin-mozjpeg');

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
          src: ['css/style.css'],
          dest: 'dist/style.min.css'
        }]
      }
    },

    imagemin: {
        // static: {
        // options: {
        //     optimizationLevel: 3,
        //     use: [mozjpeg()] // Example plugin usage
        // },
        //     files: {
        //         'dist/img/one.min.jpg': 'img/one.jpg',
        //         'dist/img/two.min.jpg': 'img/two.jpg',
        //         'dist/img/three.min.jpg': 'img/three.jpg'
        //     }
        // }
        dynamic: {
          options: {
              optimizationLevel: 3,
              use: [mozjpeg()] // Example plugin usage
          },
            files: [{
                expand: true,
                cwd: 'img/',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'dist/img'
            }]
        }
    },

    watch: {
      options: {
        spawn: false,
        interrupt: true
      },
      js: {
        files: ['app.js', 'main.js'],
        tasks: ['concat', 'uglify']
      },

      sass: {
        files: ['style.scss'],
        tasks: ['sass']
      },

     css: {
       files: ['style.css'],
       tasks: ['cssmin']
     }
   }

  });

  grunt.registerTask('default', ['watch'])

}
