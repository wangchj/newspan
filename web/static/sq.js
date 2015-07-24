var Demo = React.createClass({
    getInitialState: function() {
        return {progress: 0};
    },
    advance: function() {
        if(this.state.progress < 4)
           this.setState({progress: this.state.progress + 1});
    },
    /**
     * Generates a set of computer generated problems.
     * @param minLength  integer The minimum problem length.
     * @param maxLength  integer The maximum problem length.
     */
    generateRandomBlock: function(minLength, maxLength){
        var res = [];
        for(var i = minLength; i <= maxLength; i++)
            res.push(BoxSequence.generateRandomProblem(i));
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