var Demo = React.createClass({
    getInitialState: function() {
        return {progress: 0};
    },
    advance: function() {
        if(this.state.progress < 5)
            this.setState({progress: this.state.progress + 1});
    },
    generateRandomBlock: function() {
        var res = [];
        for(var l = 2; l <= 4; l++)
            res.push(this.generateRandomProblem(l));
        return res;
    },
    generateRandomProblem: function(length) {
        var res = {type:'letter', problem:[]};
        var a = 'A'.charCodeAt(0), z = 'Z'.charCodeAt(0);

        while(res.problem.length < length) {
            //Get a random letter
            var c = Math.floor(Math.random() * (z - a)) + a;
            var l = String.fromCharCode(c);
            if(l != 'A' && l != 'E' && l != 'I' && l != 'O' && l != 'U' && res.problem.indexOf(l) == -1)
                res.problem.push(l);
        }
        return res;
    },
    render:function(){
        switch(this.state.progress) {
            case 0:
                return <Demographics onComplete={this.advance} />
            case 1:
                return <Instruction practice={true} onComplete={this.advance} />
            case 2:
                return <Block block={this.generateRandomBlock()} practice={true} onComplete={this.advance} />
            case 3:
                return <Instruction practice={false} onComplete={this.advance} />
            case 4:
                return <Assessment blocks={data} onComplete={this.advance} />
            case 5:
                return <div>Congrats, you have finished the task. Have a lolllipop!</div>
        }
    }
});

React.render(
    <Demo />,
    document.getElementById('content')
);

var data = [
    //First block
    [
        //Problem 1: 3-letter sequence
        {type: 'letter', problem: ['V', 'R', 'N']},
        //Problem 2: 4-letter sequence
        {type: 'letter', problem: ['D', 'W', 'J', 'N']},
        //Problem 3: 5-letter sequence
        {type: 'letter', problem: ['K', 'B', 'X', 'Q', 'P']},
        //Problem 4: 6-letter sequence
        {type: 'letter', problem: ['T', 'M', 'S', 'P', 'X', 'L']},
        //Problem 5: 7-letter sequence
        {type: 'letter', problem: ['H', 'Z', 'X', 'Y', 'F', 'V', 'C']}
    ],
    //Second block
    [
        //Problem 1: 3-letter sequence
        {type: 'letter', problem: ['B', 'T', 'D']},
        //Problem 2: 4-letter sequence
        {type: 'letter', problem: ['P', 'T', 'C', 'X']},
        //Problem 3: 5-letter sequence
        {type: 'letter', problem: ['S', 'Q', 'N', 'C', 'S']},
        //Problem 4: 6-letter sequence
        {type: 'letter', problem: ['P', 'R', 'S', 'N', 'T', 'D']},
        //Problem 5: 7-letter sequence
        {type: 'letter', problem: ['B', 'C', 'D', 'F', 'G', 'H', 'J']}
    ],
    //Third block
    [
        //Problem 1: 3-letter sequence
        {type: 'letter', problem: ['W', 'G', 'N']},
        //Problem 2: 4-letter sequence
        {type: 'letter', problem: ['T', 'S', 'L', 'R']},
        //Problem 3: 5-letter sequence
        {type: 'letter', problem: ['S', 'L', 'F', 'B', 'Y']},
        //Problem 4: 6-letter sequence
        {type: 'letter', problem: ['V', 'R', 'T', 'L', 'M', 'D']},
        //Problem 5: 7-letter sequence
        {type: 'letter', problem: ['Z', 'X', 'C', 'V', 'B', 'N', 'M']},
        //Problem 6: 8-letter sequence
        {type: 'letter', problem: ['S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']}
    ]
];