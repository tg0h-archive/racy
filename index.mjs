#!/usr/bin/env node
import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import {commands} from './src/cmds/index.mjs';
import {setConfigMiddleware} from "./src/service/config/config.middleware.mjs";

yargs(hideBin(process.argv))
    .env('RACY')
    .middleware(setConfigMiddleware)
    .command(commands)
    .argv;

