create table Tasks (
    taskId integer primary key,
    name text not null,
    createTime text not null,
    json text not null,
    maxScore integer not null
);

create table Participants (
    partId integer primary key
);

create table Responses (
    responseId integer primary key,
    taskId integer not null,
    partId integer not null,
    datetime text not null,
    json text not null,
    score integer not null,
    foreign key (taskId) references Tasks(taskId),
    foreign key (partId) references Participants(partId)
);