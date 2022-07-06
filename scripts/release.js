/* eslint-disable */
const fs = require('fs');
const { execSync } = require('child_process');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
const package = require('../package.json');

const confirmToProceed = (message, callback) => {
    readline.question(`${message} (y/n): `, (answer) => {
        if (answer.toLowerCase() !== 'y') {
            readline.close();
            console.log('Cancelled release');
            return;
        }

        callback();
    });
};

console.log(`Current package version: ${package.version}`);

confirmToProceed('Is the set version correct for this release?', () => {
    confirmToProceed('Did all tests pass?', () => {
        const releasePackage = { ...package };
        delete releasePackage.scripts;

        try {
            fs.writeFileSync('lib/package.json', JSON.stringify(releasePackage));
            fs.copyFileSync('README.md', 'lib/README.md');

            require('child_process').execSync('npm publish ./lib');
        } catch (err) {
            console.error(err);
        }

        readline.close();
        console.log('Package released');
    });
});
