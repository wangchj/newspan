//Practice problems
var practice = [
    //Problem 1
    {
        type: 'math-letter',
        letters: ['G', 'H'],
        equations: [
            '(10*2)-10=10',
            '(1+1)+1=2'
        ]
    },
    //Problem 2
    {
        type: 'math-letter',
        letters: ['P', 'F', 'D'],
        equations: [
            '(5*2)-10=10',
            '(12+3)+1=15',
            '(10/5)+5=7'
        ]
    },
    //Problem 3
    {
        type: 'math-letter',
        letters: ['V', 'R', 'S', 'N'],
        equations: [
            '6*2-10=3',
            '6/3+3=5',
            '7+7-7=7',
            '8*2*2=16'
        ]
    }
];

var data = [
    //First block
    [
        //Problem 1
        {
            type: 'math-letter',
            letters: ['D', 'L', 'P'],
            equations: [
                '(9*2)-10=8',
                '(3+4)*5=30',
                '5*4*3=60'
            ]
        },
        //Problem 2
        {
            type: 'math-letter',
            letters: ['P', 'L', 'D', 'F'],
            equations: [
                '2/2/1=2',
                '4*1*25=100',
                '100/4*4=50',
                '100/4/25=1'
            ]
        },
        //Problem 3
        {
            type: 'math-letter',
            letters: ['P', 'R', 'S', 'Y', 'N'],
            equations: [
                '32*2/32=8',
                '2*2*2*2=16',
                '2^5=32',
                '-1*-16=16',
                '7+11+2=21'
            ]
        },
        //Problem 4
        {
            type: 'math-letter',
            letters: ['Q', 'X', 'Z', 'D', 'C', 'V'],
            equations: [
                '64/2/2=8',
                '10+0*0+10=100',
                '2^0+100=100',
                '1-2-3-4=-8',
                '-20*20/2=200',
                '20*20/2=200'
            ]
        },
        //Problem 5
        {
            type: 'math-letter',
            letters: ['S', 'F', 'G', 'H', 'J', 'K', 'L'],
            equations: [
                '(1+20)*(2-(1+1)=12',
                '(21+30)*(32-2^5)=0',
                '4+4+4+4=15',
                '3+2+2*5=40',
                '(4*3)/(1+2)=3',
                '7+7+7+7+7+7=40',
                '1+2+3+4+5=16'
            ]
        }
    ],
    //Second block
    [
        //Problem 1
        {
            type: 'math-letter',
            letters: ['D', 'L', 'P'],
            equations: [
                '(9*2)-10=8',
                '(3+4)*5=30',
                '5*4*3=60'
            ]
        },
        //Problem 2
        {
            type: 'math-letter',
            letters: ['P', 'L', 'D', 'F'],
            equations: [
                '2/2/1=2',
                '4*1*25=100',
                '100/4*4=50',
                '100/4/25=1'
            ]
        },
        //Problem 3
        {
            type: 'math-letter',
            letters: ['P', 'R', 'S', 'Y', 'N'],
            equations: [
                '32*2/32=8',
                '2*2*2*2=16',
                '2^5=32',
                '-1*-16=16',
                '7+11+2=21'
            ]
        },
        //Problem 4
        {
            type: 'math-letter',
            letters: ['Q', 'X', 'Z', 'D', 'C', 'V'],
            equations: [
                '64/2/2=8',
                '10+0*0+10=100',
                '2^0+100=100',
                '1-2-3-4=-8',
                '-20*20/2=200',
                '20*20/2=200'
            ]
        },
        //Problem 5
        {
            type: 'math-letter',
            letters: ['S', 'F', 'G', 'H', 'J', 'K', 'L'],
            equations: [
                '(1+20)*(2-(1+1)=12',
                '(21+30)*(32-2^5)=0',
                '4+4+4+4=15',
                '3+2+2*5=40',
                '(4*3)/(1+2)=3',
                '7+7+7+7+7+7=40',
                '1+2+3+4+5=16'
            ]
        }
    ]
];

var Demo = React.createClass({
    getInitialState: function() {
        return {
            progress: 0
        };
    },
    advance: function() {
        if(this.state.progress < 4)
            this.setState({progress: this.state.progress + 1});
    },
    render:function(){
        switch(this.state.progress) {
            case 0:
                return (<Instruction practice={true} onComplete={this.advance} style={{marginTop:40}}>
                    <p style={{textAlign:'center'}}>[Instruction]</p>
                </Instruction>);
            case 1:
                return <Block block={practice} practice={true} keepTra={true} onComplete={this.advance}/>
            case 2:
                return (<Instruction practice={true} onComplete={this.advance} style={{marginTop:40}}>
                    <p style={{textAlign:'center'}}>[Instruction for non-practice section]</p>
                </Instruction>);
            case 3:
                return <Assessment blocks={data} keepTra={true} onComplete={this.advance} />
            case 4:
                return <div style={{marginTop:200, fontSize:25}}>Congrats, you have finished the task. Have a candy!</div>
        }
    }
});

React.render(
    <Demo />,
    document.getElementById('content')
);