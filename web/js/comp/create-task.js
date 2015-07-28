var task = [];

var CreateTask = React.createClass({
    statics: {
        editMode: {add: 0, edit: 1}
    },
    getInitialState: function() {
        var blocks = this.getBlocksTemplate(taskType);

        return {
            blocks: blocks,
            //Edit problem context {mode, prob, blockId, probId, subId, ssubId}
            editContext: {mode: CreateTask.editMode.add}
        };
    },
    addBlock: function() {
        this.state.blocks.push([]);
        this.setState({blocks: this.state.blocks});
    },
    /**
     * @param mode integer One of values of editMode.
     * @param blockId integer Position of the block.
     * @param probId integer Position of the problem in the block.
     * @param subid integer  Sub id
     * @param ssubid integer Sub-sub id
     */
    showProbForm: function(mode, blockId, probId, subId, ssubId) {
        if(mode == CreateTask.editMode.add) {
            this.setState({editContext:{mode: CreateTask.editMode.add, blockId: blockId}});
            $(ProbForm.domIdSel).modal('show');
        }
        else {
            var block = this.state.blocks[blockId];
            var prob = block[probId];
            var ec = {
                mode: CreateTask.editMode.edit,
                blockId: blockId,
                probId: probId,
                subId: subId,
                ssubId: ssubId
            };

            switch(prob.type) {
                case EQLS.typeId:
                    prob = subId == 0 ? {type: LS.typeId, letters: prob.letters} : {type: EQ.typeId, equation: prob.equations[ssubId]};
                    break;
                case SYSQ.typeId:
                    prob = subId == 0 ? {type: SQ.typeId, sequence: prob.sequence} : {type: SY.typeId, symmetry: prob.symmetries[ssubId]};
                    break;
                case RSLS.typeId:
                    //TODO
                    //prob = subId == 0 ? {type: LS.typeId, letters: prob.letters} : {type: RS.typeId, sentence: prop.sentences[ssubId]}
                    break;
            }

            ec.prob = prob;

            this.setState({editContext: ec});
            $(ProbForm.domIdSel).modal('show');
        }
    },
    onAddProbClick: function(blockId) {
        this.showProbForm(CreateTask.editMode.add, blockId);
    },
    onProbEdit: function(blockId, probId, subId, ssubId) {
        this.showProbForm(CreateTask.editMode.edit, blockId, probId, subId, ssubId);
    },
    onProbDel: function(blockId, probId) {
        var block = this.state.blocks[blockId];
        block.splice(probId, 1);
        for(var i = 0; i < this.state.blocks[blockId].length; i++)
            this.state.blocks[blockId][i].id = i;
        this.setState({blocks:this.state.blocks});
    },
    onProbFormSave: function() {
        if(this.state.editContext.mode === CreateTask.editMode.add)
            this.probFormSaveNew();
        else
            this.probFormSaveEdit();  
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
            case SQ.typeId:
                return this.probFormSaveNewSQ();
            case SY.typeId:
                return this.probFormSaveNewSY();
            case SYSQ.typeId:
                return this.probFormSaveNewSYSQ();
        }
    },
    probFormSaveNewLS: function() {
        var str = $(ProbForm.domIdSel + ' #letters').val().trim();

        if(str && str.length > 0) {
            var a = str.split(',').map(function(str){return str.trim()}),
                i = this.state.editContext.blockId;

            this.state.blocks[i].push({
                id: this.state.blocks[i].length,
                type: LS.typeId,
                letters: a
            });

            this.setState({blocks: this.state.blocks});
            $(ProbForm.domIdSel).modal('hide');
        }
    },
    probFormSaveNewEQ: function() {
        var eq = $(ProbForm.domIdSel + ' #equation').val().trim();

        if(EQ.isValid(eq)) {
            var i = this.state.editContext.blockId;

            this.state.blocks[i].push({
                id: this.state.blocks[i].length,
                type: EQ.typeId,
                equation: eq
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
                var i = this.state.editContext.blockId;
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
    probFormSaveNewSQ: function() {
        var editContext = this.state.editContext;
        var blockId = editContext.blockId;
        var json = $(ProbForm.domIdSel + ' #squares').val().trim();
        this.state.blocks[blockId].push({
            id: this.state.blocks[blockId].length,
            type: SQ.typeId,
            squares: JSON.parse(json)
        });
        this.setState({blocks: this.state.blocks});
        $(ProbForm.domIdSel).modal('hide');
    },
    probFormSaveNewSY: function(){
        var editContext = this.state.editContext;
        var blockId = editContext.blockId;
        var json = $(ProbForm.domIdSel + ' #symmetry').val().trim();
        this.state.blocks[blockId].push({
            id: this.state.blocks[blockId].length,
            type: SY.typeId,
            symmetry: JSON.parse(json)
        });
        this.setState({blocks: this.state.blocks});
        $(ProbForm.domIdSel).modal('hide');
    },
    probFormSaveEdit: function() {
        var editContext = this.state.editContext;
        var block = this.state.blocks[editContext.blockId];
        var prob = block[editContext.probId];

        switch(prob.type) {
            case LS.typeId:
                return this.probFormSaveEditLS();
            case EQ.typeId:
                return this.probFormSaveEditEQ();
            case EQLS.typeId:
                return this.probFormSaveEditEQLS();
            case SQ.typeId:
                return this.probFormSaveEditSQ();
            case SY.typeId:
                return this.probFormSaveEditSY();
            case SYSQ.typeId:
                return this.probFormSaveEditSYSQ();
            case RS.typeId:
                return this.probFormSaveEditRS();
            case RSLS.typeId:
                return this.probFormSaveEditRSLS();
        }
    },
    probFormSaveEditLS: function() {
        var editContext = this.state.editContext;
        var blockId = editContext.blockId;
        var probId = editContext.probId;

        var str = $(ProbForm.domIdSel + ' #letters').val().trim();
        
        if(str && str.length > 0) {
            var a = str.split(',').map(function(str){return str.trim()});
            if(a.length > 0) {
                this.state.blocks[blockId][probId].letters = a;
                this.setState({blocks: this.state.blocks});
                $(ProbForm.domIdSel).modal('hide');
            }
        }
    },
    probFormSaveEditEQ: function() {
        var editContext = this.state.editContext;
        var blockId = editContext.blockId;
        var probId = editContext.probId;
        var equation = $(ProbForm.domIdSel + ' #equation').val().trim();

        if(EQ.isValid(equation)) {
            this.state.blocks[blockId][probId].equation = equation;
            this.setState({blocks: this.state.blocks});
            $(ProbForm.domIdSel).modal('hide');
        }
    },
    probFormSaveEditEQLS: function() {
        var editContext = this.state.editContext;
        var blockId = editContext.blockId;
        var probId = editContext.probId;
        var subId = editContext.subId;
        var ssubId = editContext.ssubId;

        //This feature is currently not supported, so we just return.
        if(subId == null || subId == undefined) return;

        //Edit letters
        if(subId == 0) {
            this.probFormSaveEditLS();
        }
        //Edit one of the equations
        else if(subId == 1) {
            var equation = $(ProbForm.domIdSel + ' #equation').val().trim();

            if(EQ.isValid(equation)) {
                this.state.blocks[blockId][probId].equations[ssubId] = equation;
                this.setState({blocks: this.state.blocks});
                $(ProbForm.domIdSel).modal('hide');
            }
        }
    },
    probFormSaveEditSQ: function() {
        var editContext = this.state.editContext;
        var blockId = editContext.blockId;
        var probId = editContext.probId;
        var json = $(ProbForm.domIdSel + ' #squares').val().trim();
        this.state.blocks[blockId][probId].squares = JSON.parse(json);
        this.setState({blocks: this.state.blocks});
        $(ProbForm.domIdSel).modal('hide');
    },
    probFormSaveEditSY: function() {
        var editContext = this.state.editContext;
        var blockId = editContext.blockId;
        var probId = editContext.probId;
        var json = $(ProbForm.domIdSel + ' #symmetry').val().trim();
        this.state.blocks[blockId][probId].squares = JSON.parse(json);
        this.setState({blocks: this.state.blocks});
        $(ProbForm.domIdSel).modal('hide');
    },
    probFormSaveEditSYSQ: function() {

    },
    probFormSaveEditRS: function() {

    },
    probFormSaveEditRSLS: function() {

    },
    render: function() {
        return (
            <div>
                <BlockList blocks={this.state.blocks} onAddProbClick={this.onAddProbClick} onProbEdit={this.onProbEdit} onProbDel={this.onProbDel}/>
                <CreateTask.Buttons onAddBlock={this.addBlock}/>
                <ProbForm editContext={this.state.editContext} onSaveClick={this.onProbFormSave}/>
            </div>
        );
    },
    getBlocksTemplate: function(type) {
        switch(type) {
            case 'ospan':
                return [
                    [
                        {id: 0, type: LS.typeId, letters: ['G', 'H']},
                        {id: 1, type: LS.typeId, letters: ['P', 'F', 'D']},
                        {id: 2, type: LS.typeId, letters: ['V', 'R', 'S', 'N']}
                    ],
                    [
                        {id: 0, type: EQ.typeId, equation: '(2*4)+1=5'},
                        {id: 1, type: EQ.typeId, equation: '(24/2)-6=1'},
                        {id: 2, type: EQ.typeId, equation: '(10/2)+2=6'},
                        {id: 3, type: EQ.typeId, equation: '(2*3)-3=3'},
                        {id: 4, type: EQ.typeId, equation: '(2*2)+2=6'},
                        {id: 5, type: EQ.typeId, equation: '(7/7)+7=8'}
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
                    [],[],[]
                ];
            case 'sspan':
                return [
                    [
                        {id: 0, type: SQ.typeId, squares: SQ.makeRandomFigure(2)},
                        {id: 1, type: SQ.typeId, squares: SQ.makeRandomFigure(3)},
                        {id: 2, type: SQ.typeId, squares: SQ.makeRandomFigure(4)}
                    ],
                    [
                        {id: 0, type: SY.typeId, symmetry: SY.makeFigure()},
                        {id: 1, type: SY.typeId, symmetry: SY.makeFigure()},
                        {id: 2, type: SY.typeId, symmetry: SY.makeFigure()}
                    ],
                    [
                        {id: 0, type: SYSQ.typeId, squares: SQ.makeRandomFigure(2), symmetries: SYSQ.makeSymmetryFigures(2)},
                        {id: 1, type: SYSQ.typeId, squares: SQ.makeRandomFigure(3), symmetries: SYSQ.makeSymmetryFigures(3)},
                        {id: 2, type: SYSQ.typeId, squares: SQ.makeRandomFigure(4), symmetries: SYSQ.makeSymmetryFigures(4)}
                    ],
                    [
                        {id: 0, type: SYSQ.typeId, squares: SQ.makeRandomFigure(3), symmetries: SYSQ.makeSymmetryFigures(3)},
                        {id: 1, type: SYSQ.typeId, squares: SQ.makeRandomFigure(4), symmetries: SYSQ.makeSymmetryFigures(4)},
                        {id: 1, type: SYSQ.typeId, squares: SQ.makeRandomFigure(5), symmetries: SYSQ.makeSymmetryFigures(5)},
                        {id: 1, type: SYSQ.typeId, squares: SQ.makeRandomFigure(6), symmetries: SYSQ.makeSymmetryFigures(6)},
                        {id: 2, type: SYSQ.typeId, squares: SQ.makeRandomFigure(7), symmetries: SYSQ.makeSymmetryFigures(7)}
                    ],
                    [
                        {id: 0, type: SYSQ.typeId, squares: SQ.makeRandomFigure(3), symmetries: SYSQ.makeSymmetryFigures(3)},
                        {id: 1, type: SYSQ.typeId, squares: SQ.makeRandomFigure(4), symmetries: SYSQ.makeSymmetryFigures(4)},
                        {id: 1, type: SYSQ.typeId, squares: SQ.makeRandomFigure(5), symmetries: SYSQ.makeSymmetryFigures(5)},
                        {id: 1, type: SYSQ.typeId, squares: SQ.makeRandomFigure(6), symmetries: SYSQ.makeSymmetryFigures(6)},
                        {id: 2, type: SYSQ.typeId, squares: SQ.makeRandomFigure(7), symmetries: SYSQ.makeSymmetryFigures(7)}
                    ],
                    [
                        {id: 0, type: SYSQ.typeId, squares: SQ.makeRandomFigure(3), symmetries: SYSQ.makeSymmetryFigures(3)},
                        {id: 1, type: SYSQ.typeId, squares: SQ.makeRandomFigure(4), symmetries: SYSQ.makeSymmetryFigures(4)},
                        {id: 1, type: SYSQ.typeId, squares: SQ.makeRandomFigure(5), symmetries: SYSQ.makeSymmetryFigures(5)},
                        {id: 1, type: SYSQ.typeId, squares: SQ.makeRandomFigure(6), symmetries: SYSQ.makeSymmetryFigures(6)},
                        {id: 2, type: SYSQ.typeId, squares: SQ.makeRandomFigure(7), symmetries: SYSQ.makeSymmetryFigures(7)}
                    ]
                ];
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
        onProbEdit: React.PropTypes.func.isRequired,
        onProbDel: React.PropTypes.func.isRequired
    },
    render: function() {
        var blocks = this.props.blocks.map(function(block, index){
            return <Block key={index} blockId={index} block={block} onAddProbClick={this.props.onAddProbClick} onProbEdit={this.props.onProbEdit} onProbDel={this.props.onProbDel}/>
        }.bind(this));

        return <div>{blocks}</div>
    }
});

var Block = React.createClass({
    propTypes: {
        blockId: React.PropTypes.number.isRequired,
        block: React.PropTypes.array.isRequired,
        onAddProbClick: React.PropTypes.func.isRequired,
        onProbEdit: React.PropTypes.func.isRequired,
        onProbDel: React.PropTypes.func.isRequired
    },
    onProbEdit: function(blockId, probId, subId, ssubId) {
        this.props.onProbEdit(this.props.blockId, probId, subId, ssubId);
    },
    render: function() {
        return (
            <div className="panel panel-default">
                <Block.Heading blockId={this.props.blockId} />
                <Block.Body blockId={this.props.blockId} block={this.props.block} onProbEdit={this.onProbEdit} onProbDel={this.props.onProbDel}/>
                <Block.Footer blockId={this.props.blockId} onAddProbClick={this.props.onAddProbClick}/>
            </div>
        )
    }
});


Block.Heading = React.createClass({
    propTypes: {
        blockId: React.PropTypes.number.isRequired
    },
    render: function() {
        return (
            <div className="panel-heading">
                <h2 className="panel-title">Block {this.props.blockId + 1}</h2>
            </div>
        )
    }
});

Block.Body = React.createClass({
    propTypes: {
        blockId: React.PropTypes.number.isRequired,
        block: React.PropTypes.array.isRequired,
        onProbEdit: React.PropTypes.func.isRequired,
        onProbDel: React.PropTypes.func.isRequired
    },
    render: function() {
        var res = this.props.block.length > 0 ?
            <Block.Table blockId={this.props.blockId} block={this.props.block} onProbEdit={this.props.onProbEdit} onProbDel={this.props.onProbDel} /> :
            <div className="panel-body">There is currently no problem in this block.</div>
        return res;
    }
});

Block.Table = React.createClass({
    propTypes: {
        blockId: React.PropTypes.number.isRequired,
        block: React.PropTypes.array.isRequired,
        onProbEdit: React.PropTypes.func.isRequired,
        onProbDel: React.PropTypes.func.isRequired
    },
    render: function() {
        return (
            <table className="table">
                <tbody>
                    {this.props.block.map(function(p, i){
                        return <Block.Table.Row key={i} blockId={this.props.blockId} problem={p} onProbEdit={this.props.onProbEdit} onProbDel={this.props.onProbDel}/>
                    }.bind(this))}
                </tbody>
            </table>
        )
    }
});

Block.Table.Row = React.createClass({
    propTypes: {
        blockId: React.PropTypes.number.isRequired,
        problem: React.PropTypes.object.isRequired,
        onProbEdit: React.PropTypes.func.isRequired,
        onProbDel: React.PropTypes.func.isRequired
    },
    onProbEdit: function(blockId, probId, subId, ssubId) {
        this.props.onProbEdit(null, this.props.problem.id, subId, ssubId);
    },
    onProbDel: function() {
        this.props.onProbDel(this.props.blockId, this.props.problem.id);
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
                return <Block.Table.Row.MathWidget onProbEdit={this.onProbEdit} equation={this.props.problem.equation} />
            case LS.typeId:
                return <Block.Table.Row.LettersWidget onProbEdit={this.onProbEdit} letters={this.props.problem.letters} />
            case EQLS.typeId:
                return <Block.Table.Row.MathLetterWidget onProbEdit={this.onProbEdit} equations={this.props.problem.equations} letters={this.props.problem.letters}/>
            case SQ.typeId:
                return <Block.Table.Row.SquaresWidget squares={this.props.problem.squares} onProbEdit={this.onProbEdit}/>
            case SY.typeId:
                return <Block.Table.Row.SymmetryWidget symmetry={this.props.problem.symmetry} onProbEdit={this.onProbEdit}/>
            case SYSQ.typeId:
                return <Block.Table.Row.SymmetrySquaresWidget squares={this.props.problem.squares} symmetries={this.props.problem.symmetries}/>
            case RS.typeId:
                return <div>Sentence widget</div>
            case RSLS.typeId:
                return <div>Sentence letter widget</div>
        }
    }
});

Block.Table.Row.MathWidget = React.createClass({
    propTypes: {
        equation: React.PropTypes.string.isRequired,
        onProbEdit: React.PropTypes.func.isRequired
    },
    render: function() {
        return <span className="inline-item" style={{cursor:'pointer'}} onClick={this.props.onProbEdit.bind(null, null, null, null, null)}>{this.props.equation}</span>
    }
});

Block.Table.Row.LettersWidget = React.createClass({
    propTypes: {
        letters: React.PropTypes.array.isRequired,
        onProbEdit: React.PropTypes.func.isRequired
    },
    render: function() {
        var str = this.props.letters.toString().replace(/,/g, ', ');
        return <span className="inline-item" style={{cursor:'pointer'}} onClick={this.props.onProbEdit.bind(null, null, null, null, null)}>{str}</span>
    }
});

Block.Table.Row.MathLetterWidget = React.createClass({
    propTypes: {
        equations: React.PropTypes.array.isRequired,
        letters: React.PropTypes.array.isRequired,
        onProbEdit: React.PropTypes.func.isRequired
    },
    render: function() {
        var lc = <Block.Table.Row.LettersWidget letters={this.props.letters} onProbEdit={this.props.onProbEdit.bind(null, null, null, 0, null)}/>

        var ec = this.props.equations.map(function(equation, i) {
            return <Block.Table.Row.MathWidget key={i} equation={equation} onProbEdit={this.props.onProbEdit.bind(null, null, null, 1, i)}/>
        }.bind(this));

        return (
            <div>
                {lc}{ec}
            </div>
        )
    }
});

Block.Table.Row.SquaresWidget = React.createClass({
    propTypes: {
        squares: React.PropTypes.array.isRequired,
        onProbEdit: React.PropTypes.func.isRequired
    },
    render: function() {
        return <Block.Table.Row.SquaresWidget.Figure squares={this.props.squares} onProbEdit={this.props.onProbEdit}/>
    }
});

Block.Table.Row.SquaresWidget.Figure = React.createClass({
    propTypes: {
        squares: React.PropTypes.array.isRequired,
        onProbEdit: React.PropTypes.func.isRequired
    },
    onClick: function() {
        this.props.onProbEdit(null, null, null, null);
    },
    render: function() {
        var text = this.props.squares.map(function(cell, i){
            return {loc: cell, text: i + 1};
        });

        return (
            <div style={{display:'inline-block', width:100, marginRight:15}}>
                <BoxSequence.Slide.Figure class="row-figure" rows={4} cols={4} cellText={text} onCellClick={this.onClick}/>
            </div>
        );
    }
});

Block.Table.Row.SymmetryWidget = React.createClass({
    propTypes: {
        symmetry: React.PropTypes.array.isRequired,
        onProbEdit: React.PropTypes.func.isRequired
    },
    render: function() {
        return <Block.Table.Row.SymmetryWidget.Figure symmetry={this.props.symmetry} onProbEdit={this.props.onProbEdit}/>
    }
});

Block.Table.Row.SymmetryWidget.Figure = React.createClass({
    propTypes: {
        symmetry: React.PropTypes.array.isRequired,
        onProbEdit: React.PropTypes.func.isRequired
    },
    onClick: function() {
        this.props.onProbEdit(null, null, null, null);
    },
    render: function() {
        return (
            <div style={{display:'inline-block', width:100, marginRight:15, marginBottom:8, marginTop:8}}>
                <BoxSequence.Slide.Figure class="row-figure" rows={8} cols={8} colored={this.props.symmetry} borderColor={'#000'} hiColor={'#000'} onCellClick={this.onClick}/>
                <div style={{textAlign:'center', width:'100%', fontSize:12}}>{SY.isSymmetric(this.props.symmetry) ? 'Symmetric' : 'Asymmetric'}</div>
            </div>
        );
    }
});

Block.Table.Row.SymmetrySquaresWidget = React.createClass({
    propTypes: {
        squares: React.PropTypes.array.isRequired,
        symmetries: React.PropTypes.array.isRequired
    },
    render: function() {
        var squares = <Block.Table.Row.SquaresWidget.Figure squares={this.props.squares}/>

        var symmetries = this.props.symmetries.map(function(symmetry, i) {
            return <Block.Table.Row.SymmetryWidget.Figure key={i} symmetry={symmetry}/>
        }.bind(this));

        return (
            <div>
                <div style={{display:'inline-block'}}>{squares}<div dangerouslySetInnerHTML={{__html: '&nbsp;'}}/></div>
                {symmetries}
            </div>
        );
    }
});

Block.Footer = React.createClass({
    propTypes: {
        blockId: React.PropTypes.number.isRequired,
        onAddProbClick: React.PropTypes.func.isRequired
    },
    onAddProbClick: function() {
        this.props.onAddProbClick(this.props.blockId);
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
        editContext: React.PropTypes.object.isRequired,
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
                        <ProbForm.Header editContext={this.props.editContext}/>
                        <ProbForm.Body editContext={this.props.editContext}/>
                        <ProbForm.Footer onSaveClick={this.props.onSaveClick} />
                    </div>
                </div>
            </div>
        )
    }
});

ProbForm.Header = React.createClass({
    propTypes: {
        editContext: React.PropTypes.object.isRequired
    },
    render: function() {
        return (
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                {
                    this.props.editContext.mode === CreateTask.editMode.add ? 
                        <h4 className="modal-title" id="myModalLabel">New Problem</h4> :
                        <h4 className="modal-title" id="myModalLabel">Edit Problem</h4>
                }
            </div>
        )
    }
});

ProbForm.Body = React.createClass({
    propTypes: {
        editContext: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            type: LS.typeId
        }
    },
    onTypeChange: function(event) {
        this.setState({type: event.target.value});
    },
    render: function() {
        return (
            <div className="modal-body">
                <form>
                    {
                        this.props.editContext.mode === CreateTask.editMode.edit ? null :
                        <div className="form-group">
                            <label htmlFor="probType">Type</label>
                            <select className="form-control" id="probType" value={this.state.type} onChange={this.onTypeChange}>
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

                    <ProbForm.SpecialPane editContext={this.props.editContext} type={this.props.editContext.mode === CreateTask.editMode.add ? this.state.type : this.props.editContext.prob.type}/>
                </form>
            </div>
        )
    }
});

ProbForm.SpecialPane = React.createClass({
    propTypes: {
        type: React.PropTypes.string.isRequired,
        editContext: React.PropTypes.object.isRequired
    },
    render: function() {
        switch(this.props.type) {
            case LS.typeId:
                return <ProbForm.LSPane editContext={this.props.editContext}/>
            case EQ.typeId:
                return <ProbForm.EQPane editContext={this.props.editContext}/>
            case EQLS.typeId:
                return <ProbForm.EQLSPane/>
            case SQ.typeId:
                return <ProbForm.SQPane editContext={this.props.editContext}/>
            case SY.typeId:
                return <ProbForm.SYPane editContext={this.props.editContext}/>
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
    propTypes: {
        editContext: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {val: this.props.editContext.prob ? this.props.editContext.prob.letters : ''};
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({val: nextProps.editContext.prob ? nextProps.editContext.prob.letters : ''});
    },
    onChange: function(event) {
        this.setState({val: event.target.value});
    },
    render: function() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="letters">Letters</label>
                    <input type="text" className="form-control" id="letters" value={this.state.val} onChange={this.onChange}/>
                    <div>A sequence of letters. For example: <code>X,Y,Z</code></div>
                </div>
            </div>
        )
    }
});

ProbForm.EQPane = React.createClass({
    propTypes: {
        editContext: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {val: this.props.editContext.prob ? this.props.editContext.prob.equation : ''};
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({val: nextProps.editContext.prob ? nextProps.editContext.prob.equation : ''});
    },
    onChange: function(event) {
        this.setState({val: event.target.value});
    },
    render: function() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="equation">Equation</label>
                    <input className="form-control" id="equation" value={this.state.val} onChange={this.onChange}/>
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
    propTypes: {
        editContext: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        var slots = new Array(4 * 4);
        
        if(this.props.editContext.prob)
            for(var i = 0; i < this.props.editContext.prob.squares.length; i++)
                slots[i] = this.props.editContext.prob.squares[i];

        return {slots: slots};
    },
    componentWillReceiveProps: function(nextProps) {
        var slots = new Array(4 * 4);
        
        if(nextProps.editContext.prob)
            for(var i = 0; i < nextProps.editContext.prob.squares.length; i++)
                slots[i] = nextProps.editContext.prob.squares[i];

        this.setState({slots: slots});
    },
    onCellClick: function(cell) {
        var index = PointCollection.indexOf(this.state.slots, cell);
        var slots = this.state.slots;

        if(index == -1) {
            for(var i = 0; i < slots.length; i++) {
                if(!slots[i]) {
                    slots[i] = cell;
                    this.setState({slots: slots});
                    break;
                }
            }
        }
        else {
            slots[index] = null;
            this.setState({slots: slots});
        }
    },
    render: function() {
        var slots = this.state.slots,
            cellText = [],
            trunc = [];

        for(var i = 0; i < slots.length; i++)
            cellText.push({loc: slots[i], text: i + 1});

        for(var i = 0; i < slots.length; i++)
            if(slots[i])
                trunc.push(slots[i]);

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-6 col-xs-offset-3">
                        <input type="hidden" id="squares" value={JSON.stringify(trunc)}/>
                        <BoxSequence.Slide.Figure rows={4} cols={4} cellText={cellText} onCellClick={this.onCellClick}/>
                    </div>
                </div>
            </div>
        )
    }
});

ProbForm.SYPane = React.createClass({
    propTypes: {
        editContext: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        var colored = this.props.editContext.prob ? this.props.editContext.prob.symmetry : [];
        return {colored: colored};
    },
    componentWillReceiveProps: function(nextProps) {
        var colored = nextProps.editContext.prob ? nextProps.editContext.prob.symmetry : [];
        this.setState({colored: colored});
    },
    onCellClick: function(cell) {
        var i = PointCollection.indexOf(this.state.colored, cell);
        if(i == -1)
            this.state.colored.push(cell);
        else
            this.state.colored.splice(i, 1);
        this.setState({colored: this.state.colored});
    },
    render: function() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-6 col-xs-offset-3">
                        <input type="hidden" id="symmetry" value={JSON.stringify(this.state.colored)}/>
                        <BoxSequence.Slide.Figure rows={8} cols={8} colored={this.state.colored} borderColor={'#000'} hiColor={'#000'} onCellClick={this.onCellClick}/>
                    </div>
                </div>
            </div>
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