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
     * @param integer The number of problems in this block.
     */
    generateRandomBlock: function(count){
        var res = [];
        for(var i = 0; i < count; i++)
            res.push({type:'symmetry', problem:SymmetryTest.generateFigure()});
        return res;
    },
    /**
     * Generate a set of blockCount number of blocks of computer generated problems.
     * @param blockCount integer The number of block to generate.
     * @param count      integer The number of problems in this block.
     */
    generateRandomAssessment: function(blockCount, count) {
        var res = [];
        for(var i = 0; i < blockCount; i++)
            res.push(this.generateRandomBlock(count));
        return res;
    },
    render:function(){
        switch(this.state.progress) {
            case 0:
                return (
                    <Instruction practice={true} onComplete={this.advance}>
                        <p style={{textAlign:'center'}}>[Instruction for Practice Section]</p>
                    </Instruction>
                );
            case 1:
                return <Block block={this.generateRandomBlock(3)} practice={true} onComplete={this.advance} />
            case 2:
                return (
                    <Instruction practice={false} onComplete={this.advance}>
                        <p style={{textAlign:'center'}}>[Instruction for Non-Practice Section]</p>
                    </Instruction>
                );
            case 3:
                return <Assessment blocks={this.generateRandomAssessment(3, 5)} onComplete={this.advance} />
            case 4:
                return <div><p style={{fontSize:25, marginTop:100}}>Congrats, you have finished the task. Have a chocolate!</p></div>
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