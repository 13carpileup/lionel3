# Documentation

## Overview

The Lionel 2 student data API piggybacks off of official endpoints to allow applications to easily fetch student data as well as whole school data. It provides endpoints for timetables, names, school bulletins, and school events.


## Endpoints

#### Student Data
**Endpoint**: `GET /students/:id`

**Response**:
```json
{
    "id":9668, 
    "name":"John Macloy",
    "picture":"https://lionel2.kgv.edu.hk/pluginfile.php/98182/user/icon/esfessential2/f3?rev=1",
    "timetable":"9668.ics",
    "year":12,
    "house":"R",
    "tutor":"R27",
    "subjects":["english","spanish"]
}
```
------**TBD**-------

**Endpoint**: `GET /students/timetable/:id`

**Response**:
```json
{
    ...
}
```


**Endpoint**: `GET /students/homework/:id`

**Response**:
```json
{
    ...
}
```


#### School Data


**Endpoint**: `GET /school/bulletin`

**Response**:
```json
{
    ...
}
```


**Endpoint**: `GET /school/calendar`

**Response**:
```json
{
    ...
}
```


**Endpoint**: `GET /school/newsletter`

**Response**:
```json
{
    ...
}
```

