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
            res.push(SentenceQuestion.pickRandomQuestion());
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
                        <p>
                        Now you will practice doing the sentence reading part of the experiment.
                        A sentence will appear on the screen, like this: 
                        </p>

                        <div style={{
                            backgroundColor:'#f9f9f9',
                            textAlign:'justify',
                            padding:'0.5em 0.8em',
                            borderLeft: '8px solid #ccc',
                            margin: '15px 15px'
                        }}>I like to run in the park.</div>

                        <p>
                        As soon as you see the sentence, you should read it and determine if it makes sense or not.
                        If the sentence makes sense, click the TRUE box with the mouse. If the
                        sentence did not make sense, click on the FALSE box. Afterwards, the
                        computer will tell you if you made the right choice.
                        </p>

                        <p>
                        It is very important that you answer the sentence problems correctly. It is
                        also important that you try and read the sentences as quickly as you can.
                        Do you have any questions? When you are ready, click start to try some
                        practice problems.
                        </p>
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
                return <div><p style={{fontSize:25, marginTop:100}}>Congrats, you have finished the task. Have a bubble gum!</p></div>
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