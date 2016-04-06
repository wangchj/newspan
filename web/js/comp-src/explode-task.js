var ExplodeTask = React.createClass({
    propTypes: {
        task: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            lang: Object.keys(this.props.task.instructs)[0]
        };
    },
    nop: function() {
    },
    onLangClick: function(lang) {
        this.setState({lang: lang});
    },
    render: function() {
        return (
            <div>
                <CreateTask.LangPane task={this.props.task} lang={this.state.lang} onLangClick={this.onLangClick} onAddLangClick={this.nop}/>
                <TaskObList task={this.props.task} mode='view' onAddProbClick={this.nop} onProbEdit={this.nop} onProbDel={this.nop} onBlockDel={this.nop} onInstEdit={this.nop} onInstDel={this.nop} lang={this.state.lang}/>
            </div>
        );
    }
});