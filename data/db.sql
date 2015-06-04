/**
 * Sqlite 3 database
 */

 create table MathProblems (
    problemId integer primary key,     -- Auto-generated integer key
    problem   text    not null unique, -- Math problem
    answer    boolean not null         -- True means the equation is valid; false otherwise
);

create table LetterSequenceProblems (
    problemId integer primary key,    -- Auto-generated integer key
    sequence  text    not null unique -- An ordered text string representing the sequence.
);

create table SpatialSequenceProblems (
    problemId integer primary key, -- Auto-generated integer key
    width     integer not null,    -- Width of the visual grid
    height    integer not null,    -- Height of the visual grid
    sequence  text    not null     -- A list of ordered pairs in WKT format, eg, "0 0, 1 0, 1 1"
);

create table ReadingProblems (
    problemId integer primary key,     -- Auto-generated integer key
    sentence  text    not null unique, -- Human readable sentence
    answer    boolean not null         -- True if the sentence is semantically correct; false otherwise
);

create table SymmetryProblems (
    problemId integer primary key, -- Auto-generated integer key
    width     integer not null,    -- Width of the visual grid
    height    integer not null,    -- Height of the visual grid
    bitmap    text    not null,    -- Forms the picture using a list of ordered pairs, eg, "0 0, 1 0, 1 1"
    answer    boolean not null     -- True means the picture is symmetric; false otherwise
);

/**
 * A problem set consists of a list of problems.
 */
create table ProblemSets (
    problemSetId integer primary key, -- Auto-generated key
    label        text    not null,    -- Short label of this set
    summary      text    null         -- Description of this set
);

/**
 * Problems of problem sets.
 */
create table ProblemSetItems (
    problemSetId integer not null,
    problemType  text    not null, -- Problem type
    problemId    integer not null, -- Problem ID within each type
    primary key (problemSetId, problemType, problemId),
    foreign key (problemSetId) references ProblemSets(problemSetId)
);

/**
 * A set of answers by a user in response to a problem set.
 */
create table Responses (
    responseId   integer primary key, -- Auto-generated key
    problemSetId integer not null,    -- Problem set corresponds to this answer set
    gender       text    null,        -- Gender of the person. This can be unspecified
    birthdate    text    null,        -- Birth date of the person, in the format 'yyyy-mm-dd'. This can be unspecified
    foreign key (problemSetId) references ProblemSets(problemSetId)
);

/**
 * User responses of problem sets.
 */
create table ResponseItems (
    responseId  integer not null, -- References answer set
    problemType text    not null, -- Problem type
    problemId   integer not null, -- Problem ID within each type
    response    text    not null, -- The response provided by the user, the actual type of this will be mixed.
    primary key (responseId, problemType, problemId),
    foreign key (responseId) references Responses(responseId)
);

