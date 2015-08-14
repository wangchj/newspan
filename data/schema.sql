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

create view TasksIndexView as select taskId, name, createTime, maxScore, (select count(*) from Responses where taskId=Tasks.taskId) as respCount from Tasks;

create view RespIndexView as select responseId, partId, name, datetime, score, maxScore, (score * 1.0 / maxScore) as percentage from Responses inner join Tasks on Responses.taskId=Tasks.taskId;