/**
 * Sqlite 3 database
 */

create table Users (
    userId   integer     primary key, -- auto-increment by default
    userName varchar(30) null unique, -- unique, max_len = 30
    forename text        not null,    -- User's first name
    surname  text        not null,    -- User's last name
    gender   text        not null,    -- User's gender
    email    text        not null,    -- User's email, also used as log-in id
    password text        not null,    -- Salted password hash
    picture  text        null,        -- Url of profile picture
    authKey  text        not null     -- Yii Framework authentication key
);

 create table MathProblems (
    problemId integer primary key,     -- Auto-generated integer key
    question  text    not null unique, -- Math problem
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
create table SetProblems (
    problemSetId integer not null,
    problemType  text    not null, -- Problem type
    problemId    integer not null, -- Problem ID within each type
    primary key (problemSetId, problemType, problemId),
    foreign key (problemSetId) references ProblemSets(problemSetId)
);

/**
 * A set of answers by a user in response to a problem set.
 */
create table AnswerSets (
    answerSetId  integer primary key, -- Auto-generated key
    problemSetId integer not null,    -- Problem set corresponds to this answer set
    userId       integer not null,    -- User id of the user who answered the question
    foreign key (problemSetId) references ProblemSets(problemSetId),
    foreign key (userId) references User(userId)
);

/**
 * Answers of problem sets.
 */
create table SetAnswers (
    answerSetId integer not null, -- References answer set
    problemType text    not null, -- Problem type
    problemId   integer not null, -- Problem ID within each type
    answer      text    not null, -- The answer provided by the user, the actual type of this will be mixed.
    primary key (answerSetId, problemType, problemId),
    foreign key (answerSetId) references AnswerSets(answerSetId)
);

