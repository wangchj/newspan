var task = [];

var CreateTask = React.createClass({
    getInitialState: function() {
        this.addProb = {
            blockPos: null
        };

        var blocks = this.getBlocksTemplate(taskType);

        return {
            blocks: blocks,
            //showAddModal: false
        };
    },
    addBlock: function() {
        this.state.blocks.push([]);
        this.setState({blocks: this.state.blocks});
    },
    onAddProbClick: function(blockPos) {
        this.addProb.blockPos = blockPos;
        $(ProbForm.domIdSel).modal('show');
    },
    onProbDel: function(blockPos, probId) {
        var block = this.state.blocks[blockPos];
        block.splice(probId, 1);
        this.setState({blocks:this.state.blocks});
    },
    onAddProbModalSaveClick: function() {
        console.log('on Add Prob Modal Save Click');

        var type = $(ProbForm.domIdSel + ' #probType').val();
        switch(type) {
            case 'ml':
                var eqStr = $(ProbForm.domIdSel + ' #ml-equations').val().trim();
                var leStr = $(ProbForm.domIdSel + ' #ml-letters').val().trim();

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
                        $(ProbForm.domIdSel).modal('hide');
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
                <BlockList blocks={this.state.blocks} onAddProbClick={this.onAddProbClick} onProbDel={this.onProbDel}/>
                <CreateTask.Buttons onAddBlock={this.addBlock}/>
                <ProbForm onSaveClick={this.onAddProbModalSaveClick}/>
            </div>
        );
    },
    getBlocksTemplate: function(type) {
        switch(type) {
            case 'ospan':
                return [
                    [
                        {id: 0, type: 'letter', problem: ['G', 'H']},
                        {id: 1, type: 'letter', problem: ['P', 'F', 'D']},
                        {id: 2, type: 'letter', problem: ['V', 'R', 'S', 'N']}
                    ],
                    [
                        {id: 0, type: 'math', problem: '(2*4)+1=5'},
                        {id: 1, type: 'math', problem: '(24/2)-6=1'},
                        {id: 2, type: 'math', problem: '(10/2)+2=6'},
                        {id: 3, type: 'math', problem: '(2*3)-3=3'},
                        {id: 4, type: 'math', problem: '(2*2)+2=6'},
                        {id: 5, type: 'math', problem: '(7/7)+7=8'}
                    ],
                    [
                        {
                            id: 0,
                            type: 'math-letter',
                            letters: ['G', 'H'],
                            equations: [
                                '(10*2)-10=10',
                                '(1*2)+1=2'
                            ]
                        },
                        {
                            id: 1,
                            type: 'math-letter',
                            letters: ['P', 'F', 'D'],
                            equations: [
                                '(5*2)-10=10',
                                '(10*3)+1=15',
                                '(10/5)+5=7'
                            ]
                        },
                        {
                            id: 2,
                            type: 'math-letter',
                            letters: ['V', 'R', 'S', 'N'],
                            equations: [
                                '(6*2)-10=3',
                                '(6/3)+3=5',
                                '(7*2)-7=7',
                                '(8*2)-1=16'
                            ]
                        }
                    ],
                    []
                ];
            case 'sspan':
                return [[]];
            case 'rspan':
                return [[]];
        }
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
                {
                    //<button className="btn btn-default" onClick={this.addBlock}>New Block</button>
                }
                <button className="btn btn-default">Finish</button>
            </div>
        );
    }
});

var BlockList = React.createClass({
    propTypes: {
        blocks: React.PropTypes.array.isRequired,
        onAddProbClick: React.PropTypes.func.isRequired,
        onProbDel: React.PropTypes.func.isRequired
    },
    render: function() {
        var blocks = this.props.blocks.map(function(block, index){
            return <Block blockPos={index} block={block} onAddProbClick={this.props.onAddProbClick} onProbDel={this.props.onProbDel}/>
        }.bind(this));

        return <div>{blocks}</div>
    }
});

var Block = React.createClass({
    propTypes: {
        blockPos: React.PropTypes.number.isRequired,
        block: React.PropTypes.array.isRequired,
        onAddProbClick: React.PropTypes.func.isRequired,
        onProbDel: React.PropTypes.func.isRequired
    },
    render: function() {
        return (
            <div className="panel panel-default">
                <Block.Heading blockPos={this.props.blockPos} />
                <Block.Body blockPos={this.props.blockPos} block={this.props.block} onProbDel={this.props.onProbDel}/>
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
        block: React.PropTypes.array.isRequired,
        onProbDel: React.PropTypes.func.isRequired
    },
    render: function() {
        var res = this.props.block.length > 0 ?
            <Block.Table blockPos={this.props.blockPos} block={this.props.block} onProbDel={this.props.onProbDel} /> :
            <div className="panel-body">There is currently no problem in this block.</div>
        return res;
    }
});

Block.Table = React.createClass({
    propTypes: {
        blockPos: React.PropTypes.number.isRequired,
        block: React.PropTypes.array.isRequired,
        onProbDel: React.PropTypes.func.isRequired
    },
    render: function() {
        return (
            <table className="table">
                <tbody>
                    {this.props.block.map(function(p, i){
                        return <Block.Table.Row blockPos={this.props.blockPos} problem={p} onProbDel={this.props.onProbDel}/>
                    }.bind(this))}
                </tbody>
            </table>
        )
    }
});

Block.Table.Row = React.createClass({
    propTypes: {
        blockPos: React.PropTypes.number.isRequired,
        problem: React.PropTypes.object.isRequired,
        onProbDel: React.PropTypes.func.isRequired
    },
    onProbDel: function() {
        this.props.onProbDel(this.props.blockPos, this.props.problem.id);
    },
    render: function() {
        return (
            <tr>
                <td style={{width:50}}>{this.props.problem.id + 1}</td>
                <td style={{width:120}}>{this.props.problem.type}</td>
                <td>{this.getProblemWidget()}</td>
                <td>
                    <button type="button" className="close pull-right" aria-label="Close" onClick={this.onProbDel}><span aria-hidden="true">&times;</span></button>
                </td>
            </tr>
        )
    },
    getProblemWidget: function() {
        switch(this.props.problem.type) {
            case 'math':
                return <Block.Table.Row.MathWidget equation={this.props.problem.problem} />
            case 'letter':
                return <Block.Table.Row.LettersWidget letters={this.props.problem.problem} />
            case 'math-letter':
                return <Block.Table.Row.MathLetterWidget equations={this.props.problem.equations} letters={this.props.problem.letters}/>
            case 'squares':
                return <div>Square widget</div>
            case 'symmetry':
                return <div>Symmetry widget</div>
            case 'symmetry-squares':
                return <div>Symmetry squares widget</div>
            case 'sentence':
                return <div>Sentence widget</div>
            case 'sentence-letter':
                return <div>Sentence letter widget</div>
        }
    }
});

Block.Table.Row.MathWidget = React.createClass({
    propTypes: {
        equation: React.PropTypes.string.isRequired
    },
    render: function() {
        return <span className="inline-item">{this.props.equation}</span>
    }
});

Block.Table.Row.LettersWidget = React.createClass({
    propTypes: {
        letters: React.PropTypes.array.isRequired
    },
    render: function() {
        var str = this.props.letters.toString().replace(/,/g, ', ');
        return <span className="inline-item">{str}</span>
    }
});

Block.Table.Row.MathLetterWidget = React.createClass({
    propTypes: {
        equations: React.PropTypes.string.isRequired,
        letters: React.PropTypes.array.isRequired
    },
    render: function() {
        var ec = this.props.equations.map(function(equation) {
            return <Block.Table.Row.MathWidget equation={equation} />
        });

        var lc = <Block.Table.Row.LettersWidget letters={this.props.letters} />

        return (
            <div>
                {lc}{ec}
            </div>
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


var ProbForm = React.createClass({
    propTypes: {
        onSaveClick: React.PropTypes.func.isRequired
    },
    statics: {
        domId: 'probForm',
        domIdSel: '#probForm'
    },
    render: function() {
        return (
            <div className="modal fade" id={ProbForm.domId} tabindex="-1" role="dialog" labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <ProbForm.Header />
                        <ProbForm.Body />
                        <ProbForm.Footer onSaveClick={this.props.onSaveClick} />
                    </div>
                </div>
            </div>
        )
    }
});

ProbForm.Header = React.createClass({
    render: function() {
        return (
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">New Problem</h4>
            </div>
        )
    }
});

ProbForm.Body = React.createClass({
    getInitialState: function() {
        return {
            type: 'l'
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
                            <option value="l">Letter Sequence</option>
                            <option value="m">Math Equation</option>
                            <option value="ml">Math and Letters</option>
                            <option value="s">Square Sequence</option>
                            <option value="sy">Symmetry</option>
                            <option value="ss">Symmetry and Squares</option>
                            <option value="r">Reading</option>
                            <option value="rl">Reading and Letters</option>
                        </select>
                    </div>
                    <ProbForm.SpecialPane type={this.state.type} />
                </form>
            </div>
        )
    }
});

ProbForm.SpecialPane = React.createClass({
    propTypes: {
        type: React.PropTypes.string.isRequired
    },
    render: function() {
        switch(this.props.type) {
            case 'l':
                return <ProbForm.LPane/>
            case 'm':
                return <ProbForm.MPane/>
            case 'ml':
                return <ProbForm.MLPane/>
            case 's':
                return <div>Squares</div>
            case 'sy':
                return <div>Symmetry</div>
            case 'ss':
                return <ProbForm.SSPane/>
            case 'r':
                return <div>Reading</div>
            case 'rl':
                return <div>Reading and Letters</div>
            default:
                return null;
        }
    }
});

ProbForm.LPane = React.createClass({
    render: function() {
        return (
            <div>
                <div className="form-group">
                    <label for="ml-letters">Letters</label>
                    <input type="text" className="form-control" id="ml-letters" />
                    <div>A sequence of letters. For example: <code>X,Y,Z</code></div>
                </div>
            </div>
        )
    }
});

ProbForm.MPane = React.createClass({
    render: function() {
        return (
            <div>
                <div className="form-group">
                    <label for="ml-equation">Equation</label>
                    <input className="form-control" id="ml-equation"/>
                    <div>An equation, such as <code>(2*2)+2=2</code></div>
                </div>
            </div>
        )
    }
});

ProbForm.MLPane = React.createClass({
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

ProbForm.SPane = React.createClass({
    render: function() {
        return (
            <div>SSPane</div>
        )
    }
});

ProbForm.SSPane = React.createClass({
    render: function() {
        return (
            <div>SSPane</div>
        )
    }
});


ProbForm.Footer = React.createClass({
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