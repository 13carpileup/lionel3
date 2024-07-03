// imports
use std::str;
use std::thread;
use substring::Substring; //don't wanna implement that
use chrono::Datelike;
    

#[tokio::main]
async fn fetch_bulletin() -> Result<String, Box<dyn std::error::Error>>  {
    let url = "https://lionel2.kgv.edu.hk/local/mis/mobile/eventscal.php/9668/e637b5e2f8ec8eb6c5690f745facd66c.ics";

    let response = reqwest::get(url).await?;    
    let bytes_response: axum::body::Bytes = response.bytes().await?;

    let string_response = str::from_utf8(&bytes_response).unwrap();

    Ok(string_response.to_string())
}

fn parse_calendar(raw_ics: String) -> Vec<super::structs::Event> {
    let parsed_string = raw_ics.split("\n");
    
    let mut output: Vec<super::structs::Event> = Vec::new();

    let mut template = super::structs::Event {
        text: "Error".to_string(),
        year: 1900,
        month: 12,
        day: 2,
    };

    println!("Size of calendar: {size}", size = parsed_string.clone().collect::<Vec<&str>>().len());

    for line in  parsed_string {
        if line.starts_with("DESCRIPTION:") {
            template.text = line.substring(12,line.chars().count()).to_string();
        }

        else if line.starts_with("DTSTART:") {
            template.year = line.substring(8,12).parse::<u64>().unwrap();
            template.month = line.substring(12,14).parse::<u64>().unwrap();
            template.day = line.substring(14,16).parse::<u64>().unwrap();

            let current_date = chrono::Utc::now();
            let year: u64 = current_date.year().try_into().unwrap();
            let month: u64 = current_date.month().try_into().unwrap();
            let day: u64 = current_date.day().try_into().unwrap();

            if !(template.year < year || (template.year == year && template.month < month) || (template.year == year && template.month == month && template.day < day)) {
                output.push(template.clone());
            }

            
        }
    }
    
    output
}

pub fn get_events() -> Vec<super::structs::Event> {
    thread::spawn(move || -> Vec<super::structs::Event> {
        let calendar = fetch_bulletin();

        match calendar {
            Ok(v) => {
                return parse_calendar(v); 
            },

            Err(e) => {
                println!("{e}"); 
                return vec!();
            },
        }
    }).join().expect("Thread panicked")
}