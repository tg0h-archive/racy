#!/usr/bin/env node

import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import {commands} from './src/cmds/index.mjs';

yargs(hideBin(process.argv))
    .command(commands)
    .argv;

