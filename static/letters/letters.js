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
        return (<span className="letter">{this.props.letter}</span>);
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
                                <div key={index} className="col-xs-4" onClick={this.letterClicked.bind(this, index)} style={{paddingTop:10, paddingBottom:10}}>
                                    <div className="letter recall-sequence" style={{display:'inline-block', width:60}}>{s == -1 ? '' : s + 1}</div>
                                    <div className="letter recall-letter" style={{display:'inline-block'}}>{letter}</div>
                                </div>
                            );
                        }, this)
                    }  
                </div>
                <div className="row">
                    <div className="col-xs-1 col-xs-offset-5"><button className="btn btn-default" onClick={this.clearSelects}>Clear</button></div>
                    <div className="col-xs-1"><button className="btn btn-default">Continue</button></div>
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
    }
});

var LetterSequence = React.createClass({
    getInitialState: function() {
        return {count:0};
    },
    componentDidMount: function() {
        this.timer = setInterval(this.timerTick, 1000);
    },
    timerTick: function() {
        var count = this.state.count + 1;
        if(count == this.props.letters.length)
            clearInterval(this.timer);
        this.setState({count:count});
    },
    render: function() {
        //If there are still more letters, display the letters.
        if(this.state.count < this.props.letters.length) {
            return (<SingleLetterSlide letter={this.props.letters[this.state.count]} />);
        }
        //Otherwise, display the letter selection slide.
        else {
            return (<LetterRecall letters={this.props.letters}/>);
        }
    }
});

React.render(
    <LetterSequence letters={['D', 'B', 'C']} />,
    document.getElementById('content')
);