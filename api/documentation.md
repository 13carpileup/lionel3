# Documentation

## Overview

The Lionel 2 student data API piggybacks off of official endpoints to allow applications to easily fetch student data as well as whole school data. It provides endpoints for timetables, names, school bulletins, and school events.

To fetch some student information, you must first verify your hash value (the weird value you can see in your lionel API links). This API verifies your hash by attempting to retrieve your homework data. A correct match will successfully fetch your homework, whereas an invalid match will return an empty string. Once verified, your student data is stored in the backend, allowing for use of all endpoints.


## Endpoints

#### Student Data

**Endpoint**: `POST /verify/:id`
**Payload**:
```json
{
    "lionel_string": "example hash"
}
```
**Response**:
```json
{
    true //returns true if id matches hash (will then push to student data), false otherwise
}
```

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


**Endpoint**: `GET /students/timetable/:id`
**Response**:
```json
{
    [
        [
            {
                "id":	"12SP501\r",
                "location":	"LA204\r",
                "subject":	"Spanish",
                "period":	1
            }
            x 5...
        ]
        x 10...
    ]
}
```
*Return Type: vec<vec<Class, 5>, 10>*

**Endpoint**: `GET /students/homework/:id`
**Response**:
```json
[
    {
        "class":	"Y:SELF\r",
        "due_date":	"09/07/2024", // d/m/y
        "text":	"<p>new - click to edit</p>\\n\r",
        "time":	"N/A" // suggested teacher time to complete
    } ...
]
```
*Return Type: vec<entry>*




#### School Data


**Endpoint**: `GET /school/bulletin`
**Response**:
```json
[
    {
        "tagline": "KGVMUN II",
        "text": "<p>KGVMUN II IS COMING!! MUN is... (etc)</p>"
        "author": "Ariel",
        "target": false, // true if there is some targetted audience (like rowell or smth)
        "target_aud": "<i><br>Sent to Students,Parents</i>" // may reformat this later (ceebs)
    }, ...
]
```
*Return Type: vec<bulletin_entry>*
------**TBD**-------


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

