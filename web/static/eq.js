//Practice block
var practice = [
    //Problem 1
    {type: 'math', problem: '(2+4)*1=6'},
    //Problem 2
    {type: 'math', problem: '(24/2)-6=1'},
    //Problem 3
    {type: 'math', problem: '(10/2)+1=6'},
    //Problem 4
    {type: 'math', problem: '(2*3)-3=3'},
    //Problem 5
    {type: 'math', problem: '(2+2)*2=8'}
];

var data = [
    //First block
    [
        //Problem 1
        {type: 'math', problem: '(2+3)*1=5'},
        //Problem 2
        {type: 'math', problem: '(24/2)-6=0'},
        //Problem 3
        {type: 'math', problem: '(4/2)+1=3'},
        //Problem 4
        {type: 'math', problem: '(4*3)-3=9'},
        //Problem 5
        {type: 'math', problem: '(5+2)*2=20'}
    ],
    //Second block
    [
        //Problem 1
        {type: 'math', problem: '(18/3)+4=12'},
        //Problem 2
        {type: 'math', problem: '(6*8)+5=53'},
        //Problem 3
        {type: 'math', problem: '(10*2)-6=14'},
        //Problem 4
        {type: 'math', problem: '(5*8)-10=30'},
        //Problem 5
        {type: 'math', problem: '(7*3)-8=5'}
    ],
    //Third block
    [
        //Problem 1
        {type: 'math', problem: '(17-2)-3=10'},
        //Problem 2
        {type: 'math', problem: '(18-9)-2=2'},
        //Problem 3
        {type: 'math', problem: '(50/2)+2=27'},
        //Problem 4
        {type: 'math', problem: '(2*3)+4=0'},
        //Problem 5
        {type: 'math', problem: '(4+6)+12=22'}
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
                return <Block block={practice} practice={true} onComplete={this.advance}/>
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