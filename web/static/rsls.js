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
    /**
     * Generates a set of computer generated problems.
     * @param minLength  integer The minimum problem length.
     * @param maxLength  integer The maximum problem length.
     */
    generateRandomBlock: function(minLength, maxLength){
        var res = [];
        for(var i = minLength; i <= maxLength; i++) {
            var letters = LetterSequence.generateRandomProblem(i).problem;
            var sentences = SentenceQuestion.pickRandomQuestions(i);
            res.push({
                type:'sentence-letter',
                sentences: sentences,
                letters: letters
            });
        }
        console.log(res);
        return res;
    },
    /**
     * Generate a set of blockCount number of blocks of computer generated problems.
     * @param blockCount integer The number of block to generate.
     * @param minLength  integer The minimum problem length.
     * @param maxLength  integer The maximum problem length.
     */
    generateRandomAssessment: function(blockCount, minLength, maxLength) {
        var res = [];
        for(var i = 0; i < blockCount; i++)
            res.push(this.generateRandomBlock(minLength, maxLength));
        console.log(res);
        return res;
    },
    render:function(){
        switch(this.state.progress) {
            case 0:
                return (<Instruction practice={true} onComplete={this.advance}>
                    <p>
                    Now you will practice doing both parts of the experiment at the same time.
                    In the next practice set, you will be given one sentence to read. Once you make
                    your decision about the sentence, a letter will appear on the screen. Try and
                    remember the letter. In the previous section where you only read the sentences,
                    the computer computed your average time to read the sentences. If you take
                    longer than your average time, the computer will automatically move you onto
                    the letter part, thus skipping the True and False part and will count that
                    problem as a sentence error. Therefore it is VERY important to read the
                    sentences as quickly and as accurately as possible.
                    </p>
                    <p>
                    After the letter goes away, another sentence will appear, and then another
                    letter. At the end of each set of letters and sentences, a recall screen will
                    appear. Use the mouse to select the letters you just saw. Try your best to get
                    the letters in the correct order. It is important to work QUICKLY and
                    ACCURATELY on the sentences. Makes sure you know whether the sentence makes
                    sense or not before clicking on the next screen. You will not be told if your
                    answer regarding the sentence is correct. After the recall screen, you will be
                    given feedback about your performance regarding both the number of letters
                    recalled and the percent correct on the sentence problems. Do you have any
                    questions?
                    </p>
                    <p>
                    During the feedback, you will see a number in red in the top of the screen.
                    This indicates your percent correct for the entire experiment. It is VERY
                    important for you to keep this at least at 85%. For our purposes, we can only
                    use data where the participant was at least 85% accurate on the sentences.
                    Therefore, in order for you to be asked to come back for future experiments,
                    you must perform at least at 85% on the sentence problems WHILE doing your
                    best to recall as many letters as possible. Do you have any questions? Click
                    continue to try some practice problems.
                    </p>
                </Instruction>);
            case 1:
                return <Block block={this.generateRandomBlock(2, 4)} practice={true} onComplete={this.advance}/>
            case 2:
                return (<Instruction practice={false} onComplete={this.advance}>
                    <p>
                    That is the end of the practice. The real trials will look like the practice
                    trials you just completed. First you will get a sentence to read, then a letter
                    to remember. When you see the recall screen, select the letters in the order
                    presented. If you forgot a letter, select the letter that you think is correct.
                    Some sets will have more sentences and letters than others. It is important
                    that you do your best on both the sentence problems and the letter recall parts
                    of this experiment. Remember for the sentences you must work as QUICKLY and
                    ACCURATELY as possible. Also, remember to keep your sentence accuracy at 85% or
                    above. Do you have any questions? If not, click the mouse to begin the experiment.
                    </p>
                </Instruction>);
            case 3:
                return <Assessment blocks={this.generateRandomAssessment(3, 3, 7)} onComplete={this.advance} />
            case 4:
                return <div style={{marginTop:200, fontSize:25}}>Congrats, you have finished the task. Have potato chips!</div>
        }
    }
});

React.render(
    <Demo />,
    document.getElementById('content')
);