/**
 * Dependencies
 *   - box-sequence-comp.js
 *   - symmetry-comp.js
 */

/**
 * A symmetry square sequence recall problem.
 * @prop problem object The problem with format {type:string, sequence:array<point>, syms:array<figure>}
 * @prop feedback boolean
 * @prop onComplete callback
 */
var SymmetryBoxSequence = React.createClass({
    getInitialState: function() {
        return {stage: 0}
    },
    advance: function() {
        if(this.state.stage < 1 || (this.state.stage == 1 && this.props.feedback))
            this.setState({stage: this.state.stage + 1});
        else if(this.props.onComplete)
            this.props.onComplete();
    },
    /**
     * When sequence component is completed.
     * @param symRes array<object> An array of object of user responses to symmetry problems.
     */
    onSequenceComplete: function(symRes) {
        this.symRes = symRes;
        this.advance();
    },
    /**
     * Handles the event after recall has finished.
     * @prarm selects   array<point>  User selection sequences, each of which is a location [x, y]
     * @param startTime integer       See getTime() of date object.
     * @param endTime   integer       See getTime() of date object.
     */
    onSubmitRecall: function(selects, startTime, endTime) {
        //Save the recall result
        this.recallRes = {selects: selects, startTime: startTime, endTime: endTime};
        this.advance();
    },
    render: function() {
        switch(this.state.stage) {
            case 0:
                return <SymmetryBoxSequence.Sequence problem={this.props.problem} onComplete={this.onSequenceComplete} />
            case 1:
                return <BoxSequence.Recall sequence={this.props.problem.sequence} onComplete={this.onSubmitRecall} />
            case 2:
                return (
                    <SymmetryBoxSequence.Feedback problem={this.props.problem} symRes={this.symRes}
                        recallRes={this.recallRes} onComplete={this.advance} />
                );
        }   
    },
    statics: {
        /**
         * Make a random computer generated problem.
         * @param length integer The length of the sequence.
         * @returns An object {type:'symmetry-square', sequence:array<point>, syms:array<figure>}
         */
        generateProblem: function(length) {
            var s = BoxSequence.generateRandomProblem(length).problem;
            var f = [];
            for(var i = 0; i < length; i++)
                f.push(SymmetryTest.generateFigure());
            return {type:'symmetry-squares', sequence:s, syms:f};
        }
    }
});

/**
 * Displays a sequence of alternating symmetry and square locations.
 * @prop problem object An object with fields {type, sequence, syms}.
 * @prop onComplete callback
 */
SymmetryBoxSequence.Sequence = React.createClass({
    getInitialState: function() {
        //An array of math responses, each of which has the format 
        //{res: boolean, startTIme: integer, endTime: integer}
        this.symRes = [];

        return {count: 0};
    },
    onBoxSlideComplete: function() {
        //clearInterval(this.timer);
        this.advance();
    },
    /**
     * @param res object Response {res: boolean, startTime: integer, endTime: integer}
     */
    onSymmetrySubmit: function(res) {
        this.symRes.push(res);
        this.advance();
    },
    advance: function() {
        if(this.state.count < (this.props.problem.sequence.length * 2 - 1)) {
            this.setState({count: this.state.count + 1});
        }
        else
            this.props.onComplete(this.symRes);
    },
    render: function() {
        if(this.state.count % 2 == 0) {
            return (
                <SymmetryTest key={this.state.count}
                    colored={this.props.problem.syms[Math.floor(this.state.count / 2)]}
                    onComplete={this.onSymmetrySubmit} />
            );
        }
        else {
            return (
                <BoxSequence.Slide key={this.state.count}
                colored={[this.props.problem.sequence[Math.floor(this.state.count / 2)]]}
                onComplete={this.onBoxSlideComplete} />
            );
        }
    }
});

/**
 * @prop problem    The original problem.
 * @prop symRes     Symmetry problem responses from the user.
 * @prop recallRes  Sequence recall response from the user.
 * @prop onComplete callback
 */
SymmetryBoxSequence.Feedback = React.createClass({
    getSymmetryCorrectCount: function() {
        var res = 0;
        for(var i = 0; i < this.props.problem.syms.length; i++) {
            if(this.props.symRes[i].res == SymmetryTest.figureIsSymmetric(this.props.problem.syms[i]))
                res++;
        }
        return res;
    },
    getBoxesCorrectCount: function() {
        var res = 0;

        for(var i = 0; i < this.props.problem.sequence.length; i++) {
            if(this.props.recallRes.selects[i][0] == this.props.problem.sequence[i][0] &&
                this.props.recallRes.selects[i][1] == this.props.problem.sequence[i][1])
                res++;
        }
        return res;
    },
    complete: function() {
        this.props.onComplete();
    },
    render: function() {
        var mc = this.getSymmetryCorrectCount();
        var lc = this.getBoxesCorrectCount();
        var ml = this.props.problem.syms.length; //Math problem length
        var ll = this.props.problem.sequence.length;  //Letters length

        return (
            <div style={{marginTop:100, fontSize:22}}>
                <div className="row" style={{marginBottom:20}}>
                    <div className="col-xs-12">
                        You recalled {lc} out of {ll} squares correctly.  
                    </div>
                </div>
                <div className="row" style={{marginBottom:25}}>
                    <div className="col-xs-12">
                        You answered {mc} out of {ml} symmetry figure questions correctly.
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