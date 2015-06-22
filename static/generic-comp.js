function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
}

var Instruction = React.createClass({
    render: function() {
        return (
            <div>
                <div className="row" style={{marginBottom:20}}>
                    <div className="col-xs-6 col-xs-offset-3 instruction" style={{textAlign:'justify', fontSize:20}}>
                        {this.props.children ?
                            this.props.children :
                            this.props.practice ? 
                                'For this practice set, letters will appear on the screen one at a time. Try to remember each letter in the order presented. After 2-3 letters have been shown, you will see a screen listing 12 possible letters with a check box beside each one. Your job is to select each letter in the order presented. To do this, use the mouse to select the box beside each letter. The letters you select will appear at the bottom of the screen.' :
                                'In this task you will try to memorize letters you see on the screen, just like what we have practiced.'
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-5">
                        <button className="btn btn-default" onClick={this.props.onComplete}>Start</button>
                    </div>
                </div>
            </div>
        )
    }
});

var Demographics = React.createClass({
    complete: function() {
        this.props.onComplete();
    },
    render: function() {
        var years=[];
        for(var i = 0; i < 100; i++)
            years.push(new Date().getFullYear() - 2 - i);

        return (
            <div>
                <div className="row" style={{marginBottom:25, fontSize:20}}>
                    <div className="col-xs-12">Before we start, tell us a little about you</div>
                </div>
                <div className="row" style={{marginBottom:25}}>
                    <div className="col-sm-6 col-sm-offset-3">
                        <form>
                            <div className="form-group">
                                <label className="control-label">Birthday</label>
                                
                                <div className="row">
                                    <div className="col-xs-4">
                                        <select className="form-control">
                                            <option value="1">Jan</option><option value="2">Feb</option><option value="3">Mar</option>
                                            <option value="4">Apr</option><option value="5">May</option><option value="6">Jun</option>
                                            <option value="7">Jul</option><option value="8">Aug</option><option value="9">Sep</option>
                                            <option value="10">Oct</option><option value="11">Nov</option><option value="12">Dec</option>
                                        </select>
                                    </div>
                                    <div className="col-xs-4">
                                        <select className="form-control">
                                            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
                                                .map(function(val){
                                                    return <option value={val}>{val}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-xs-4">
                                        <select className="form-control">
                                            {years.map(function(val){return <option value={val}>{val}</option>})}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Gender</label>
                                <div className="row">
                                    <div className="col-xs-4 col-xs-offset-4">
                                        <select className="form-control">
                                            <option value="female">Female</option>
                                            <option value="male">Male</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
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

/**
 * A set of problems.
 * @prop block      array   The set of problems to render
 * @prop practice   boolean True if this block is a practice; false if this this block is to be recorded.
 * @prop onComplete callback 
 */
var Block = React.createClass({
    getInitialState: function() {
        return {progress: 0};
    },
    advance: function() {
        if(this.state.progress == this.props.block.length - 1) {
            this.props.onComplete();
        }
        else {
            this.setState({progress: this.state.progress + 1});
        }
    },
    render: function() {
        switch(this.props.block[this.state.progress].type) {
            case 'letter':
                return (<LetterSequence key={this.state.progress} letters={this.props.block[this.state.progress].problem}
                    onComplete={this.advance} report={this.props.practice} />
                );
            case 'math':
                return (
                    <MathEq key={this.state.progress}
                        equation={this.props.block[this.state.progress].problem}
                        solution={this.props.block[this.state.progress].answer}
                        feedback={this.props.practice} onComplete={this.advance} />
                );
            case 'math-letter':
                return (
                    <MathLetter key={this.state.progress}
                        problem={this.props.block[this.state.progress]}
                        feedback={this.props.practice}
                        onComplete={this.advance} />
                );
            case 'squares':
                return (
                    <BoxSequence key={this.state.progress}
                        sequence={this.props.block[this.state.progress].problem}
                        feedback={this.props.practice}
                        onComplete={this.advance} />
                );
            case 'symmetry':
                return (
                    <SymmetryTest key={this.state.progress}
                        colored={this.props.block[this.state.progress].problem}
                        feedback={this.props.practice}
                        onComplete={this.advance} />
                );
            case 'symmetry-squares':
                return (
                    <SymmetryBoxSequence key={this.state.progress}
                    problem={this.props.block[this.state.progress]}
                    feedback={this.props.practice}
                    onComplete={this.advance} />
                );
            case 'sentence':
                return (
                    <SentenceQuestion key={this.state.progress}
                    sentence={this.props.block[this.state.progress].sentence}
                    sol={this.props.block[this.state.progress].sol}
                    feedback={this.props.practice}
                    onComplete={this.advance} />
                );
            case 'sentence-letter':
                return (
                    <SentenceLetter key={this.state.progress}
                    sentences={this.props.block[this.state.progress].sentences}
                    letters={this.props.block[this.state.progress].letters}
                    feedback={this.props.practice}
                    onComplete={this.advance} />
                );
        }
    }
});

/**
 * A set of blocks to be presented to the user.
 * @prop blocks array An array of blocks to render.
 * @prop onComplete callback
 */
var Assessment = React.createClass({
    getInitialState: function() {
        return {progress: 0};
    },
    advance: function() {
        if(this.state.progress == this.props.blocks.length - 1) {
            this.props.onComplete();
        }
        else {
            this.setState({progress: this.state.progress + 1});
        }
    },
    render: function() {
        return <Block key={this.state.progress} block={this.props.blocks[this.state.progress]} onComplete={this.advance} practice={false} />
    }
});

/**
 * Checks if the array of points contains a specific point.
 * @param array array<array>   An array of array which is a point.
 * @param point array<integer> An array containing two elements [x, y].
 * @return true if array contains the point.
 *         false if:
 *             array is null or undefined
 *             point is null or undefined
 *             array does not contain the point
 */
function arrayHasPoint(array, point) {
    if(!array || !point)
        return false;

    for(var i = 0; i < array.length; i++)
        if(array[i] && array[i][0] == point[0] && array[i][1] == point[1])
            return true;
    return false;
}