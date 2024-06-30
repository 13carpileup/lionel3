// importing mods
mod timetable;
mod structs;
mod bulletin;

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

// /bulletin
async fn bulletin() -> String {
    bulletin::get_bulletin()
}


// main
#[shuttle_runtime::main]
async fn main() -> shuttle_axum::ShuttleAxum {
    // routes
    let router = Router::new()
    .route("/", get(root))
    .route("/students/:student_id", get(student))
    .route("/students/timetable/:student_id", get(timetable))
    .route("/bulletin", get(bulletin))
    .layer(TraceLayer::new_for_http())
    .layer(CorsLayer::permissive());

    Ok(router.into())
}


// main route functions (async, type dec)
async fn root() -> &'static str {
     "Read the documentation for this api at https://github.com/13carpileup/lionel3/blob/main/api/documentation.md"
}
