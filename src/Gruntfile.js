module.exports = function(grunt) {

    grunt.initConfig({
        server: {
            port: 5000,
            base: './static'
        }
    });

    var fakedata = require('./grunt_tasks/fakedata');

    grunt.registerTask('FakeData', 'Start adding fake data', fakedata.init);

};