/**
 * @prop equation string     The equation of this problem.
 * @prop feedback boolean    Whether to display feedback to the user.
 * @prop onComplete callback The callback when this component is finished.
 */
var MathEq = React.createClass({
    getInitialState: function() {
        return {stage: 0};
    },
    handleSubmit: function(response, startTime, endTime) {
        if(this.props.feedback) {
            this.response = response;
            this.startTime = startTime;
            this.endTime = endTime;
            this.setState({stage:1});
        }
        else {
            this.complete();
        }
    },
    complete: function() {
        if(this.props.onComplete) {
            this.props.onComplete();
        }
    },
    render: function() {
        switch(this.state.stage) {
            case 0:
                return <MathEq.Equation equation={this.props.equation} onSubmit={this.handleSubmit} />
            case 1:
                return (
                    <MathEq.Feedback equation={this.props.equation} response={this.response}
                        startTime={this.startTime} endTime={this.endTime}
                        showTime={true} onComplete={this.complete} />
                );
        }
    }
});

/**
 * @prop equation string
 * @prop tra      object
 * @prop onSubmit callback
 */
MathEq.Equation = React.createClass({
    componentDidMount: function() {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'equation']);
        MathJax.Hub.Queue(['afterTypeSet', this]);
    },
    afterTypeSet: function() {
        this.pause = setInterval(this.afterRenderPause, 500);
    },
    /**
     * Show the content after giving Mathjax a short pause to render the equation.
     */
    afterRenderPause: function() {
       clearInterval(this.pause);
       $('#component').css('visibility', 'visible');
       this.startTime = new Date().getTime();
    },
    submitTrue: function() {
        this.handleSubmit(true);
    },
    submitFalse: function() {
        this.handleSubmit(false);
    },
    handleSubmit: function(res) {
        endTime = new Date().getTime();
        this.props.onSubmit(res, this.startTime, endTime);
    },
    render: function() {
        var equation = this.props.equation.replace(/\*/g, '\\times');

        return (
            <div style={{visibility:'hidden', marginTop:200}} id="component">
                <div className="row" style={{marginBottom:60}}>
                    <div className="col-xs-12" id="equation" style={{fontSize:35}}
                        dangerouslySetInnerHTML={{__html: '`' + equation + '`'}}>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-6">
                        <button className="btn btn-default pull-right" onClick={this.submitTrue}>True</button>
                    </div>
                    <div className="col-xs-6">
                        <button className="btn btn-default pull-left" onClick={this.submitFalse}>False</button>
                    </div>
                </div>
                {
                    this.props.tra ? <MathEq.Tra tra={this.props.tra} /> : null
                }
            </div>
        );
    }
});

/*
 * @prop tra object Task Running Accuracy
 */
MathEq.Tra = React.createClass({
    render: function() {
        return (
            <div style={{position:'fixed', bottom:20, left:0, width:'100%', textAlign:'center'}}>
                <b>Math Accuracy</b> <br/> Correct: {this.props.tra.correct} | Incorrect: {this.props.tra.total - this.props.tra.correct} | Total: {this.props.tra.total}
            </div>
        );
    }
});

/**
 * @prop equation   string  The problem.
 * @prop response   boolean User's response.
 * @prop startTime  integer See return value of getTime() of JavaScript's Date object.
 * @prop endTime    integer
 * @prop showTime   boolean If this feedback should show user's response time.
 * @prop onComplete callback
 */
MathEq.Feedback = React.createClass({
    complete: function() {
        this.props.onComplete();
    },
    render: function() {
        return (
            <div>
                <div className="row" style={{marginTop:200, marginBottom:25}}>
                    <div className="col-xs-12" style={{fontSize:25}}>
                        {EQ.getAnswer(this.props.equation) == this.props.response ? 'Correct' : 'Incorrect'}!
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