var test = [[0, 0], [1, 0], [1, 1], [1, 2]];

var Demo = React.createClass({
    getInitialState: function() {
        return {progress: 0};
    },
    advance: function() {
        //if(this.state.progress < 4)
        //    this.setState({progress: this.state.progress + 1});
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
        return (<BoxSequence sequence={test} feedback={true} onComplete={this.advance} />);

        // switch(this.state.progress) {
        //     case 0:
        //         return <Instruction practice={true} onComplete={this.advance} />
        //     case 1:
        //         return <Block block={this.generateRandomBlock()} practice={true} onComplete={this.advance} />
        //     case 2:
        //         return <Instruction practice={false} onComplete={this.advance} />
        //     case 3:
        //         return <Assessment blocks={data} onComplete={this.advance} />
        //     case 4:
        //         return <div>Congrats, you have finished the task. Have a lolllipop!</div>
        // }
    }
});

React.render(
    <Demo />,
    document.getElementById('content')
);