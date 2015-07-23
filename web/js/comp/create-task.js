var task = [];

var CreateTask = React.createClass({
    getInitialState: function() {
        this.addProb = {
            blockPos: null
        };

        return {
            blocks: [[]],
            //showAddModal: false
        };
    },
    addBlock: function() {
        this.state.blocks.push([]);
        this.setState({blocks: this.state.blocks});
    },
    onAddProbClick: function(blockPos) {
        this.addProb.blockPos = blockPos;
        $('#addModal').modal('show');
    },
    onAddProbModalSaveClick: function() {
        console.log('on Add Prob Modal Save Click');

        var type = $('#addModal #probType').val();
        switch(type) {
            case 'ml':
                var eqStr = $('#addModal #ml-equations').val().trim();
                var leStr = $('#addModal #ml-letters').val().trim();

                if(eqStr && leStr) {
                    var eq = eqStr.split(',').map(function(str){return str.trim()});
                    var le = leStr.split(',').map(function(str){return str.trim()});

                    if(eq && eq.length > 0 && le && le.length > 0 && eq.length == le.length) {
                        console.log(eq, le);
                        var i = this.addProb.blockPos;
                        this.state.blocks[i].push({
                            id: this.state.blocks[i].length,
                            type: 'math-letter',
                            letters: le,
                            equations: eq
                        });
                        this.setState({blocks: this.state.blocks});
                        $('#addModal').modal('hide');
                    }
                }
                break;

            case 'ss':
                break;

        }
    },
    render: function() {
        return (
            <div>
                <BlockList blocks={this.state.blocks} onAddProbClick={this.onAddProbClick}/>
                <CreateTask.Buttons onAddBlock={this.addBlock}/>
                <AddProblemModal onSaveClick={this.onAddProbModalSaveClick}/>
            </div>
        );
    }
});

CreateTask.Buttons = React.createClass({
    propTypes: {
        addBlock: React.PropTypes.func.isRequired
    },
    addBlock: function() {
        this.props.addBlock();
    },
    render: function() {
        return (
            <div>
                <button className="btn btn-default" onClick={this.addBlock}>New Block</button> <button className="btn btn-default">Finish</button>
            </div>
        );
    }
});

var BlockList = React.createClass({
    propTypes: {
        blocks: React.PropTypes.array.isRequired,
        onAddProbClick: React.PropTypes.func.isRequired
    },
    render: function() {
        var blocks = this.props.blocks.map(function(block, index){
            return <Block blockPos={index} block={block} onAddProbClick={this.props.onAddProbClick} />
        }.bind(this));

        return <div>{blocks}</div>
    }
});

var Block = React.createClass({
    propTypes: {
        blockPos: React.PropTypes.number.isRequired,
        block: React.PropTypes.array.isRequired,
        onAddProbClick: React.PropTypes.func.isRequired
    },
    render: function() {
        return (
            <div className="panel panel-default">
                <Block.Heading blockPos={this.props.blockPos} />
                <Block.Body blockPos={this.props.blockPos} block={this.props.block} />
                <Block.Footer blockPos={this.props.blockPos} onAddProbClick={this.props.onAddProbClick}/>
            </div>
        )
    }
});


Block.Heading = React.createClass({
    propTypes: {
        blockPos: React.PropTypes.number.isRequired
    },
    render: function() {
        return (
            <div className="panel-heading">
                <h2 className="panel-title">Block {this.props.blockPos + 1}</h2>
            </div>
        )
    }
});

Block.Body = React.createClass({
    propTypes: {
        blockPos: React.PropTypes.number.isRequired,
        block: React.PropTypes.array.isRequired
    },
    render: function() {
        var res = this.props.block.length > 0 ?
            <Block.Table blockPos={this.props.blockPos} block={this.props.block}/> :
            <div className="panel-body">There is currently no problem in this block.</div>
        return res;
    }
});

Block.Table = React.createClass({
    propTypes: {
        blockPos: React.PropTypes.number.isRequired,
        block: React.PropTypes.array.isRequired
    },
    render: function() {
        return (
            <table className="table">
                <tbody>
                    {this.props.block.map(function(p, i){
                        return <Block.Table.Row blockPos={this.props.blockPos} problem={p}/>
                    }.bind(this))}
                </tbody>
            </table>
        )
    }
});

Block.Table.Row = React.createClass({
    propTypes: {
        blockPos: React.PropTypes.number.isRequired,
        problem: React.PropTypes.object.isRequired
    },
    render: function() {
        return (
            <tr>
                <td>{this.props.problem.id + 1}</td>
                <td>{this.props.problem.type}</td>
                <td>Problem Details</td>
                <td>Edit Remove Buttons?</td>
            </tr>
        )
    }
});

Block.Footer = React.createClass({
    propTypes: {
        blockPos: React.PropTypes.number.isRequired,
        onAddProbClick: React.PropTypes.func.isRequired
    },
    onAddProbClick: function() {
        this.props.onAddProbClick(this.props.blockPos);
    },
    render: function() {
        return (
            <div className="panel-footer">
                <button className="btn btn-default" onClick={this.onAddProbClick}>Add Problem</button>
            </div>
        )
    }
});


var AddProblemModal = React.createClass({
    propTypes: {
        onSaveClick: React.PropTypes.func.isRequired
    },
    render: function() {
        return (
            <div className="modal fade" id="addModal" tabindex="-1" role="dialog" labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <AddProblemModal.Header />
                        <AddProblemModal.Body />
                        <AddProblemModal.Footer onSaveClick={this.props.onSaveClick} />
                    </div>
                </div>
            </div>
        )
    }
});

AddProblemModal.Header = React.createClass({
    render: function() {
        return (
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">New Problem</h4>
            </div>
        )
    }
});

AddProblemModal.Body = React.createClass({
    getInitialState: function() {
        return {
            type: 'ml'
        }
    },
    onTypeChange: function(event) {
        console.log('Type changed', event.target.value);
        this.setState({type: event.target.value});
    },
    render: function() {
        return (
            <div className="modal-body">
                <form>
                    <div className="form-group">
                        <label for="probType">Type</label>
                        <select className="form-control" id="probType" onChange={this.onTypeChange}>
                            <option value="ml">Math and Letters</option>
                            <option value="ss">Symmetry and Squares</option>
                        </select>
                    </div>
                    <AddProblemModal.SpecialPane type={this.state.type} />
                </form>
            </div>
        )
    }
});

AddProblemModal.SpecialPane = React.createClass({
    propTypes: {
        type: React.PropTypes.string.isRequired
    },
    render: function() {
        switch(this.props.type) {
            case 'ml':
                return <AddProblemModal.MLPane />
            case 'ss':
                return <AddProblemModal.SSPane />
            default:
                return null;
        }
    }
});

AddProblemModal.MLPane = React.createClass({
    render: function() {
        return (
            <div>
                <div className="form-group">
                    <label for="ml-equations">Equations</label>
                    <textarea className="form-control" id="ml-equations"></textarea>
                    <div>Equations separated by commas <code>,</code>. For example: <code>(2*2)+2=2, (4/2)-1=1</code></div>
                </div>
                <div className="form-group">
                    <label for="ml-letters">Letters</label>
                    <input type="text" className="form-control" id="ml-letters" />
                    <div>A sequence of letters. For example: <code>X,Y,Z</code></div>
                </div>
            </div>
        )
    }
});

AddProblemModal.SSPane = React.createClass({
    render: function() {
        return (
            <div>SSPane</div>
        )
    }
});


AddProblemModal.Footer = React.createClass({
    propTypes: {
        onSaveClick: React.PropTypes.func.isRequired
    },
    render: function() {
        return (
            <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" onClick={this.props.onSaveClick}>Ok</button>
            </div>
        )
    }
});

React.render(<CreateTask />, document.getElementById('comp'));