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
        {
            type: 'math-letter',
            letters: ['D', 'L', 'P'],
            equations: [
                {equation: '(9*2)-10=8', answer:true},
                {equation: '(3+4)*5=30', answer:false},
                {equation: '5*4*3=60', answer:true}
            ]
        },
        //Problem 2
        {
            type: 'math-letter',
            letters: ['P', 'L', 'D', 'F'],
            equations: [
                {equation: '2/2/1=2', answer:false},
                {equation: '4*1*25=100', answer:true},
                {equation: '100/4*4=50', answer:false},
                {equation: '100/4/25=1', answer:true}
            ]
        },
        //Problem 3
        {
            type: 'math-letter',
            letters: ['P', 'R', 'S', 'Y', 'N'],
            equations: [
                {equation: '32*2/32=8', answer:false},
                {equation: '2*2*2*2=16', answer:true},
                {equation: '2^5=32', answer:true},
                {equation: '-1*-16=16', answer:false},
                {equation: '7+11+2=21', answer:false}
            ]
        },
        //Problem 4
        {
            type: 'math-letter',
            letters: ['Q', 'X', 'Z', 'D', 'C', 'V'],
            equations: [
                {equation: '64/2/2=8', answer:false},
                {equation: '10+0*0+10=100', answer:false},
                {equation: '2^0+100=100', answer:false},
                {equation: '1-2-3-4=-8', answer:true},
                {equation: '-20*20/2=200', answer:false},
                {equation: '20*20/2=200', answer:true}
            ]
        },
        //Problem 5
        {
            type: 'math-letter',
            letters: ['S', 'F', 'G', 'H', 'J', 'K', 'L'],
            equations: [
                {equation: '(1+20)*(2-(1+1)=12', answer:false},
                {equation: '(21+30)*(32-2^5)=0', answer:true},
                {equation: '4+4+4+4=15', answer:true},
                {equation: '3+2+2*5=40', answer:false},
                {equation: '(4*3)/(1+2)=3', answer:false},
                {equation: '7+7+7+7+7+7=40', answer:false},
                {equation: '1+2+3+4+5=16', answer:false}
            ]
        }
    ],
    //Second block
    // [
    //     //Problem 1
    //     {
    //         type: 'math-letter',
    //         letters: ['D', 'L', 'P'],
    //         equations: [
    //             {equation: '(9*2)-10=8', answer:true},
    //             {equation: '(3+4)*5=30', answer:false},
    //             {equation: '5*4*3=60', answer:true}
    //         ]
    //     },
    //     //Problem 2
    //     {
    //         type: 'math-letter',
    //         letters: ['P', 'L', 'D', 'F'],
    //         equations: [
    //             {equation: '2/2/1=2', answer:false},
    //             {equation: '4*1*25=100', answer:true},
    //             {equation: '100/4*4=50', answer:false},
    //             {equation: '100/4/25=1', answer:true}
    //         ]
    //     },
    //     //Problem 3
    //     {
    //         type: 'math-letter',
    //         letters: ['P', 'R', 'S', 'Y', 'N'],
    //         equations: [
    //             {equation: '32*2/32=8', answer:false},
    //             {equation: '2*2*2*2=16', answer:true},
    //             {equation: '2^5=32', answer:true},
    //             {equation: '-1*-16=16', answer:false},
    //             {equation: '7+11+2=21', answer:false}
    //         ]
    //     },
    //     //Problem 4
    //     {
    //         type: 'math-letter',
    //         letters: ['Q', 'X', 'Z', 'D', 'C', 'V'],
    //         equations: [
    //             {equation: '64/2/2=8', answer:false},
    //             {equation: '10+0*0+10=100', answer:false},
    //             {equation: '2^0+100=100', answer:false},
    //             {equation: '1-2-3-4=-8', answer:true},
    //             {equation: '-20*20/2=200', answer:false},
    //             {equation: '20*20/2=200', answer:true}
    //         ]
    //     },
    //     //Problem 5
    //     {
    //         type: 'math-letter',
    //         letters: ['S', 'F', 'G', 'H', 'J', 'K', 'L'],
    //         equations: [
    //             {equation: '(1+20)*(2-(1+1)=12', answer:false},
    //             {equation: '(21+30)*(32-2^5)=0', answer:true},
    //             {equation: '4+4+4+4=15', answer:true},
    //             {equation: '3+2+2*5=40', answer:false},
    //             {equation: '(4*3)/(1+2)=3', answer:false},
    //             {equation: '7+7+7+7+7+7=40', answer:false},
    //             {equation: '1+2+3+4+5=16', answer:false}
    //         ]
    //     }
    // ]
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
                return <Block block={practice} practice={true} onComplete={this.advance}/>
            case 2:
                return (<Instruction practice={true} onComplete={this.advance} style={{marginTop:40}}>
                    <p style={{textAlign:'center'}}>[Instruction for non-practice section]</p>
                </Instruction>);
            case 3:
                return <Assessment blocks={data} onComplete={this.advance} />
            case 4:
                return <div style={{marginTop:200, fontSize:25}}>Congrats, you have finished the task. Have a candy!</div>
        }
    }
});

React.render(
    <Demo />,
    document.getElementById('content')
);