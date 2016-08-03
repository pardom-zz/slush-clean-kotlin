'use strict';

var gulp = require('gulp');
var template = require('gulp-template');
var conflict = require('gulp-conflict');
var rename = require('gulp-rename');
var inquirer = require('inquirer');
var _ = require('underscore.string');

var defaults = (function() {
    var defaultAppName = process.cwd().split('/').pop().split('\\').pop();
    var defaultPackageName = _.underscored(defaultAppName).replace(/\_/g, '.');

    return {
        appName: defaultAppName,
        packageName: defaultPackageName,
        projectTypes: ["Android", "Desktop"]
    };
})();

gulp.task('default', function(done) {

    var prompts = [{
        name: 'appName',
        message: 'Application name:',
        default: defaults.appName
    }, {
        name: 'packageName',
        message: 'Package name:',
        default: defaults.packageName,
        validate: function(input) {
            return /\w+(\.\w+)*/.test(input)
        }
    }, {
        type: 'checkbox',
        name: 'projectTypes',
        message: 'Project types:',
        choices: ["Android", "Desktop", "Console", "Web"],
        default: defaults.projectTypes
    }, {
        type: 'confirm',
        name: 'moveon',
        message: 'Continue with these settings?'
    }]

    inquirer.prompt(prompts, function(answers) {
        if (!answers.moveon) {
            return done();
        }

        answers.appNameDashed = _.slugify(answers.appName);
        answers.moduleName = _.camelize(answers.nameDashed);
        answers.packagePath = answers.packageName.replace('.', '/')

        gulp.src(__dirname + '/templates/app/**')
            .pipe(template(answers))
            .pipe(rename(function(path) {
                path.dirname = path.dirname.replace(/packagePath/, answers.packagePath);
                if (path.basename === 'packagePath') {
                    path.basename = answers.packagePath;
                } else if (path.basename[0] === '_') {
                    path.basename = '.' + path.basename.slice(1);
                }
                return path;
            }))
            .pipe(conflict('./'))
            .pipe(gulp.dest('./'))
            .on('end', function() {
                done();
            });
    });

});
