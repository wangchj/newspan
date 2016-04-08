create table Tasks (
    taskId integer primary key,
    name text not null,
    createTime text not null,
    json text not null,
    maxScore integer not null
);

create table Workers (
    workerId text primary key
);

create table Responses (
    responseId integer primary key,
    taskId integer not null,
    workerId text not null,
    qualId integer not null, -- Qualtrics id
    lang text,
    datetime text not null,
    json text not null,
    score integer not null,
    foreign key (taskId) references Tasks(taskId),
    foreign key (workerId) references Workers(workerId)
);

create view TasksIndexView as select taskId, name, createTime, maxScore, (select count(*) from Responses where taskId=Tasks.taskId) as respCount from Tasks;

create view RespIndexView as select responseId, workerId, qualId, name, datetime, score, maxScore, (score * 1.0 / maxScore) as percentage from Responses inner join Tasks on Responses.taskId=Tasks.taskId;

create view WorkIndexView as select workerId, (select count(*) from Responses where workerId=Workers.workerId) as respCount from Workers;