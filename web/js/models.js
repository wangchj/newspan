var EQ = {
    typeId: 'eq',
    typeLabel: 'Equation',
    getAnswer: function(equation) {
        var p = equation.indexOf('=');
        return eval(equation.substring(0, p)) == equation.substring(p + 1);
    },
    isValid: function(equation) {
        return /^[()0-9+\-*\/]+=\d+$/.test(equation);
    }
};

var LS = {
    typeId: 'ls',
    typeLabel: 'Letter Sequence'
};

var EQLS = {
    typeId: 'eqls',
    typeLabel: 'Equation Letters'
};

var SQ = {
    typeId: 'sq',
    typeLabel: 'Square Sequence'
};

var SY = {
    typeId: 'sy',
    typeLabel: 'Symmetry'
};

var SYSQ = {
    typeId: 'sysq',
    typeLabel: 'Symmetry Squares'
};

var RS = {
    typeId: 'rs',
    typeLabel: 'Sentence'
};

var RSLS = {
    typeId: 'rsls',
    typeLabel: 'Sentence Letters'
};