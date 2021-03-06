//Practice block
var practice1 = [
    {type: 'math', problem: '(2*4)+1=5'},
    {type: 'math', problem: '(24/2)-6=1'},
    {type: 'math', problem: '(10/2)+2=6'},
    {type: 'math', problem: '(2*3)-3=3'},
    {type: 'math', problem: '(2*2)+2=6'},
    {type: 'math', problem: '(7/7)+7=8'}
];

var practice2 = [
    {
        type: 'math-letter',
        letters: ['G', 'H'],
        equations: [
            '(10*2)-10=10',
            '(1*2)+1=2'
        ]
    },
    {
        type: 'math-letter',
        letters: ['P', 'F', 'D'],
        equations: [
            '(5*2)-10=10',
            '(10*3)+1=15',
            '(10/5)+5=7'
        ]
    },
    {
        type: 'math-letter',
        letters: ['V', 'R', 'S', 'N'],
        equations: [
            '(6*2)-10=3',
            '(6/3)+3=5',
            '(7*2)-7=7',
            '(8*2)-1=16'
        ]
    }
];

var task = [
    //First block
    [
        //Problem 1
        {
            type: 'math-letter',
            letters: ['D', 'L', 'P'],
            equations: [
                '(9*2)-10=8',
                '(3*4)+5=30',
                '(5*4)-19=1'
            ]
        },
        //Problem 2
        {
            type: 'math-letter',
            letters: ['P', 'L', 'D', 'F'],
            equations: [
                '(25*2)-10=20',
                '(10*10)-10=90',
                '(4*5)+5=15',
                '(10/5)+5=7'
            ]
        },
        //Problem 3
        {
            type: 'math-letter',
            letters: ['P', 'R', 'S', 'Y', 'N'],
            equations: [
                '(10/2)+6=4',
                '(8*3)-8=16',
                '(6/2)-1=2',
                '(3*12)+3=12',
                '(6*8)-2=20'
            ]
        },
        //Problem 4
        {
            type: 'math-letter',
            letters: ['Q', 'X', 'Z', 'D', 'C', 'V'],
            equations: [
                '(3*5)-10=8',
                '(15*2)-15=0',
                '(5*2)-3=5',
                '(10/2)+6=11',
                '(4/2)-1=10',
                '(8*6)+5=53'
            ]
        },
        //Problem 5
        {
            type: 'math-letter',
            letters: ['S', 'F', 'G', 'H', 'J', 'K', 'L'],
            equations: [
                '(10/5)-2=1',
                '(12/3)-4=0',
                '(4*4)+4=20',
                '(12/4)-3=4',
                '(25*2)-10=20',
                '(8*6)-8=30',
                '(5/5)+2=1'
            ]
        }
    ],
    //Second block
    [
        //Problem 1
        {
            type: 'math-letter',
            letters: ['G', 'W', 'J'],
            equations: [
                '(9*2)-10=8',
                '(3*4)+5=30',
                '(5*4)-3=17'
            ]
        },
        //Problem 2
        {
            type: 'math-letter',
            letters: ['D', 'L', 'T', 'Q'],
            equations: [
                '(25*2)-10=20',
                '(4*1)+20=24',
                '(4*5)+5=15',
                '(10/5)+5=7'
            ]
        },
        //Problem 3
        {
            type: 'math-letter',
            letters: ['R', 'F', 'V', 'S', 'W'],
            equations: [
                '(10/2)+6=4',
                '(8*3)-8=16',
                '(6/2)-1=2',
                '(3*12)+3=12',
                '(6*8)-2=20'
            ]
        },
        //Problem 4
        {
            type: 'math-letter',
            letters: ['T', 'X', 'G', 'D', 'C', 'V'],
            equations: [
                '(13*2)-10=14',
                '(15*2)-20=0',
                '(5*2)-3=5',
                '(10*8)+2=82',
                '(4/2)-1=10',
                '(8*6)+5=53'
            ]
        },
        //Problem 5
        {
            type: 'math-letter',
            letters: ['R', 'W', 'V', 'H', 'Q', 'K', 'P'],
            equations: [
                '(10/5)-2=1',
                '(3*3)-5=4',
                '(4/4)+4=5',
                '(12/4)-3=4',
                '(25*2)-10=20',
                '(8/2)+4=6',
                '(5/5)+2=1'
            ]
        }
    ],
    [
        //Problem 1
        {
            type: 'math-letter',
            letters: ['V', 'R', 'L'],
            equations: [
                '(9*2)-10=8',
                '(16/2)-5=30',
                '(5*4)+3=23'
            ]
        },
        //Problem 2
        {
            type: 'math-letter',
            letters: ['Y', 'L', 'K', 'P'],
            equations: [
                '(25*2)-10=20',
                '(4*1)+6=10',
                '(4*5)+5=15',
                '(10/5)+5=7'
            ]
        },
        //Problem 3
        {
            type: 'math-letter',
            letters: ['D', 'N', 'G', 'T', 'K'],
            equations: [
                '(10/2)+6=4',
                '(8*3)-8=16',
                '(6/2)-1=2',
                '(3*12)+3=12',
                '(6*8)-2=20'
            ]
        },
        //Problem 4
        {
            type: 'math-letter',
            letters: ['H', 'X', 'R', 'D', 'C', 'V'],
            equations: [
                '(12*2)-10=8',
                '(15/5)-5=0',
                '(5*2)-3=5',
                '(20/2)+2=12',
                '(4/2)-1=10',
                '(8*6)+5=53'
            ]
        },
        //Problem 5
        {
            type: 'math-letter',
            letters: ['Y', 'C', 'D', 'G', 'K', 'T', 'M'],
            equations: [
                '(10/5)-2=1',
                '(12/12)-0=1',
                '(30/2)+0=15',
                '(12/4)-3=4',
                '(25*2)-10=20',
                '(8*5)+4=30',
                '(5/5)+2=1'
            ]
        }
    ]
];

var Demo = React.createClass({
    getInitialState: function() {
        return {progress: 0};
    },
    advance: function() {
        if(this.state.progress < 12)
            this.setState({progress: this.state.progress + 1});
    },
    generateRandomBlock: function() {
        var res = [];
        for(var l = 2; l <= 4; l++)
            res.push(LetterSequence.generateRandomProblem(l));
        return res;
    },
    render:function(){
        switch(this.state.progress) {
            case 0: //Welcome screen
                return (
                    <Instruction onComplete={this.advance} nextBtnLabel='Continue'>
                        <p>
                        Welcome. The task you will be completing today involves two things:
                        remembering letters and solving simple math problems. First, you will
                        practice each part before you begin the task. Please read the instructions
                        carefully so you know how to do the task.  
                        </p>

                        <p>
                        Please click the CONTINUE button to begin.
                        </p>
                    </Instruction>
                );
            case 1: //Letters practice instruction
                return (
                    <Instruction practice={true} onComplete={this.advance} nextBtnLabel='Start'>
                        <p>
                        You will now practice remembering letters.  You will see one letter at a
                        time presented and your goal is to remember the letters in the exact order
                        that they appeared on the screen. After a set of letters is presented, you
                        will see a screen with 12 possible letters.  You will click on each letter
                        in the order you think they were presented to you. A number will appear
                        next to letter to indicate its position. For example, 1 will appear for the
                        first letter, a 2 for the second letter and so on. If you need to change or
                        adjust the order of the letters, please use the CLEAR button.
                        </p>

                        <p>
                        Once you think you have all the letters in the correct order, click
                        CONTINUE to see the next set of letters.
                        </p>

                        <p>
                        Please click the START button to begin.
                        </p>
                    </Instruction>
                );
            case 2: //Letters practice block
                return <Block block={this.generateRandomBlock()} practice={true} onComplete={this.advance} randomize={true} />
            case 3:
                return (
                    <Instruction practice={true} onComplete={this.advance} nextBtnLabel='Continue'>
                        <p>You have completed the practice.</p>

                        <p>Please click CONTINUE to move to next part of the task.</p>
                    </Instruction>
                );
            case 4: //Math practice instruction
                return (
                    <Instruction practice={true} onComplete={this.advance} nextBtnLabel='Start'>
                        <p>
                        You will now practice solving the simple math problems. You will see a math
                        problem such as (2x2) + 3 = 5? Presented on the screen. Your goal is solve
                        the problem and indicate whether the number after = sign is true or false.
                        In this example, (2x2) + 3 does not equal 5, so you would click the FALSE
                        button. 
                        </p>

                        <p>
                        After you click on the TRUE or FALSE button, you will see whether your
                        answer was correct or incorrect. Your goal is to solve each answer
                        correctly as quickly as you can. 
                        </p>

                        <p>
                        Please click the START button to begin.
                        </p>
                    </Instruction>
                );
            case 5: //Math practice block
                return <Block block={practice1} practice={true} randomize={true} tra={{correct:0, total:0}} onComplete={this.advance}/>
            case 6:
                return (
                    <Instruction practice={true} onComplete={this.advance} nextBtnLabel='Continue'>
                        <p>You have completed the practice.</p>

                        <p>Please click CONTINUE to move to next part of the task.</p>
                    </Instruction>
                );
            case 7: //Math and letter practice instruction
                return (
                    <Instruction practice={false} onComplete={this.advance} nextBtnLabel='Start'>
                        <p>
                        You will now practice remembering letters and solving math problems
                        together. This practice will prepare you to complete the task and it will
                        be more challenging than doing each part alone. 
                        </p>

                        <p>
                        First you will see a math problem to solve it by clicking on TRUE or FALSE.
                        Next, you will see a letter. You will need to remember the letter. You will
                        see several math problem and letter combinations in a set. After a set, you
                        will be presented with 12 letters on the screen. As before, you will click
                        on each letter in the order you believe they appeared on the screen.
                        </p>

                        <p>
                        We will keep track of your responses. If you take too long to respond to
                        the math problem, the task will move on to the next letter and your math
                        will be marked as incorrect. If you answer several incorrect math problems,
                        you will receive a message that you have too many math errors.
                        </p>

                        <p>
                        Your goal is to solve the math problem correctly as quickly as possible AND
                        remember each of the letters in the exact order they appeared on the
                        screen. 
                        </p>

                        <p>
                        Please click the START button to begin.
                        </p>
                    </Instruction>
                );
            case 8: //Math and letter practice block
                return <Block block={practice2} practice={true} randomize={true} tra={{correct:0, total:0}} onComplete={this.advance}/>
            case 9: //After practice interlude
                return (
                    <Instruction onComplete={this.advance} nextBtnLabel='Continue'>
                        <p>
                        You have completed the practice of math and letters. You are now ready to
                        complete the task. 
                        </p>

                        <p>
                        Your goal is to solve the math problem correctly as quickly as possible AND
                        remember each of the letters in the exact order they appeared on the screen.
                        </p>

                        <p>
                        Please click CONTINUE to move to next part of the task.
                        </p>
                    </Instruction>
                );
            case 10: //Task instruction
                return (
                    <Instruction onComplete={this.advance} nextBtnLabel='Start'>
                        <p>
                        You are now ready to begin the task. 
                        </p>

                        <p>
                        Your goal is to solve the math problem correctly as quickly as possible AND
                        remember each of the letters in the exact order they appeared on the screen.
                        </p> 

                        <p>
                        The task can be challenging, and we ask you to try to do your best.
                        </p> 

                        <p>
                        Please click START to move to next part of the task. 
                        </p>
                    </Instruction>
                );
            case 11: //The task
                return <Assessment blocks={task} randomize={true} keepTra={true} onComplete={this.advance} />
            case 12: //End of task
                return <div style={{fontSize:25, marginTop:100}}>You have completed the task. Thank you.</div>
        }
    }
});

React.render(
    <Demo />,
    document.getElementById('content')
);