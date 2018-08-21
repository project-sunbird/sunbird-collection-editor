// Generated on 2015-12-14 using generator-angular 0.14.0
'use strict'

module.exports = function (grunt) {
	// Configurable paths for the application
	var appConfig = {
		app: 'app',
		dist: 'dist'
	}

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		yeoman: appConfig,

		// Watches files for changes and runs tasks based on the changed file
		aws_s3: {
			options: {
				accessKeyId: '', // Use the variables
				secretAccessKey: '', // You can also use env variables
				region: 'ap-south-1',
				uploadConcurrency: 5, // 5 simultaneous uploads
				downloadConcurrency: 5 // 5 simultaneous downloads
			},
			main: {
				options: {
					bucket: 'ekstep-public-dev',
					differential: true, // Only uploads the files that have changed
					gzipRename: 'ext' // when uploading a gz file, keep the original extension
				},
				files: [
					{ dest: 'content-editor/scripts/plugin-framework.min.js', cwd: 'app/scripts/', action: 'download' }
				]
			}
		}

	})

	grunt.loadNpmTasks('grunt-aws-s3')
}
