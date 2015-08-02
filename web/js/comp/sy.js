/**
 * Dependencies
 *   - box-sequence-comp.js
 */

/*
 * @prop colored    array<point>  An array specified which box should be color-filled.
 * @prop tra        object   Task Running Accuracy.
 * @prop feedback   boolean       If feedback should be displayed.
 * @prop onComplete callback
 */
var SymmetryTest = React.createClass({
    getInitialState: function() {
        return {stage: 0};
    },
    componentDidMount: function() {
        this.startTime = new Date().getTime();
    },
    /**
     * Handles the event when user click on true or false.
     * @params res boolean The user's response
     */
    onRespond: function(res) {
        var endTime = new Date().getTime();
        this.res = {res: res, startTime: this.startTime, endTime: endTime};
        this.adjustTra(res);
        this.advance();
    },
    adjustTra: function(res) {
        if(!this.props.tra)
            return;
        
        this.tra = this.props.tra;

        if(res == SY.isSymmetric(this.props.colored))
            this.tra.correct++;
        this.tra.total++;
    },
    advance: function() {
        if(this.state.stage == 0 && this.props.feedback)
            this.setState({stage: 1});
        else {
            this.onComplete();
        }
    },
    onComplete:function() {
        if(this.props.onComplete)
            this.props.onComplete(this.res, this.tra);
    },
    render: function(){
        switch(this.state.stage) {
            case 0:
                return (
                    <div>
                        <div className="row" style={{marginBottom:25}}>
                            <div className="col-md-6 col-md-offset-3 col-xs-8 col-xs-offset-2">
                                <BoxSequence.Slide.Figure rows={8} cols={8} colored={this.props.colored} borderColor={'#000'} hiColor={'#000'} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6">
                                <button className="btn btn-default pull-right" onClick={this.onRespond.bind(this, true)}>True</button>
                            </div>
                            <div className="col-xs=6">
                                <button className="btn btn-default pull-left" onClick={this.onRespond.bind(this, false)}>False</button>
                            </div>
                        </div>
                        {
                            this.props.tra ? <SymmetryTest.Tra tra={this.props.tra} /> : null
                        }
                    </div>
                )
            case 1:
                return (<SymmetryTest.Feedback colored={this.props.colored} res={this.res} onComplete={this.onComplete} />)
        }
    }
});

/*
 * @prop tra object Task Running Accuracy
 */
SymmetryTest.Tra = React.createClass({
    render: function() {
        return (
            <div style={{position:'fixed', bottom:20, left:0, width:'100%', textAlign:'center'}}>
                <b>Symmetry Accuracy</b> <br/> Correct: {this.props.tra.correct} | Incorrect: {this.props.tra.total - this.props.tra.correct} | Total: {this.props.tra.total}
            </div>
        );
    }
});

/**
 * @prop colored array<point>
 * @prop res     object with the format {res: boolean, startTime: integer, endTime: integer}
 * @prop onComplete callback
 */
SymmetryTest.Feedback = React.createClass({
    onComplete: function() {
        if(this.props.onComplete)
            this.props.onComplete();
    },
    render: function() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12" style={{fontSize:25, marginTop:200, marginBottom:25}}>
                        Your answer is {SY.isSymmetric(this.props.colored) == this.props.res.res ? 'correct' : 'incorrect'}.
                    </div>
                </div>
                <div className="row">
                    <button className="btn btn-default" onClick={this.onComplete}>Continue</button>
                </div>
            </div>
        )
    }
});