use std::str;
use std::thread;
use scraper::{Html, Selector};

#[tokio::main]
async fn fetch_homework(student_id: u64) -> Result<String, Box<dyn std::error::Error>>  {
    let students = super::all_students();
    let student = students.into_iter().find(|student| student.id == student_id).unwrap();

    let url = format!("https://lionel2.kgv.edu.hk/local/mis/mobile/homeworkcal.php/9668/{weird_string}.ics", weird_string = student.lionel_string);

    let response = reqwest::get(url).await?;    
    let bytes_response: axum::body::Bytes = response.bytes().await?;

    let string_response = str::from_utf8(&bytes_response).unwrap();
    println!("{string_response}");

    Ok(string_response.to_string())
}

pub fn get_homework(student_id: u64) -> Vec<super::structs::Homework> {
    let classes = super::student_helpers::get_classes(student_id);

    
    thread::spawn(move || -> Vec<super::structs::Homework> {
        let hw = fetch_homework(student_id);

        match hw {
            Ok(_v) => return vec!(),
            Err(_e) => return vec!(),
        }
    }).join().expect("Thread panicked");


    vec!()
}