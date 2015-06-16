var SingleLetterSlide = React.createClass({
    render: function() {
        return (<div className="flash-letter">{this.props.letter}</div>);
    }
});

/**
 * Letter recall screen.
 * @prop letters array
 * @prop onSubmitResponse callback
 */ 
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
                                    <div className="recall-letter" style={{display:'inline-block'}}>{letter}</div>
                                    <div className="recall-num" style={{display:'inline-block', width:50}}>{s == -1 ? '' : s + 1}</div>
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