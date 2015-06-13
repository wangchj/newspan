/**
 * The root component of the box sequence problem.
 * This component does the following
 *   1. Displays the sequence component.
 *   2. Displays the recall component.
 *   3. Optionally displays the feedback component.
 * @prop sequence   array<point> An array of colored cells.
 * @prop feedback   boolean      If feedback should be displayed.
 * @prop onComplete callback
 */
var BoxSequence = React.createClass({
    getInitialState: function() {
        return {stage: 0};
    },
    advance: function() {
        if(this.state.stage < 1 || (this.state.stage == 1 && this.props.feedback))
            this.setState({stage: this.state.stage + 1});
        else
            this.props.onComplete();
    },
    /**
     * Handles recall response from the user.
     * @param res       array<point> A list of cells where user clicked, in the order they were clicked.
     * @param startTime integer
     * @param endTime   integer
     */
    onRecallComplete: function(res, startTime, endTime) {
        this.res = {res: res, startTime: startTime, endTime: endTime};
        this.advance();
    },
    render: function() {
        switch(this.state.stage) {
            case 0:
                return (
                    <BoxSequence.SlideSet sequence={this.props.sequence} onComplete={this.advance} />
                );
            case 1:
                return (
                    <BoxSequence.Recall sequence={this.props.sequence} onComplete={this.onRecallComplete} />
                );
            case 2:
                return (
                    <BoxSequence.Feedback sequence={this.props.sequence} response={this.res} onComplete={this.advance} />
                );
        }
    }
});

/**
 * Displays a sequence colored boxes.
 * @prop sequence array<point> An array of locations.
 * @prop onComplete callback
 */
BoxSequence.SlideSet = React.createClass({
    getInitialState: function() {
        return {count: 0};
    },
    advance: function() {
        if(this.state.count < this.props.sequence.length - 1)
            this.setState({count: this.state.count + 1});
        else
            this.props.onComplete();
    },
    render: function() {
        return (
            <BoxSequence.Slide 
                key={this.state.count}
                colored={[this.props.sequence[this.state.count]]}
                onComplete={this.advance} />
        );
    }
});

/**
 * A single slide of the sequence.
 * @prop colored array<point> An array specified which box should be color-filled.
 * @prop onComplete callback
 */
BoxSequence.Slide = React.createClass({
    componentDidMount: function() {
        this.timer = setInterval(this.timeup, 1000);
    },
    timeup: function() {
        clearInterval(this.timer);
        this.props.onComplete();
    },
    render: function() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3 col-xs-8 col-xs-offset-2">
                        <BoxSequence.Slide.Figure colored={this.props.colored} />
                    </div>
                </div>
            </div>
        );
    }
});

/**
 * @prop colored  array<point>  An array specified which box should be color-filled.
 * @prop cellText array<object> Cell text with format {loc: [x, y], text:'text'}.
 * @prop onCellClick callback
 */
BoxSequence.Slide.Figure = React.createClass({
    onCellClick: function(cell) {
        this.props.onCellClick(cell);
    },
    /**
     * Checks if a cell is colored against props 'colored'.
     * @param cell array<integer> An array consisting two elements [x, y].
     */
    cellIsColored: function(cell) {
        if(!this.props.colored)
            return false;

        for(var i = 0; i < this.props.colored.length; i++)
            if(cell[0] == this.props.colored[i][0] && cell[1] == this.props.colored[i][1])
                return true;
        return false;
    },
    /**
     * Returns the index of this.props.cellText for this cell, or -1 if this cell
     * does not have text.
     */
    cellTextIndex: function(cell) {
        if(!this.props.cellText)
            return -1;
        for(var i = 0; i < this.props.cellText.length; i++)
            if(this.props.cellText[i].loc &&
                cell[0] == this.props.cellText[i].loc[0] && 
                cell[1] == this.props.cellText[i].loc[1])
                return i;
        return -1;
    },
    render: function() {
        var x0 = 25, y0 = 25;
        var width = 100;
        var cells = [];

        //Make the cells to draw
        for(var x = 0; x < 4; x++)
            for(var y = 0; y < 4; y++)
                cells.push([x, y]);

        return (
            <svg style={{width:'100%'}} viewBox="0 0 450 450">
                {
                    cells.map(function(cell, index) {
                        if(this.cellTextIndex(cell) != -1)
                            return (
                                <g key={index} onClick={this.onCellClick.bind(this, cell)}>
                                    <rect x={x0 + width * cell[0]} y={y0 + width * cell[1]} width={width} height={width}
                                        stroke="black"
                                        fill={this.cellIsColored(cell) ? 'black' : 'white'}>
                                    </rect>
                                    {/*<circle
                                        cx={x0 + (width * cell[0] + width * (cell[0] + 1)) / 2}
                                        cy={y0 + width * cell[1] + 65} r="3" fill="red" />*/}
                                    <text textAnchor='middle'
                                        x={x0 + (width * cell[0] + width * (cell[0] + 1)) / 2}
                                        y={y0 + width * cell[1] + 65}
                                        fontSize='50' 
                                        fill='black'>
                                        {this.props.cellText[this.cellTextIndex(cell)].text}
                                    </text>
                                </g>
                            )
                        else
                            return (
                                <g key={index} onClick={this.onCellClick.bind(this, cell)}>
                                    <rect key={index} x={x0 + width * cell[0]} y={y0 + width * cell[1]}
                                        width={width} height={width} stroke="black"
                                        fill={this.cellIsColored(cell) ? 'black' : 'white'}>
                                    </rect>
                                </g>
                            );
                    }, this)
                }
            </svg>
        );
    }
});

/**
 * The recall screen.
 * @prop sequence   array<point>
 * @prop onComplete callback
 */
BoxSequence.Recall = React.createClass({
    getInitialState: function() {
        return {selects: this.props.sequence.map(function(){
            return null;
        })};
    },
    componentDidMount: function() {
        this.startTime = new Date().getTime();
    },
    /**
     * If the cell has been selected, return its index in this.state.selects;
     * return -1 otherwise.
     * @param cell array<integer>
     */
    getCellSelectIndex: function(cell) {
        var s = this.state.selects;
        for(var i = 0; i < s.length; i++)
            if(s[i] && s[i][0] == cell[0] && s[i][0] == cell[0] && s[i][1] == cell[1])
                return i;
        return -1;
    },
    onCellClick: function(cell) {
        var index = this.getCellSelectIndex(cell);
        var selects = this.state.selects;

        if(index == -1) {
            for(var i = 0; i < selects.length; i++) {
                if(selects[i] == null) {
                    selects[i] = cell;
                    this.setState({selects: selects});
                    break;
                }
            }
        }
        else {
            selects[index] = null;
            this.setState({selects: selects});
        }
    },
    onClear: function() {
        for(var i = 0; i < this.state.selects.length; i++)
            this.state.selects[i] = null;
        this.setState({selects: this.state.selects});
    },
    onComplete: function() {
        var endTime = new Date().getTime();
        this.props.onComplete(this.state.selects, this.startTime, endTime);
    },
    render: function() {
        //Make cell text
        var cellText = this.state.selects.map(function(cell, index){
            return {loc:cell, text:index + 1};
        });

        return (
            <div>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3 col-xs-8 col-xs-offset-2">
                        <BoxSequence.Slide.Figure cellText={cellText} onCellClick={this.onCellClick} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-6">
                        <button className="btn btn-default pull-right" onClick={this.onClear}>Clear</button>
                    </div>
                    <div className="col-xs-6">
                        <button className="btn btn-default pull-left" onClick={this.onComplete}>Continue</button>
                    </div>
                </div>
            </div>
        );
    }
});

/**
 * The feedback screen.
 * @prop sequence array<point> The original problem sequence
 * @prop response object       The user's response with format
 *                             {res: array<point>, startTime: integer, endTime: integer}
 * @prop onComplete callback
 */
BoxSequence.Feedback = React.createClass({
    getCorrectCount: function() {
        var res = 0;
        var sequence = this.props.sequence;
        var response = this.props.response.res;

        for(var i = 0; i < sequence.length; i++)
            if(response[i] && response[i][0] == sequence[i][0] && response[i][1] == sequence[i][1])
                res++;
        return res;
    },
    render: function() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12" style={{fontSize:25, marginTop:200, marginBottom:25}}>
                        You have recalled {this.getCorrectCount()} out of {this.props.sequence.length} squares correctly.
                    </div>
                </div>
                <div className="row" style={{marginBottom:25}}>
                    <div className="col-xs-12">
                        Response Time (for researchers): {(this.props.response.endTime - this.props.response.startTime) / 1000} seconds
                    </div>
                </div>
                <div className="row">
                    <button className="btn btn-default" onClick={this.onComplete}>Continue</button>
                </div>
            </div>
        )
    },
    onComplete: function() {
        if(this.props.onComplete)
            this.props.onComplete();
    }
});