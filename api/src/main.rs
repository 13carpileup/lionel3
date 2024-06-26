// importing mods
mod timetable;
mod structs;


// imports
use axum::{
    extract::{Json, Path},
    routing::get,
    Router,
};

use std::fs;
use tower_http::{cors::CorsLayer, trace::TraceLayer};

// -----------------
// STUDENT GETTERS
// -----------------

//student list
fn all_students() -> Vec<structs::Student> {
    let students_json = fs::read_to_string("students.json").unwrap();
    serde_json::from_str(&students_json).unwrap()
}

// -----------------
// HANDLERS
// -----------------

// /students/:id/
async fn student(Path(student_id): Path<u64>) -> Json<structs::Student> {
    let students = all_students();
    Json(students.into_iter().find(|student| student.id == student_id).unwrap())
}

// /students/timetable/:id
async fn timetable(Path(student_id): Path<u64>) -> Json<Vec<Vec<structs::Class>>> {
    let timetable = timetable::get_timetable(student_id);
    Json(timetable.clone())
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