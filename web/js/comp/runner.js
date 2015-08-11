var Runner = React.createClass({
    propTypes: {
        taskId: React.PropTypes.number.isRequired,
        task: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {progress: 0};
    },
    onPartInfoComplete: function(partId) {
        this.state.partId = partId;
        this.advance();
    },
    onTaskComplete: function(res) {
        this.advance();

        //Short problem blocks
        for(var i = 0; i < this.props.task.blocks.length; i++)
            this.props.task.blocks[i].problems.sort(function(a, b){return (a.id - b.id)});
        
        $.ajax({
            type: 'POST',
            url: saveUrl,
            data: {
                taskId: this.props.taskId,
                partId: this.state.partId,
                json: JSON.stringify(res),
                score: TSK.getScore(this.props.task, res)
            },
            context: this,
            success: function(data, textStatus, jqXHR) {
                console.log('Ajax save success', textStatus);
                this.advance();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Ajax save error', textStatus, errorThrown);
                this.setState({progress: 4});
            }
        });
    },
    advance: function() {
        if(this.state.progress < 3)
            this.setState({progress: this.state.progress + 1});
    },
    render:function(){
        switch(this.state.progress) {
            case 0: //Participant ID screen
                return <PartInfoForm onComplete={this.onPartInfoComplete}/>
            case 1: //The task
                return <Runner.Task task={this.props.task} onComplete={this.onTaskComplete}/>
            case 2:
                return <Runner.SavingResult/>
            case 3:
                return <Runner.SaveResultSuccess/>
            case 4:
                return <Runner.SaveResultError/>
        }
    }
});

Runner.Task = React.createClass({
    propTypes: {
        task: React.PropTypes.object.isRequired,
        onComplete: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        this.tra = {correct: 0, total: 0};
        this.res = [];

        return {i: 0};
    },
    onBlockComplete: function(res, tra) {
        this.res.push(res);
        this.advance();
    },
    advance: function() {
        if(this.state.i == this.props.task.struct.length - 1) {
            this.props.onComplete(this.res);
        }
        else {
            this.setState({i: this.state.i + 1});
        }
    },
    getCompToRender: function() {
        if(this.props.task.struct[this.state.i].type == 'block')
            return this.getBlockToRender();
        else
            return this.getInstToRender();
    },
    /**
     * Returns a Block component to be rendered.
     */
    getBlockToRender: function() {
        var entry = this.props.task.struct[this.state.i];
        var block = this.props.task.blocks[entry.id];
        return  <Block key={this.state.i} block={block.problems} tra={block.practice ? {correct: 0, total: 0} : this.tra} randomize={true} practice={block.practice} onComplete={this.onBlockComplete}/>
    },
    /**
     * Returns an Instruction component to be rendered.
     */
    getInstToRender: function() {
        var entry = this.props.task.struct[this.state.i];
        var inst = this.props.task.instructs[entry.id];
        return <Instruction key={this.state.i} text={inst.text} nextBtnLabel={inst.next} onComplete={this.advance}/>
    },
    render: function() {
        return this.getCompToRender();
    }
});

Runner.SavingResult = React.createClass({
    render: function() {
        return <div style={{fontSize:25, marginTop:100}}>You have completed the task. Please wait while we are submitting your responses.</div>
    }
});

Runner.SaveResultSuccess = React.createClass({
    render: function() {
        return <div style={{fontSize:25, marginTop:100}}>Your responses have been submitted. You may now close this program. Thank you.</div>
    }
});

Runner.SaveResultError = React.createClass({
    render: function() {
        return <div style={{fontSize:25, marginTop:100}}>There was an error submitting your responses. Please contact the coordinator of this experiment.</div>
    }
});