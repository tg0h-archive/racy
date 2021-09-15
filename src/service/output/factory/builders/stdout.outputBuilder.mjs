//es6 does not have a nested destructure import

/***
 * write out to stdout
 * @param out assumes that this is a string
 */
const stdoutOutputBuilder = function (out) {
    process.stdout.write(out)
    // https://unix.stackexchange.com/questions/167582/why-zsh-ends-a-line-with-a-highlighted-percent-symbol
    // avoid a percent symbol in the zsh shell by ending with a newline
    process.stdout.write('\n')
}

export {stdoutOutputBuilder}
