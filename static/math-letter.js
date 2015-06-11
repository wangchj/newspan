//Practice problems
var practice = [
    //Problem 1
    {
        type: 'math-letter',
        letters: ['G', 'H'],
        equations: [
            {equation: '(10*2)-10=10', answer:true},
            {equation: '(1+1)+1=2', answer:false}
        ]
    },
    //Problem 2
    {
        type: 'math-letter',
        letters: ['P', 'F', 'D'],
        equations: [
            {equation: '(5*2)-10=10', answer:false},
            {equation: '(12+3)+1=15', answer:false},
            {equation: '(10/5)+5=7', answer:true}
        ]
    },
    //Problem 3
    {
        type: 'math-letter',
        letters: ['V', 'R', 'S', 'N'],
        equations: [
            {equation: '6*2-10=3', answer:false},
            {equation: '6/3+3=5', answer:true},
            {equation: '7+7-7=7', answer:true},
            {equation: '8*2*2=16', answer:false}
        ]
    }
];

var data = [
    //First block
    [
        //Problem 1
        {type: 'math', problem: '(2+3)*1=5', answer: true},
        //Problem 2
        {type: 'math', problem: '(24/2)-6=0', answer: false},
        //Problem 3
        {type: 'math', problem: '(4/2)+1=3', answer: true},
        //Problem 4
        {type: 'math', problem: '(4*3)-3=9', answer: true},
        //Problem 5
        {type: 'math', problem: '(5+2)*2=20', answer: true}
    ],
    //Second block
    [
        //Problem 1
        {type: 'math', problem: '(18/3)+4=12', answer: false},
        //Problem 2
        {type: 'math', problem: '(6*8)+5=53', answer: true},
        //Problem 3
        {type: 'math', problem: '(10*2)-6=14', answer: true},
        //Problem 4
        {type: 'math', problem: '(5*8)-10=30', answer: true},
        //Problem 5
        {type: 'math', problem: '(7*3)-8=5', answer: false}
    ],
    //Third block
    [
        //Problem 1
        {type: 'math', problem: '(17-2)-3=10', answer: false},
        //Problem 2
        {type: 'math', problem: '(18-9)-2=2', answer: false},
        //Problem 3
        {type: 'math', problem: '(50/2)+2=27', answer: true},
        //Problem 4
        {type: 'math', problem: '(2*3)+4=0', answer: false},
        //Problem 5
        {type: 'math', problem: '(4+6)+12=22', answer: true}
    ]
];

var Demo = React.createClass({
    getInitialState: function() {
        return {
            progress: 0
        };
    },
    advance: function() {
        if(this.state.progress < 2)
            this.setState({progress: this.state.progress + 1});
    },
    render:function(){
        switch(this.state.progress) {
            case 0:
                return (<Instruction practice={true} onComplete={this.advance}>
                    <p style={{marginTop:100, textAlign:'center'}}>[Instruction]</p>
                </Instruction>);
            case 1:
                return <Block block={practice} practice={true} onComplete={this.advance}/>
            case 2:
                return (<Instruction practice={true} onComplete={this.advance}>
                    <p style={{marginTop:100, textAlign:'center'}}>[Instruction for non-practice section]</p>
                </Instruction>);
            //case 3:
            //    return <Assessment blocks={data} onComplete={this.advance} />
            //case 4:
            //    return <div style={{marginTop:200, fontSize:25}}>Congrats, you have finished the task. Have a candy!</div>
        }
    }
});

React.render(
    <Demo />,
    document.getElementById('content')
);