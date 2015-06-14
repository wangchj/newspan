var Demo = React.createClass({
    getInitialState: function() {
        return {progress: 0};
    },
    advance: function() {
        if(this.state.progress < 4)
           this.setState({progress: this.state.progress + 1});
    },
    generateRandomProblem: function(length) {
        var res = {
            type: 'squares',
            problem: []
        };

        while(res.problem.length < length) {
            var x = Math.floor(Math.random() * 4);
            var y = Math.floor(Math.random() * 4);
            var p = [x, y];
            if(!this.containsPoint(res.problem, p))
                res.problem.push(p);
        }

        return res;
    },
    /**
     * Generates a set of computer generated problems.
     * @param minLength  integer The minimum problem length.
     * @param maxLength  integer The maximum problem length.
     */
    generateRandomBlock: function(minLength, maxLength){
        var res = [];
        for(var i = minLength; i <= maxLength; i++)
            res.push(this.generateRandomProblem(i));
        return res;
    },
    /**
     * Generate a set of blockCount number of blocks of computer generated problems.
     * @param blockCount integer The number of block to generate.
     * @param minLength  integer The minimum problem length.
     * @param maxLength  integer The maximum problem length.
     */
    generateRandomAssessment: function(blockCount, minLength, maxLength) {
        var res = [];
        for(var i = 0; i < blockCount; i++)
            res.push(this.generateRandomBlock(minLength, maxLength));
        return res;
    },
    render:function(){
        //return (<BoxSequence sequence={test} feedback={true} onComplete={this.advance} />);

        switch(this.state.progress) {
            case 0:
                return (
                    <Instruction practice={true} onComplete={this.advance}>
                        <p style={{textAlign:'center'}}>[Instruction for Practice Section]</p>
                    </Instruction>
                );
            case 1:
                return <Block block={this.generateRandomBlock(2, 4)} practice={true} onComplete={this.advance} />
            case 2:
                return (
                    <Instruction practice={false} onComplete={this.advance}>
                        <p style={{textAlign:'center'}}>[Instruction for Non-Practice Section]</p>
                    </Instruction>
                );
            case 3:
                return <Assessment blocks={this.generateRandomAssessment(3, 3, 7)} onComplete={this.advance} />
            case 4:
                return <div>Congrats, you have finished the task. Have a lolllipop!</div>
        }
    },
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
    containsPoint: function(array, point) {
        if(!array || !point)
            return false;

        console.log(array);
        console.log(point);

        for(var i = 0; i < array.length; i++)
            if(array[i] && array[i][0] == point[0] && array[i][1] == point[1])
                return true;
        return false;
    }
});

React.render(
    <Demo />,
    document.getElementById('content')
);

$(function(){
    $(window).resize(function(){
        var svg = $('svg');
        if(svg.length != 0) {
            var width = svg.width();
            svg.height(width);
        }
    })
});