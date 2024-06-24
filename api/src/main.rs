// imports
use axum::{
    extract::{Json, Path},
    routing::get,
    Router,
};

use serde::{Deserialize, Serialize};
use std::fs;
use substring::Substring; //don't wanna implement that
use tower_http::{cors::CorsLayer, trace::TraceLayer};

// baby structs
#[derive(Deserialize, Serialize, Debug, Clone)]
struct Student {
    id: u64,
    name: String,
    picture: String,
    timetable: String,
    year: u8, //7-13
    house: char, // R/N/C/U
    tutor: String,
    subjects: Vec<String>
}

struct Class {
    id: String,
    location: String,
    subject: String
}



// -----------------
// STUDENT GETTERS
// -----------------

//student list
fn all_students() -> Vec<Student> {
    let students_json = fs::read_to_string("students.json").unwrap();
    serde_json::from_str(&students_json).unwrap()
}

//timetable
fn get_timetable(student_id: u64) -> String {
    let mut base_path: String = "timetables/".to_owned();
    let id: String = student_id.to_string().to_owned();
    let file_ext: String = ".ics".to_owned();

    base_path.push_str(&id);
    base_path.push_str(&file_ext);


    println!("With text:\n{base_path}");

    let contents = fs::read_to_string(base_path)
        .expect("{base_path}");

    let mut timetable: Vec<Vec<Class>>; 

    let split_contents = contents.split("\n");

    let mut current = Class {
        id:"err".to_string(),
        location:"err".to_string(),
        subject:"err".to_string()
    };

    for line in split_contents {
        if line.starts_with("SUMMARY") {
            current.id = line.substring(8,line.chars().count()).to_string();
            println!("{cur}",cur=current.id);
        }

        else if line.starts_with("DESCRIPTION") {
            current.location = line.substring(20,line.chars().count()).to_string();
            println!("{cur}",cur=current.location);
        }

        else if line.starts_with("DTSTART") {
            let timestamp = line.substring(8, line.chars().count()).to_string();
            println!("{timestamp}");
        }

    }
    return contents;
}

// /students/:id/
async fn student(Path(student_id): Path<u64>) -> Json<Student> {
    let students = all_students();
    Json(students.into_iter().find(|student| student.id == student_id).unwrap())
}

// /students/timetable/:id
async fn timetable(Path(student_id): Path<u64>) -> String {
    let timetable = get_timetable(student_id);
    return timetable
}


// main
#[tokio::main]
async fn main() {
    // routes
    let app = Router::new()
    .route("/", get(root))
    .route("/foo", get(get_foo).post(post_foo))
    .route("/foo/bar", get(foo_bar))
    .route("/students/:student_id", get(student))
    .route("/students/timetable/:student_id", get(timetable))
    .layer(TraceLayer::new_for_http())
    .layer(CorsLayer::permissive());

    // running with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}


// main route functions (async, type dec)
async fn root() -> &'static str {
     "Hello, !" 
}
async fn get_foo() {}
async fn post_foo() {}
async fn foo_bar() {}