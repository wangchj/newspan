var OSpan = React.createClass({
    propTypes: {
        taskId: React.PropTypes.number.isRequired,
        blocks: React.PropTypes.array.isRequired
    },
    getInitialState: function() {
        return {progress: 0, res:[]};
    },
    onPartInfoComplete: function(partId) {
        this.state.partId = partId;
        this.advance();
    },
    onBlockComplete: function(res) {
        this.state.res.push(res);
        this.advance();
    },
    onTaskComplete: function(res) {
        for(var i = 0; i < res.length; i++)
            this.state.res.push(res[i]);
        this.advance();
    },
    advance: function() {
        if(this.state.progress < 12)
            this.setState({progress: this.state.progress + 1});
        else {
            $.ajax({
                type: 'POST',
                url: saveUrl,
                data: {
                    taskId: this.props.taskId,
                    partId: this.state.partId,
                    blocks: JSON.stringify(this.state.res)
                },
                context: this,
                success: function(data, textStatus, jqXHR) {
                    console.log('Ajax save success', textStatus);
                    this.setState({progress: this.state.progress + 1});
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Ajax save error', textStatus, errorThrown);
                }
            });
        }
    },
    render:function(){
        switch(this.state.progress) {
            case 0: //Participant ID screen
                return <PartInfoForm onComplete={this.onPartInfoComplete}/>
            case 1: //Welcome screen
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
            case 2: //Letters practice instruction
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
            case 3: //Letters practice block
return <Instruction onComplete={this.advance} nextBtnLabel="ok">abc</Instruction>
                //return <Block block={this.props.blocks[0]} practice={true} onComplete={this.onBlockComplete} randomize={true} />
            case 4:
                return (
                    <Instruction practice={true} onComplete={this.advance} nextBtnLabel='Continue'>
                        <p>You have completed the practice.</p>

                        <p>Please click CONTINUE to move to next part of the task.</p>
                    </Instruction>
                );
            case 5: //Math practice instruction
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
            case 6: //Math practice block
return <Instruction onComplete={this.advance} nextBtnLabel="ok">abc</Instruction>
                //return <Block block={this.props.blocks[1]} practice={true} randomize={true} tra={{correct:0, total:0}} onComplete={this.onBlockComplete}/>
            case 7:
                return (
                    <Instruction practice={true} onComplete={this.advance} nextBtnLabel='Continue'>
                        <p>You have completed the practice.</p>

                        <p>Please click CONTINUE to move to next part of the task.</p>
                    </Instruction>
                );
            case 8: //Math and letter practice instruction
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
            case 9: //Math and letter practice block

                return <Block block={this.props.blocks[2]} practice={true} randomize={true} tra={{correct:0, total:0}} onComplete={this.onBlockComplete}/>
            case 10: //After practice interlude
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
            case 11: //Task instruction
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
            case 12: //The task
                return <Assessment blocks={[this.props.blocks[3], this.props.blocks[4], this.props.blocks[5]]} randomize={true} keepTra={true} onComplete={this.onTaskComplete} />
            case 13: //End of task
                return <div style={{fontSize:25, marginTop:100}}>You have completed the task. Thank you.</div>
        }
    }
});