/**
 * Dependencies
 *   - box-sequence-comp.js
 */

/*
 * @prop colored    array<point>  An array specified which box should be color-filled.
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
        this.res = {res: res, startTime: this.startTime, endTime: endTime}
        this.advance();
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
            this.props.onComplete(this.res);
    },
    render: function(){
        switch(this.state.stage) {
            case 0:
                return (
                    <div>
                        <div className="row" style={{marginBottom:25}}>
                            <div className="col-md-6 col-md-offset-3 col-xs-8 col-xs-offset-2">
                                <BoxSequence.Slide.Figure rows={8} cols={8} colored={this.props.colored} />
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
                    </div>
                )
            case 1:
                return (<SymmetryTest.Feedback colored={this.props.colored} res={this.res} onComplete={this.onComplete} />)
        }
    },
    statics: {
        getRandomPoint: function(array) {
            var p = [0, 0];
            do {
                p[0] = Math.floor(Math.random() * 8);
                p[1] = Math.floor(Math.random() * 8);
            } while(arrayHasPoint(array, p));
            return p;
        },
        /**
         * Generate a random symmetric figure.
         * @param density integer how many cells are colored. This should be a 0 >= density <= 30.
         */
        generateSymmetricFigure: function(density) {
            if(density < 0) throw 'Figure density cannot be a negative number';
            if(density > 30) throw 'Figure density cannot be higher than 30';

            var points = [];

            while(points.length < density * 2) {
                var x = Math.floor(Math.random() * 4);
                var y = Math.floor(Math.random() * 8);
                var p = [x, y];

                if(!arrayHasPoint(p)) {
                    points.push(p);
                    points.push(this.getMirror(p));
                }
            }

            return points;
        },
        /**
         * Generate a asymmetric figure by mutating a random symmetric figure.
         * @param density integer how many cells are colored. This should be a 0 >= density <= 30.
         */
        generateAsymmetricFigure: function(density) {
            var points = SymmetryTest.generateSymmetricFigure(density);

            for(var i = 0; i < 3; i++) {
                var op = Math.floor(Math.random() * (i == 0 ? 2 : 3));
                switch(op) {
                    case 0:
                        points.push(SymmetryTest.getRandomPoint(points));
                        break;
                    case 1:
                        var index = Math.floor(Math.random() * points.length);
                        points.splice(index, 1);
                        break;
                }
            }

            return points;
        },
        /**
         * Generate a totally random figure.
         * @param density integer how many cells are colored. This should be a 0 >= density <= 30.
         */
        generateRandomFigure: function(density) {
            if(density < 0) throw 'Figure density cannot be a negative number';
            if(density > 30) throw 'Figure density cannot be higher than 30';

            var points = [];
            while(points.length < density * 2) {
                points.push(SymmetryTest.getRandomPoint(points));
            }
            return points;
        },
        generateFigure: function() {
            var density = Math.floor(Math.random() * 18) + 12; 
            switch(Math.floor(Math.random() * 5)) {
                case 0:
                case 1:
                    return SymmetryTest.generateSymmetricFigure(density);
                case 2:
                case 3:
                    return SymmetryTest.generateAsymmetricFigure(density);
                case 4:
                    return SymmetryTest.generateRandomFigure(density);
            }

            return SymmetryTest.generateSymmetricFigure(density);
        },
        getMirror: function(p) {
            return [7 - p[0], p[1]];
        },
        /**
         * Checks a figure, represented by array, is symmetric.
         * Throws if array is null or undefined.
         */
        figureIsSymmetric: function(array) {
            if(!array)
                throw 'Figure array is undefined';

            for(var i = 0; i < array.length; i++)
                if(!arrayHasPoint(array, SymmetryTest.getMirror(array[i])))
                    return false;
            return true;
        }
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
                        Your answer is {SymmetryTest.figureIsSymmetric(this.props.colored) == this.props.res.res ? 'correct' : 'incorrect'}.
                    </div>
                </div>
                <div className="row" style={{marginBottom:25}}>
                    <div className="col-xs-12">
                        Response Time (for researchers): {(this.props.res.endTime - this.props.res.startTime) / 1000} seconds
                    </div>
                </div>
                <div className="row">
                    <button className="btn btn-default" onClick={this.onComplete}>Continue</button>
                </div>
            </div>
        )
    }
});