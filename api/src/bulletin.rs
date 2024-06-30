//imports
use std::str;
use std::thread;

#[tokio::main]
async fn fetch_bulletin() -> Result<String, Box<dyn std::error::Error>>  {
    let url = "https://lionel2.kgv.edu.hk/local/mis/bulletin/bulletin.php";

    let response = reqwest::get(url).await?;    
    let bytes_response: axum::body::Bytes = response.bytes().await?;

    let sparkle_heart = str::from_utf8(&bytes_response).unwrap();

    Ok(sparkle_heart.to_string())
}

pub fn get_bulletin() -> String {

    println!("Running fetch (timetable):");
    thread::spawn(move || {
        let bulletin = fetch_bulletin();

        match bulletin {
            Ok(v) => return v,
            Err(_e) => return "Error".to_string(),
        }
    }).join().expect("Thread panicked")


    
}

