
// imports
use axum::{
    extract::Path,
    routing::get,
    routing::post,
    handler::Handler,
    Router,
};


// STUDENT GETTERS

async fn student(Path(user_id): Path<u64>) -> String {
    user_id.to_string()
}



// main
#[tokio::main]
async fn main() {
    // routes
    let app = Router::new()
    .route("/", get(root))
    .route("/foo", get(get_foo).post(post_foo))
    .route("/foo/bar", get(foo_bar))
    .route("/users/:user_id", get(student));

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