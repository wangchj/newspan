 create table Problems (
    problemId   integer     primary key,    -- Auto-generated integer key
    type        text        not null,       -- The type of the problem
    question    text        not null,       -- Math problem
    solution    text        not null        -- When solution cannot be derived from the question
);

create table Blocks (
    blockId     integer     primary key     -- Auto-generated integer key
);

create table BlockProblems (
    blockId     integer     not null,
    problemId   integer     not null,
    primary key (blockId, problemId),
    foreign key (blockId) references Blocks(blockId),
    foreign key (problemId) references Problems(problemId)
);

create table Tasks (
    taskId      integer     primary key,
);

create table TaskBlocks (
    taskId      integer     not null,
    blockId     integer     not null,
    primary key (taskId, blockId),
    foreign key (taskId) references Tasks(taskId),
    foreign key (blockId) references Blocks(blockId)
);

create table Participant (
    partId      integer     primary key
);

create table Responses (
    responseId  integer     primary key,
    taskId      integer     not null,
    partId      integer     not null,
    datetime    text        not null,
    foreign key (taskId) references Tasks(taskId),
    foreign key (partId) references Participant(partId)
);

create table ProblemResponses (
    responseId  integer     not null,
    blockId     integer     not null,
    problemId   integer     not null,
    response    text        not null,
);
