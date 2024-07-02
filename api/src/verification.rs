//imports
use std::str;
use std::thread;


#[tokio::main]
async fn get_verification(student_id: u64, lionel_string: String) -> Result<bool, Box<dyn std::error::Error>>  {
    let url = format!("https://lionel2.kgv.edu.hk/local/mis/mobile/homeworkcal.php/{student_id}/{lionel_string}.ics");

    let response = reqwest::get(url).await?;    
    let bytes_response: axum::body::Bytes = response.bytes().await?;

    let string_response = str::from_utf8(&bytes_response).unwrap();
    println!("{string_response}");

    let output: bool;

    if string_response.chars().count() > 0 {
        output = true;
    } else {
        output = false;
    }

    Ok(output)
}

pub fn verify_user(student_id: u64, lionel_string: String) -> bool {
    
    thread::spawn(move || -> bool {
        match get_verification(student_id, lionel_string) {
            Ok(v) => return v, 
            Err(_e) => return false
        }
    }).join().expect("Thread panicked")
    
}