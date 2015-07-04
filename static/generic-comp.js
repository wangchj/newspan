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
    getDefaultProps: function() {
        return {
            nextBtnLabel: 'Continue'
        };
    },
    render: function() {
        var style = this.props.style ? this.props.style : {};
        if(style) {
            style.marginBottom = 20;
        }

        return (
            <div>
                <div className="row" style={style}>
                    <div className="col-xs-10 col-xs-offset-1 col-lg-8 col-lg-offset-2" 
                    style={{
                        lineHeight: '160%',
                        textAlign:'justify', fontSize:20,
                        padding: '20px 25px',
                        backgroundColor: '#fcfcfc',
                        border: '1px solid #e1e1e8',
                        borderRadius: 4
                    }}>
                        {this.props.children}
                        {//this.props.children ?
                         //   this.props.children :
                         //   this.props.practice ? 
                         //       'For this practice set, letters will appear on the screen one at a time. Try to remember each letter in the order presented. After 2-3 letters have been shown, you will see a screen listing 12 possible letters with a check box beside each one. Your job is to select each letter in the order presented. To do this, use the mouse to select the box beside each letter. The letters you select will appear at the bottom of the screen.' :
                         //       'In this task you will try to memorize letters you see on the screen, just like what we have practiced.'
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-5">
                        <button className="btn btn-default" onClick={this.props.onComplete}>{this.props.nextBtnLabel}</button>
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
 * @prop tra        object  Task Running Accuracy {correct: integer, total: integer}
 * @prop randomize  boolean If the problems should be shuffled.
 * @prop practice   boolean True if this block is a practice; false if this this block is to be recorded.
 * @prop onComplete callback 
 */
var Block = React.createClass({
    getInitialState: function() {
        this.tra = this.props.tra ? this.props.tra : this.props.keepTra ? {correct:0, total:0} : null;
        
        return {
            block: this.props.randomize ? shuffle(this.props.block) : this.props.block,
            progress: 0
        };
    },
    advance: function(tra) {
        if(this.state.progress == this.state.block.length - 1) {
            this.props.onComplete(this.tra);
        }
        else {
            this.tra = tra;
            this.setState({progress: this.state.progress + 1});
        }
    },
    render: function() {
        var block = this.state.block;
        var progress = this.state.progress;

        switch(block[progress].type) {
            case 'letter':
                return (
                    <LetterSequence key={progress} letters={block[progress].problem}
                        onComplete={this.advance} report={this.props.practice} />
                );
            case 'math':
                return (
                    <MathEq key={progress} equation={block[progress].problem}
                        solution={block[progress].answer}
                        feedback={this.props.practice} onComplete={this.advance} />
                );
            case 'math-letter':
                return (
                    <MathLetter key={progress} problem={block[progress]}
                        tra={this.tra}
                        feedback={this.props.practice}
                        onComplete={this.advance} />
                );
            case 'squares':
                return (
                    <BoxSequence key={progress} sequence={block[progress].problem}
                        feedback={this.props.practice}
                        onComplete={this.advance} />
                );
            case 'symmetry':
                return (
                    <SymmetryTest key={progress} colored={block[progress].problem}
                        feedback={this.props.practice}
                        onComplete={this.advance} />
                );
            case 'symmetry-squares':
                return (
                    <SymmetryBoxSequence key={progress}
                        problem={block[progress]}
                        tra={this.tra}
                        feedback={this.props.practice}
                        onComplete={this.advance} />
                );
            case 'sentence':
                return (
                    <SentenceQuestion key={progress}
                        sentence={block[progress].sentence}
                        sol={block[progress].sol}
                        feedback={this.props.practice}
                        onComplete={this.advance} />
                );
            case 'sentence-letter':
                return (
                    <SentenceLetter key={progress}
                        sentences={block[progress].sentences}
                        letters={block[progress].letters}
                        feedback={this.props.practice}
                        onComplete={this.advance} />
                );
        }
    }
});

/**
 * A set of blocks to be presented to the user.
 *
 * @prop blocks     array    An array of blocks to render.
 * @prop keepTra    boolean  If task running accuracy should be kept and displayed.
 * @prop randomize  boolean 
 * @prop onComplete callback
 */
var Assessment = React.createClass({
    getInitialState: function() {
        if(this.props.keepTra)
            this.tra = {correct: 0, total: 0};

        return {progress: 0};
    },
    advance: function(tra) {
        if(this.state.progress == this.props.blocks.length - 1) {
            this.props.onComplete();
        }
        else {
            this.tra = tra;
            this.setState({progress: this.state.progress + 1});
        }
    },
    render: function() {
        return (
            <Block key={this.state.progress} block={this.props.blocks[this.state.progress]} tra={this.tra} onComplete={this.advance}
                randomize={this.props.randomize} practice={false} />
        );
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