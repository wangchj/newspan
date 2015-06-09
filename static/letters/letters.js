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

var SingleLetterSlide = React.createClass({
    render: function() {
        return (<div className="flash-letter">{this.props.letter}</div>);
    }
});

var LetterRecall = React.createClass({
    getInitialState: function() {
        return {
            letters: this.randomize(this.props.letters),
            //selects stores the order in which slots were selected.
            //For example, if the 3rd slot were select first, then 1st slot, and finally 2nd slot,
            //select would contain the values [3, 1, 2]
            selects: this.props.letters.map(function(){return null;})
        };
    },
    componentDidMount: function() {
        this.startTime = new Date().getTime();
    },
    render: function() {
        return (
            <div>
                <div className="row" style={{margin:30}}>
                    {
                        this.state.letters.map(function(letter, index){
                            var s = this.state.selects.indexOf(index);
                            return (
                                <div key={index} className="col-xs-4" onClick={this.letterClicked.bind(this, index)} style={{paddingTop:15, paddingBottom:15}}>
                                    <div className="recall-num" style={{display:'inline-block', width:50}}>{s == -1 ? '' : s + 1}</div>
                                    <div className="recall-letter" style={{display:'inline-block'}}>{letter}</div>
                                </div>
                            );
                        }, this)
                    }  
                </div>
                <div className="row">
                    <div className="col-xs-1 col-xs-offset-5"><button className="btn btn-default" onClick={this.clearSelects}>Clear</button></div>
                    <div className="col-xs-1"><button className="btn btn-default" onClick={this.submitResponse}>Continue</button></div>
                </div>
            </div>
        );
    },
    randomize: function(letters) {
        var res = letters.slice();
        var a = 'A'.charCodeAt(0);
        var z = 'Z'.charCodeAt(0);

        while(res.length < 12) {
            //Get a random letter
            var c = Math.floor(Math.random() * (z - a)) + a;
            var l = String.fromCharCode(c);
            if(l != 'A' && l != 'E' && l != 'I' && l != 'O' && l != 'U' && res.indexOf(l) == -1)
                res.push(l);
        }

        res = shuffle(res);
        return res;
    },
    letterClicked: function(index, event) {
        console.log(this.state.selects);

        var i = this.state.selects.indexOf(index);

        //If this index is already selected, deselect it.
        if(i != -1) {
            this.state.selects[i] = null;
            this.setState({selects:this.state.selects});
        }
        //Else, select the index (put into this.state.selects).
        else {
            for(var j = 0; j < this.state.selects.length; j++) {
                if(this.state.selects[j] == null) {
                    this.state.selects[j] = index;
                    this.setState({selects:this.state.selects});
                    break;
                }
            }
        }
        console.log(this.state.selects);
    },
    clearSelects: function() {
        for(var i = 0; i < this.state.selects.length; i++) {
            this.state.selects[i] = null;
        }
        this.setState({selects:this.state.selects});
    },
    submitResponse: function() {
        this.props.onSubmitResponse(this.state.letters, this.state.selects, this.startTime, new Date().getTime());
    }
});

var LetterSequenceReport = React.createClass({
    complete: function() {
        this.props.onComplete();
    },
    render: function() {
        var solution = this.props.response.solution;
        var challenge = this.props.response.challenge;
        var selections = this.props.response.selections;
        var startTime = this.props.response.startTime;
        var endTime = this.props.response.endTime;

        //Response letter sequence
        var response = selections.map(function(sequenceNum) {return challenge[sequenceNum];});
        console.log(response);
        var correctCount = 0;

        //Calculate correct count
        for(var i = 0; i < solution.length; i++) {
            if(solution[i] == response[i])
                correctCount++;
        }

        return (
            <div>
                <div className="row">
                    <div className="col-xs-6" style={{fontSize:35}}>
                        Correct: {correctCount}/{solution.length} ({Math.round(correctCount/solution.length * 100)}%)
                    </div>
                    <div className="col-sx-6" style={{fontSize:35}}>
                        Time: {(endTime - startTime) / 1000} Seconds
                    </div>
                </div>

                <div className="row" style={{margin:30}}>
                    {
                        challenge.map(function(letter, index){
                            var solSeq = solution.indexOf(letter);
                            var selSeq = selections.indexOf(index);

                            //Not part of the solution and not selected
                            if(solSeq == -1 && selSeq == -1) {
                                return (
                                    <div key={index} className="col-xs-4" style={{paddingTop:15, paddingBottom:15}}>
                                        <div className="recall-num" style={{display:'inline-block', width:50}}></div>
                                        <div className="recall-letter" style={{display:'inline-block'}}>{letter}</div>
                                    </div>
                                );
                            }
                            //Not part of the solution, but selected
                            else if(solSeq == -1 && selSeq != -1) {
                                return (
                                    <div key={index} className="col-xs-4" style={{paddingTop:15, paddingBottom:15}}>
                                        <div className="recall-num" style={{display:'inline-block', width:50, color:'red', textDecoration:'line-through'}}>
                                            {selSeq + 1}
                                        </div>
                                        <div className="recall-letter" style={{display:'inline-block', color:'red', textDecoration:'line-through'}}>{letter}</div>
                                    </div>
                                );
                            }
                            //Part of the solution, but not selected
                            else if(solSeq != -1 && selSeq == -1) {
                                return (
                                    <div key={index} className="col-xs-4" style={{paddingTop:15, paddingBottom:15}}>
                                        <div className="recall-num" style={{display:'inline-block', width:50}}>{solSeq + 1}</div>
                                        <div className="recall-letter" style={{display:'inline-block', color:'red'}}>{letter}</div>
                                    </div>
                                );
                            }
                            //Part of the solution, and incorrectly selected
                            else if(solSeq != -1 && selSeq != -1 && solSeq != selSeq) {
                                return (
                                    <div key={index} className="col-xs-4" style={{paddingTop:15, paddingBottom:15}}>
                                        <div className="recall-num" style={{display:'inline-block', width:50, color:'red', textDecoration:'line-through'}}>
                                            {selSeq + 1}
                                        </div>
                                        <div className="recall-num" style={{display:'inline-block', width:50}}>
                                            {solSeq + 1}
                                        </div>
                                        <div className="recall-letter" style={{display:'inline-block'}}>{letter}</div>
                                    </div>
                                );
                            }
                            else {
                                return (
                                    <div key={index} className="col-xs-4" style={{paddingTop:15, paddingBottom:15}}>
                                        <div className="recall-num" style={{display:'inline-block', width:50}}>{solSeq + 1}</div>
                                        <div className="recall-letter" style={{display:'inline-block'}}>{letter}</div>
                                    </div>
                                );
                            }
                        })
                    }  
                </div>

                <div className="row">
                    <div className="col-xs-2 col-xs-offset-5">
                        <button className="btn btn-default" onClick={this.complete}>Continue</button>
                    </div>
                </div>
            </div>
        );

    }
});

/**
 * @prop letters    array    The list of alphabets to present to user.
 * @prop report     boolean  Indicates if the result of this assessment should be displayed.
 * @prop onComplete callback The callback when this component is finished.
 */
var LetterSequence = React.createClass({
    /**
     * Gets the initial state of this component.
     * Stages: 'flash', 'recall', 'report'
     */
    getInitialState: function() {
        return {count:0, stage:'flash'};
    },
    componentDidMount: function() {
        this.timer = setInterval(this.timerTick, 1000);
    },
    timerTick: function() {
        var count = this.state.count + 1;

        if(count == this.props.letters.length) {
            clearInterval(this.timer);
            this.state.stage = 'recall';
        }

        this.setState({count:count});
    },
    /**
     * @params challenge array  The list of letters presented to the user on the recall screen.
     * @params selections array User's selections.
     */
    handleResponse: function(challenge, selections, startTime, endTime) {
        

        //TODO: Submit response to the server

        if(this.props.report) {
            //Show result
            this.response = {
                solution: this.props.letters, 
                challenge: challenge,
                selections: selections,
                startTime: startTime,
                endTime: endTime
            };

            this.setState({stage: 'report'});
        }
        else {
            this.props.onComplete();
        }
    },
    complete: function() {
        this.props.onComplete();
    },
    render: function() {
        //If there are still more letters, display the letters.
        if(this.state.stage == 'flash') {
            return (<SingleLetterSlide letter={this.props.letters[this.state.count]} />);
        }
        else if(this.state.stage == 'recall') {
            return (<LetterRecall letters={this.props.letters} onSubmitResponse={this.handleResponse}/>);
        }
        else {
            return <LetterSequenceReport response={this.response} onComplete={this.complete}/>
        }
    }
});

var Instruction = React.createClass({
    render: function() {
        console.log(this.props.children);
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
        return <LetterSequence key={this.state.progress} letters={this.props.block[this.state.progress]} onComplete={this.advance} report={this.props.practice} />
        //console.log(this.props);
        //return <div>this is a block</div>
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

var Demo = React.createClass({
    getInitialState: function() {
        return {progress: 0};
    },
    advance: function() {
        if(this.state.progress < 3)
            this.setState({progress: this.state.progress + 1});
    },
    generateRandomBlock: function() {
        var res = [];
        for(var l = 2; l <= 4; l++)
            res.push(this.generateRandomProblem(l));
        return res;
    },
    generateRandomProblem: function(length) {
        var res = [], a = 'A'.charCodeAt(0), z = 'Z'.charCodeAt(0);

        while(res.length < length) {
            //Get a random letter
            var c = Math.floor(Math.random() * (z - a)) + a;
            var l = String.fromCharCode(c);
            if(l != 'A' && l != 'E' && l != 'I' && l != 'O' && l != 'U' && res.indexOf(l) == -1)
                res.push(l);
        }
        return res;
    },
    render:function(){
        switch(this.state.progress) {
            case 0:
                return <Instruction practice={true} onComplete={this.advance} />
            case 1:
                return <Block block={this.generateRandomBlock()} practice={true} onComplete={this.advance} />
            case 2:
                return <Instruction practice={false} onComplete={this.advance} />
            case 3:
                return <Assessment blocks={data} onComplete={this.advance} />
            //case 4:

        }
        //if(this.state.progress == 0)
        //    return <Instruction practice={true} onComplete={this.advance} />
        //else
        //    return <LetterSequence letters={['D', 'B', 'C']} report={true} />
    }
});

React.render(
    <Demo />,
    document.getElementById('content')
);

var data = [
    //First block
    [
        //Problem 1: 3-letter sequence
        ['V', 'R', 'N'],
        //Problem 2: 4-letter sequence
        ['D', 'W', 'J', 'N'],
        //Problem 3: 5-letter sequence
        ['K', 'B', 'X', 'Q', 'P'],
        //Problem 4: 6-letter sequence
        ['T', 'M', 'S', 'P', 'X', 'L'],
        //Problem 5: 7-letter sequence
        ['H', 'Z', 'X', 'Y', 'F', 'V', 'C']
    ],
    //Second block
    [
        //Problem 1: 3-letter sequence
        ['B', 'T', 'D'],
        //Problem 2: 4-letter sequence
        ['P', 'T', 'C', 'X'],
        //Problem 3: 5-letter sequence
        ['S', 'Q', 'N', 'C', 'S'],
        //Problem 4: 6-letter sequence
        ['P', 'R', 'S', 'N', 'T', 'D'],
        //Problem 5: 7-letter sequence
        ['B', 'C', 'D', 'F', 'G', 'H', 'J']
    ],
    //Third block
    [
        //Problem 1: 3-letter sequence
        ['W', 'G', 'N'],
        //Problem 2: 4-letter sequence
        ['T', 'S', 'L', 'R'],
        //Problem 3: 5-letter sequence
        ['S', 'L', 'F', 'B', 'Y'],
        //Problem 4: 6-letter sequence
        ['V', 'R', 'T', 'L', 'M', 'D'],
        //Problem 5: 7-letter sequence
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
        //Problem 6: 8-letter sequence
        ['S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    ]
];