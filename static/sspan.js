var Demo = React.createClass({
    getInitialState: function() {
        return {progress: 0};
    },
    advance: function() {
        if(this.state.progress < 12)
            this.setState({progress: this.state.progress + 1});
    },
    getSequenceBlock: function() {
        var res = [];
        for(var l = 2; l <= 4; l++)
            res.push(BoxSequence.generateRandomProblem(l));
        return res;
    },

    /**
     * Generates a set of computer generated problems.
     * @param integer The number of problems in this block.
     */
    getSymmetryBlock: function(count){
        var res = [];
        for(var i = 0; i < count; i++)
            res.push({type:'symmetry', problem:SymmetryTest.generateFigure()});
        return res;
    },
    /**
     * Generates a set of computer generated problems.
     * @param minLength  integer The minimum problem length.
     * @param maxLength  integer The maximum problem length.
     */
    getCombinedBlock: function(minLength, maxLength){
        var res = [];
        for(var i = minLength; i <= maxLength; i++)
            res.push(SymmetryBoxSequence.generateProblem(i));
        return res;
    },
    /**
     * Generate a set of blockCount number of blocks of computer generated problems.
     * @param blockCount integer The number of block to generate.
     * @param minLength  integer The minimum problem length.
     * @param maxLength  integer The maximum problem length.
     */
    getAssessment: function(blockCount, minLength, maxLength) {
        var res = [];
        for(var i = 0; i < blockCount; i++)
            res.push(this.getCombinedBlock(minLength, maxLength));
        return res;
    },
    render:function(){
        switch(this.state.progress) {
            case 0: //Welcome screen
                return (
                    <Instruction onComplete={this.advance} nextBtnLabel='Continue'>
                        <p>
                        Welcome. The task you will be completing today involves two things:
                        remembering the location of blue squares on the screen and solving simple
                        symmetry problems. First, you will practice each part before you begin the
                        task. Please read the instructions carefully so you know how to do the
                        task.
                        </p>

                        <p>
                        Please click the CONTINUE button to begin.
                        </p>
                    </Instruction>
                );
            case 1: //Squares practice
                return (
                    <Instruction practice={true} onComplete={this.advance} nextBtnLabel='Start'>
                        <p>
                            You will now practice remembering blue squares.  You will see one blue
                            square appear at a time in a 4x4 grid and your goal is to remember the
                            location of the squares in the exact order that they appeared on the
                            screen. After a set of blue squares is presented, you will see a screen
                            with the 4x 4 grid with 16 possible square positions.  You will click
                            on each position on the grid in the order you think the blue squares
                            were presented to you. A number will appear in the grid to mark the
                            position. For example, 1 will appear for the first grid position you
                            click, a 2 for the second grid position and so on. If you need to
                            change or adjust the order of the blue squares, please use the CLEAR
                            button.
                        </p>

                        <p>
                            Once you think you have all the blue squares in the correct order,
                            click to the CONTINUE screen to see the next set of blue squares.
                        </p>

                        <p>
                            Please click the START button to begin.
                        </p>
                    </Instruction>
                );
            case 2: //Squares practice block
                return <Block block={this.getSequenceBlock()} practice={true} randomize={true} onComplete={this.advance} />
            case 3: //End of squares practice
                return (
                    <Instruction practice={true} onComplete={this.advance} nextBtnLabel='Continue'>
                        <p>You have completed the practice.</p>

                        <p>Please click CONTINUE to move to next part of the task.</p>
                    </Instruction>
                );
            case 4: //Symmetry practice instruction
                return (
                    <Instruction practice={true} onComplete={this.advance} nextBtnLabel='Start'>
                        <p>
                        You will now practice solving the simple symmetry problems. You will a grid
                        with black squares filled in on the screen. Imagine that there is a
                        vertical line (top to bottom) in the center of the grid. Your task is to
                        indicate whether the black blocks on the left and right side of this
                        imaginary line are identical in position. If the two sides are the same,
                        click on TRUE and if the two sides are different, click on FALSE.
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
            case 5: //Symmetry practice block 
                return <Block block={this.getSymmetryBlock(3)} practice={true} randomize={true} onComplete={this.advance}/>
            case 6: //End of symmetry practice
                return (
                    <Instruction practice={true} onComplete={this.advance} nextBtnLabel='Continue'>
                        <p>You have completed the practice.</p>

                        <p>Please click CONTINUE to move to next part of the task.</p>
                    </Instruction>
                );
            case 7: //Symmetry and squares practice instruction
                return (
                    <Instruction practice={false} onComplete={this.advance} nextBtnLabel='Start'>
                        <p>
                        You will now practice remembering the blue squares and solving symmetry
                        problems together. This practice will prepare you to complete the task and
                        it will be more challenging than doing each part alone.
                        </p>

                        <p>
                        First you will see a symmetry problem to solve whether the two sides are
                        identical by clicking on TRUE or FALSE. Next, you will see a blue square on
                        the grid. You will need to remember the position of the blue square. You
                        will see several symmetry problem and blue square combinations in a set.
                        After a set, you will see a blank 4x 4 grid with 16 possible square
                        positions.  As before, you will click on each position on the grid in the
                        order you think the blue squares were presented to you.
                        </p>

                        <p>
                        We will keep track of your responses. If you take too long to respond to
                        the symmetry problem, the task will move on to the next blue square and
                        your response will be marked as incorrect. If you answer several incorrect
                        symmetry problems, you will receive a message that you have too many errors. 
                        </p>

                        <p>
                        Your goal is to solve the symmetry problem correctly as quickly as possible
                        AND remember each of the blue squares in the exact order they appeared on
                        the screen. 
                        </p>

                        <p>
                        Please click the START button to begin.
                        </p>
                    </Instruction>
                );
            case 8: //Symmetry and squares practice block
                return <Block block={this.getCombinedBlock(2, 4)} practice={true} randomize={true} onComplete={this.advance}/>
            case 9: //End of practice instruction
                return (
                    <Instruction onComplete={this.advance} nextBtnLabel='Continue'>
                        <p>
                        You have completed the practice of symmetry and blue squares. You are now
                        ready to complete the task. 
                        </p>

                        <p>
                        Your goal is to solve the symmetry problem correctly as quickly as possible
                        AND remember each of the blue squares in the exact order they appeared on
                        the screen. 
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
                        Your goal is to solve the symmetry problem correctly as quickly as possible
                        AND remember each of the blue squares in the exact order they appeared on
                        the screen. 
                        </p> 

                        <p>
                        The task can be challenging, and we ask you to try to do your best.
                        </p> 

                        <p>
                        Please click START to move to next part of the task. 
                        </p>
                    </Instruction>
                );
            case 11: //Task
                return <Assessment blocks={this.getAssessment(3, 3, 7)} randomize={true} onComplete={this.advance} />
            case 12: //End of task
                return <div>You have completed the task. Thank you.</div>
        }
    }
});

React.render(
    <Demo />,
    document.getElementById('content')
);