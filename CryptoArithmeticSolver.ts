const run = (puzzle) => {
    const { input, output } = parseArgs(puzzle.split(' '));
    const valid = isValid(input, output);
    if (valid) {
        console.log('Solving...');
        const solutions = findSolution(input, output);
        if (solutions.length > 0) {
            console.log('Possible solutions: ', solutions);
        } else {
            console.log('No solutions found');
        }
    } else {
        console.error('Puzzle is invalid to solve');
    }
}

const parseArgs = (args) => {
    const inputArgs = [];
    let outputArg = '';
    let atEquals = false;
    for (const arg of args) {
        if (arg === '=') {
            atEquals = true;
        } else if (atEquals) {
            outputArg = arg;
        } else {
            inputArgs.push(arg);
        }
    }
    return {
        input: inputArgs,
        output: outputArg
    }
}

const isValid = (input, output) => {
    return getCharacters(input, output).length <= 10;
}

const getCharacters = (input, output) => {
    const allArgs = [...input, output];
    const allChars = allArgs.join('').split('');
    return [...new Set(allChars)];
}

const findSolution = (input, output) => {
    const chars = getCharacters(input, output);
    const combinations = getPossibleCombinations([0,1,2,3,4,5,6,7,8,9], chars.length);
    const solutions = [];
    for (const combo of combinations) {
        const assignedChars = assignChars(combo, chars);
        const isSolution = testCombination(assignedChars, input, output);
        if (isSolution) {
            solutions.push(assignedChars);
        }
    }
    return solutions;
}

const getPossibleCombinations = (array, size) => {
    var result = [];
    array.forEach(function iterate(parts) {
        return function (v) {
            const temp = parts.concat(v);
            if (parts.includes(v)) {
                return;
            }
            if (temp.length === size) {
                result.push(temp);
                return;
            }
            array.forEach(iterate(temp));
        }
    }([]));
    return result;
}

const assignChars = (combo, chars) => {
    const retVal = {};
    for (let i = 0; i < chars.length; i += 1) {
        retVal[chars[i]] = combo[i];
    }
    return retVal;
}

const testCombination = (assignedChars, input, output) => {
    const inputNumbers = convertInput(assignedChars, input);
    const outputNumber = convertToNumber(assignedChars, output);
    const actualOutput = addNumbers(inputNumbers);
    return actualOutput === outputNumber;
}

const convertInput = (assignedChars, input) => {
    const inputNumbers = [];
    for (const inputVal of input) {
        inputNumbers.push(convertToNumber(assignedChars, inputVal));
    }
    return inputNumbers;
}

const convertToNumber = (assignedChars, input) => {
    return +input.split('').map(char => assignedChars[char]).join('');
}

const addNumbers = (numbers) => {
    let total = 0;
    for (const num of numbers) {
        total += num;
    }
    return total;
}

run('a penny saved is a penny = earned');
