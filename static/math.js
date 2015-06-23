//Practice block
var practice = [
    //Problem 1
    {type: 'math', problem: '(2+4)*1=6', answer: true},
    //Problem 2
    {type: 'math', problem: '(24/2)-6=1', answer: false},
    //Problem 3
    {type: 'math', problem: '(10/2)+1=6', answer: true},
    //Problem 4
    {type: 'math', problem: '(2*3)-3=3', answer: true},
    //Problem 5
    {type: 'math', problem: '(2+2)*2=8', answer: true}
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

var MathDemo = React.createClass({
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
                return (
                    <Instruction practice={true} onComplete={this.advance} style={{marginTop:40}}>
                    <p>Now you will practice doing the math part of the experiment.
                    A math equation, like (2*1)+1=3, will appear along with two buttons labeled 'True' and 'False'.
                    Your job is to determine the validity of the equation. If the equation is true, selected the
                    button labeled 'True', otherwise, selected the button labeled 'False'.</p>
                </Instruction>
                );
            case 1:
                return <Block block={practice} solution={false} practice={true} onComplete={this.advance}/>
            case 2:
                return (<Instruction practice={true} onComplete={this.advance}  style={{marginTop:40}}>
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
    <MathDemo />,
    document.getElementById('content')
);