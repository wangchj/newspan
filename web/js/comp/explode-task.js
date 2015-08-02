var ExplodeTask = React.createClass({
    propTypes: {
        blocks: React.PropTypes.array.isRequired
    },
    donot: function() {
    },
    render: function() {
        return (
            <div>
                <BlockList blocks={this.props.blocks} mode='view' onAddProbClick={this.donot} onProbEdit={this.donot} onProbDel={this.donot}/>
            </div>
        );
    }
});