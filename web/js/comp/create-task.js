var task = [];

var CreateTask = React.createClass({
    getInitialState: function() {
        this.addProb = {
            blockPos: null
        };

        var blocks = this.getBlocksTemplate(taskType);

        return {
            blocks: blocks,
            edProb: null
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
    onProbFormSave: function() {
        console.log('Prob Form Save Click');

        if(this.state.edProb)
            this.probFormSaveEdit();
        else
            this.probFormSaveNew();
        
    },
    probFormSaveNew: function() {
        var type = $(ProbForm.domIdSel + ' #probType').val();
        switch(type) {
            case LS.typeId:
                return this.probFormSaveNewLS();
            case EQ.typeId:
                return this.probFormSaveNewEQ();
            case EQLS.typeId:
                return this.probFormSaveNewEQLS();

            case 'ss':
                break;

        }
    },
    probFormSaveNewLS: function() {
        var str = $(ProbForm.domIdSel + ' #letters').val().trim();

        if(str && str.length > 0) {
            var a = str.split(',').map(function(str){return str.trim()}),
                i = this.addProb.blockPos;

            this.state.blocks[i].push({
                id: this.state.blocks[i].length,
                type: LS.typeId,
                problem: a
            });

            this.setState({blocks: this.state.blocks});
            $(ProbForm.domIdSel).modal('hide');
        }
    },
    probFormSaveNewEQ: function() {
        var eq = $(ProbForm.domIdSel + ' #equation').val().trim();

        if(EQ.isValid(eq)) {
            var i = this.addProb.blockPos;

            this.state.blocks[i].push({
                id: this.state.blocks[i].length,
                type: EQ.typeId,
                problem: eq
            });

            this.setState({blocks: this.state.blocks});
            $(ProbForm.domIdSel).modal('hide');
        }
    },
    probFormSaveNewEQLS: function() {
        var eqStr = $(ProbForm.domIdSel + ' #equations').val().trim();
        var leStr = $(ProbForm.domIdSel + ' #letters').val().trim();

        if(eqStr && leStr) {
            var eq = eqStr.split(',').map(function(str){return str.trim()});
            var le = leStr.split(',').map(function(str){return str.trim()});

            if(eq && eq.length > 0 && le && le.length > 0 && eq.length == le.length) {
                console.log(eq, le);
                var i = this.addProb.blockPos;
                this.state.blocks[i].push({
                    id: this.state.blocks[i].length,
                    type: EQLS.typeId,
                    letters: le,
                    equations: eq
                });
                this.setState({blocks: this.state.blocks});
                $(ProbForm.domIdSel).modal('hide');
            }
        }
    },
    probFormSaveEdit: function() {

    },
    render: function() {
        return (
            <div>
                <BlockList blocks={this.state.blocks} onAddProbClick={this.onAddProbClick} onProbDel={this.onProbDel}/>
                <CreateTask.Buttons onAddBlock={this.addBlock}/>
                <ProbForm prob={this.state.edProb} onSaveClick={this.onProbFormSave}/>
            </div>
        );
    },
    getBlocksTemplate: function(type) {
        switch(type) {
            case 'ospan':
                return [
                    [
                        {id: 0, type: LS.typeId, problem: ['G', 'H']},
                        {id: 1, type: LS.typeId, problem: ['P', 'F', 'D']},
                        {id: 2, type: LS.typeId, problem: ['V', 'R', 'S', 'N']}
                    ],
                    [
                        {id: 0, type: EQ.typeId, problem: '(2*4)+1=5'},
                        {id: 1, type: EQ.typeId, problem: '(24/2)-6=1'},
                        {id: 2, type: EQ.typeId, problem: '(10/2)+2=6'},
                        {id: 3, type: EQ.typeId, problem: '(2*3)-3=3'},
                        {id: 4, type: EQ.typeId, problem: '(2*2)+2=6'},
                        {id: 5, type: EQ.typeId, problem: '(7/7)+7=8'}
                    ],
                    [
                        {
                            id: 0,
                            type: EQLS.typeId,
                            letters: ['G', 'H'],
                            equations: [
                                '(10*2)-10=10',
                                '(1*2)+1=2'
                            ]
                        },
                        {
                            id: 1,
                            type: EQLS.typeId,
                            letters: ['P', 'F', 'D'],
                            equations: [
                                '(5*2)-10=10',
                                '(10*3)+1=15',
                                '(10/5)+5=7'
                            ]
                        },
                        {
                            id: 2,
                            type: EQLS.typeId,
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
        onAddBlock: React.PropTypes.func.isRequired
    },
    onAddBlock: function() {
        this.props.onAddBlock();
    },
    render: function() {
        return (
            <div>
                {
                    //<button className="btn btn-default" onClick={this.onAddBlock}>New Block</button>
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
            return <Block key={index} blockPos={index} block={block} onAddProbClick={this.props.onAddProbClick} onProbDel={this.props.onProbDel}/>
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
                        return <Block.Table.Row key={i} blockPos={this.props.blockPos} problem={p} onProbDel={this.props.onProbDel}/>
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
                <td style={{width:140}}>{this.getProblemTypeName(this.props.problem)}</td>
                <td>{this.getProblemWidget()}</td>
                <td>
                    <button type="button" className="close pull-right" aria-label="Close" onClick={this.onProbDel}><span aria-hidden="true">&times;</span></button>
                </td>
            </tr>
        )
    },
    getProblemTypeName: function(problem) {
        switch(this.props.problem.type) {
            case EQ.typeId: return EQ.typeLabel
            case LS.typeId: return LS.typeLabel
            case EQLS.typeId: return EQLS.typeLabel
            case SQ.typeId: return SQ.typeLabel
            case SY.typeId: return SY.typeLabel
            case SYSQ.typeId: return SYSQ.typeLabel
            case RS.typeId: return RS.typeLabel
            case RSLS.typeId: return RSLS.typeLabel
        }
    },
    getProblemWidget: function() {
        switch(this.props.problem.type) {
            case EQ.typeId:
                return <Block.Table.Row.MathWidget equation={this.props.problem.problem} />
            case LS.typeId:
                return <Block.Table.Row.LettersWidget letters={this.props.problem.problem} />
            case EQLS.typeId:
                return <Block.Table.Row.MathLetterWidget equations={this.props.problem.equations} letters={this.props.problem.letters}/>
            case SQ.typeId:
                return <div>Square widget</div>
            case SY.typeId:
                return <div>Symmetry widget</div>
            case SYSQ.typeId:
                return <div>Symmetry squares widget</div>
            case RS.typeId:
                return <div>Sentence widget</div>
            case RSLS.typeId:
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
        equations: React.PropTypes.array.isRequired,
        letters: React.PropTypes.array.isRequired
    },
    render: function() {
        var ec = this.props.equations.map(function(equation, i) {
            return <Block.Table.Row.MathWidget key={i} equation={equation} />
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
        prob: React.PropTypes.object,
        onSaveClick: React.PropTypes.func.isRequired
    },
    statics: {
        domId: 'probForm',
        domIdSel: '#probForm'
    },
    render: function() {
        return (
            <div className="modal fade" id={ProbForm.domId} tabIndex="-1" role="dialog" labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <ProbForm.Header prob={this.props.prob}/>
                        <ProbForm.Body prob={this.props.prob}/>
                        <ProbForm.Footer onSaveClick={this.props.onSaveClick} />
                    </div>
                </div>
            </div>
        )
    }
});

ProbForm.Header = React.createClass({
    propTypes: {
        prob: React.PropTypes.object
    },
    render: function() {
        return (
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                {
                    this.props.prob ? 
                        <h4 className="modal-title" id="myModalLabel">New Problem</h4> :
                        <h4 className="modal-title" id="myModalLabel">Edit Problem</h4>
                }
            </div>
        )
    }
});

ProbForm.Body = React.createClass({
    propTypes: {
        prob: React.PropTypes.object
    },
    getInitialState: function() {
        return {
            type: LS.typeId
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
                    {
                        this.props.prob ? null :
                        <div className="form-group">
                            <label htmlFor="probType">Type</label>
                            <select className="form-control" id="probType" onChange={this.onTypeChange}>
                                <option value={LS.typeId}>Letter Sequence</option>
                                <option value={EQ.typeId}>Math Equation</option>
                                <option value={EQLS.typeId}>Math and Letters</option>
                                <option value={SQ.typeId}>Square Sequence</option>
                                <option value={SY.typeId}>Symmetry</option>
                                <option value={SYSQ.typeId}>Symmetry and Squares</option>
                                <option value={RS.typeId}>Reading</option>
                                <option value={RSLS.typeId}>Reading and Letters</option>
                            </select>
                        </div>
                    }

                    <ProbForm.SpecialPane prob={this.props.prob} type={this.props.prob ? this.props.prob.type : this.state.type} />
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
            case LS.typeId:
                return <ProbForm.LSPane/>
            case EQ.typeId:
                return <ProbForm.EQPane/>
            case EQLS.typeId:
                return <ProbForm.EQLSPane/>
            case SQ.typeId:
                return <ProbForm.SQPane/>
            case SY.typeId:
                return <ProbForm.SYPane/>
            case SYSQ.typeId:
                return <ProbForm.SYSQPane/>
            case RS.typdId:
                return <ProbForm.RSPane/>
            case RSLS.typeId:
                return <ProbForm.RSLSPane/>
            default:
                return null;
        }
    }
});

ProbForm.LSPane = React.createClass({
    render: function() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="letters">Letters</label>
                    <input type="text" className="form-control" id="letters" />
                    <div>A sequence of letters. For example: <code>X,Y,Z</code></div>
                </div>
            </div>
        )
    }
});

ProbForm.EQPane = React.createClass({
    render: function() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="equation">Equation</label>
                    <input className="form-control" id="equation"/>
                    <div>An equation, such as <code>(2*2)+2=2</code></div>
                </div>
            </div>
        )
    }
});

ProbForm.EQLSPane = React.createClass({
    render: function() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="equations">Equations</label>
                    <textarea className="form-control" id="equations"></textarea>
                    <div>Equations separated by commas <code>,</code>. For example: <code>(2*2)+2=2, (4/2)-1=1</code></div>
                </div>
                <div className="form-group">
                    <label htmlFor="letters">Letters</label>
                    <input type="text" className="form-control" id="letters" />
                    <div>A sequence of letters. For example: <code>X,Y,Z</code></div>
                </div>
            </div>
        )
    }
});

ProbForm.SQPane = React.createClass({
    render: function() {
        return (
            <div>Squares</div>
        )
    }
});

ProbForm.SYPane = React.createClass({
    render: function() {
        return (
            <div>Symmetry</div>
        )
    }
});

ProbForm.SYSQPane = React.createClass({
    render: function() {
        return (
            <div>Symmetry Square</div>
        )
    }
});

ProbForm.RSPane = React.createClass({
    render: function() {
        return (
            <div>Reading Sentence</div>
        )
    }
});

ProbForm.RSLSPane = React.createClass({
    render: function() {
        return (
            <div>Reading Sentence and Letters</div>
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