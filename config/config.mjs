import dotenv from 'dotenv';

// dotenv.config without any options looks for a env in your current working directory
// since this is a command line application, the current working directory could be anything
// eg console.log('current working directory',process.cwd())
// instead, use __dirname (the directory of this js file) to point to the .env file in this project

// node-config library unable to use absolute path to point to config directory
// use dotenv instead
import { URL } from 'url'; // in Browser, the URL in native accessible on window
const __filename = new URL('', import.meta.url).pathname;
// Will contain trailing slash
const __dirname = new URL('.', import.meta.url).pathname;

dotenv.config({path: __dirname + '/../.env'});

const config = {
    url: process.env.JIRA_URL,
    username: process.env.JIRA_USERNAME,
    password: process.env.JIRA_PASSWORD
};

export {config}
