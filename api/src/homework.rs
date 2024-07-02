use std::str;
use std::thread;
use substring::Substring; //don't wanna implement that


#[tokio::main]
async fn fetch_homework(student_id: u64) -> Result<String, Box<dyn std::error::Error>>  {
    let students = super::all_students();
    let student = students.into_iter().find(|student| student.id == student_id).unwrap();

    let url = format!("https://lionel2.kgv.edu.hk/local/mis/mobile/homeworkcal.php/{student_id}/{weird_string}.ics", weird_string = student.lionel_string);

    let response = reqwest::get(url).await?;    
    let bytes_response: axum::body::Bytes = response.bytes().await?;

    let string_response = str::from_utf8(&bytes_response).unwrap();
    println!("{string_response}");

    Ok(string_response.to_string())
}

fn parse_homework(ics_file: String) -> Vec<super::structs::Homework> {
    let split_string = ics_file.split("\n");

    let mut current = super::structs::Homework {
        class: "Error".to_string(),
        due_date: "Error".to_string(),
        text: "Error".to_string(),
        time: "N/A".to_string()
 
    };

    let mut output: Vec<super::structs::Homework> = Vec::new();
    let mut description_flag = false;

    for line in split_string {

        if description_flag && !line.starts_with("CLASS:") {
            current.text = format!("{og}{line}",og = current.text);
        }

        else if line.starts_with("CLASS:") {
            description_flag = false;
        }

        else if line.starts_with("DESCRIPTION:") {
            current.text = line.substring(12, line.chars().count()).to_string();
            description_flag = true;
        }

        else if line.starts_with("SUMMARY:") {
            current.class = line.substring(6, line.chars().count()).to_string();
        }

        else if line.starts_with("DTSTART:") {
            println!("APPENDING... {line}");
            current.due_date = format!("{day}/{month}/{year}", day = line.substring(14,16), month = line.substring(12,14), year = line.substring(8,12));
            output.push(current.clone());
            println!("SIZE: {size}", size = output.len());
        }
    }


    println!("SIZE FINAL: {size}", size = output.len());
    return output;
}

pub fn get_homework(student_id: u64) -> Vec<super::structs::Homework> {
    // let classes = super::student_helpers::get_classes(student_id);
    
    thread::spawn(move || -> Vec<super::structs::Homework> {
        let hw = fetch_homework(student_id);

        match hw {
            Ok(v) => {
                let x = parse_homework(v); 
                return x;},

            Err(e) => {
                println!("{e}"); 
                return vec!();
            },
        }
    }).join().expect("Thread panicked")


    
}