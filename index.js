#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
const countdown = (endDate) => {
    const end = endDate.getTime();
    const updateTimer = () => {
        const now = new Date().getTime();
        const remainingTime = end - now;
        if (remainingTime < 0) {
            console.log(chalk.green("Countdown complete!"));
            clearInterval(timerInterval);
            return;
        }
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        console.log(chalk.yellow(`${days}d ${hours}h ${minutes}m ${seconds}s`));
    };
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
};
inquirer.prompt([
    {
        type: 'input',
        name: 'endDate',
        message: chalk.cyanBright.bold('Enter the end date and time for the countdown (YYYY-MM-DDTHH:MM:SS):'),
        validate: (input) => {
            const date = new Date(input);
            return !isNaN(date.getTime()) || 'Please enter a valid date and time.';
        }
    }
]).then(answers => {
    const endDate = new Date(answers.endDate);
    countdown(endDate);
});
