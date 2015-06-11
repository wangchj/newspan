/**
 * Dependencies
 *   - letter-comp.js
 *   - math-comp.js
 */

/**
 * A math-letter sequence problem.
 * @prop problem object
 * @prop feedback boolean
 * @prop onComplete callback
 */
var MathLetter = React.createClass({
    getInitialState: function() {
        return {stage: 0}
    },
    advance: function() {
        if(this.state.stage < 1 || (this.state.stage == 1 && this.props.feedback))
            this.setState({stage: this.state.stage + 1});
        else
            this.props.onComplete();
    },
    /**
     * When MathLetter.Sequence component is completed.
     * @param mathRes array<object> An array of object of user responses to math problems.
     */
    onSequenceComplete: function(mathRes) {
        this.mathRes = mathRes;
        this.advance();
    },
    /**
     * @param challenge array<string>  All choices (letters) presented to the user on the recall screen.
     * @prarm indexes   array<Integer> user response as an array of indexes.
     * @param startTime integer        See getTime() of date object.
     * @param endTime   integer        See getTime() of date object.
     */
    onSubmitRecall: function(challenge, indexes, startTime, endTime) {
        //Save the recall result
        this.recallRes = {challenge: challenge, indexes: indexes, startTime: startTime, endTime: endTime};
        this.advance();
    },
    render: function() {
        switch(this.state.stage) {
            case 0:
                return <MathLetter.Sequence problem={this.props.problem} onComplete={this.onSequenceComplete} />
            case 1:
                return <LetterRecall letters={this.props.problem.letters} onSubmitResponse={this.onSubmitRecall} />;
            case 2:
                return (
                    <MathLetter.Feedback
                        problem={this.props.problem}
                        mathRes={this.mathRes}
                        recallRes={this.recallRes}
                        onComplete={this.advance} />
                );
        }   
    }
});

/**
 * Displays a sequence of alternating math equations and letters.
 * @prop problem object An object with fields {type, letters, equations}.
 * @prop onComplete callback
 */
MathLetter.Sequence = React.createClass({
    getInitialState: function() {
        //An array of math responses, each of which has the format 
        //{res: boolean, startTIme: integer, endTime: integer}
        this.mathRes = [];

        return {count: 0};
    },
    componentDidUpdate: function() {
        if(this.state.count % 2 != 0) {
            this.timer = setInterval(this.onLetterTimeUp, 1000);
        }
    },
    onLetterTimeUp: function() {
        clearInterval(this.timer);
        this.advance();
    },
    onMathSubmit: function(res, startTime, endTime) {
        this.mathRes.push({res: res, startTime: startTime, endTime: endTime});
        this.advance();
    },
    advance: function() {
        if(this.state.count < (this.props.problem.letters.length * 2 - 1)) {
            this.setState({count: this.state.count + 1});
        }
        else
            this.props.onComplete(this.mathRes);
    },
    render: function() {
        if(this.state.count % 2 == 0) {
            return (
                <MathEq.Equation key={this.state.count}
                    equation={this.props.problem.equations[Math.floor(this.state.count / 2)].equation}
                    onSubmit={this.onMathSubmit} />
            );
        }
        else {
            return (
                <SingleLetterSlide
                    key={this.state.count}
                    letter={this.props.problem.letters[Math.floor(this.state.count / 2)]} />
            );
        }
    }
});

/**
 * @prop problem    The original problem.
 * @prop mathRes    Math problem responses from the user.
 * @prop recallRes  Letter recall response from the user.
 * @prop onComplete callback
 */
MathLetter.Feedback = React.createClass({
    getMathCorrectCount: function() {
        var res = 0;
        for(var i = 0; i < this.props.problem.equations.length; i++) {
            if(this.props.mathRes[i].res == this.props.problem.equations[i].answer)
                res++;
        }
        return res;
    },
    getLetterCorrectCount: function() {
        var res = 0;

        var r = this.props.recallRes.indexes.map(
            function(i) {return this.props.recallRes.challenge[i];}, this
        );

        for(var i = 0; i < this.props.problem.letters.length; i++) {
            if(r[i] == this.props.problem.letters[i])
                res++;
        }
        return res;
    },
    complete: function() {
        this.props.onComplete();
    },
    render: function() {
        var mc = this.getMathCorrectCount();
        var lc = this.getLetterCorrectCount();
        var ml = this.props.problem.equations.length; //Math problem length
        var ll = this.props.problem.letters.length;  //Letters length

        return (
            <div style={{marginTop:100, fontSize:22}}>
                <div className="row" style={{marginBottom:20}}>
                    <div className="col-xs-12">
                        You recalled {lc} out of {ll} letters correctly.  
                    </div>
                </div>
                <div className="row" style={{marginBottom:25}}>
                    <div className="col-xs-12">
                        You answered {mc} out of {ml} math questions correctly.
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <button className="btn btn-default" onClick={this.complete}>Continue</button>
                    </div>
                </div>
            </div>
        );
    }
});