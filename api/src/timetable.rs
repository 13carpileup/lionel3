//imports
use std::fs;
use std::collections::HashMap;
use substring::Substring; //don't wanna implement that
use std::thread;
use std::fs::File;
use std::io::Write;
use chrono::Datelike;
use chrono::Weekday;


#[tokio::main]
async fn requester(url: String, id:u64) -> Result<(), Box<dyn std::error::Error>> {
    println!("{url}");
    let response = reqwest::get(&url).await?;
    println!("step one?");
    
    let bytes_response: axum::body::Bytes = response.bytes().await?;
    

    let file_name = format!("timetables/{id}.ics");
    let mut data_file = File::create(file_name).expect("creation failed");
    data_file.write_all(&bytes_response);

    println!("DONE");
    Ok(())
}


//get timetable file from lionel and upload to /timetables/
pub fn fetch_timetable(student_id: u64) {    
    let url: String = format!("https://lionel2.kgv.edu.hk/local/mis/calendar/timetable.php/{student_id}/e637b5e2f8ec8eb6c5690f745facd66c.ics");

    println!("Running fetch:");
    thread::spawn(move || {
        requester(url,student_id);
    }).join().expect("Thread panicked")

}


fn get_period(uid: &String) -> usize {
    //966820240627120240625095017@kgv.hk
    //966820240625420240625095017@kgv.hk
    //966820240620520240625095017@kgv.hk
    //13th char of uid stores period
    return uid.substring(12,13).parse::<usize>().unwrap();
}

//timetableasdas
pub fn get_timetable(student_id: u64) -> Vec<Vec<super::structs::Class>> {
    let mut base_path: String = "timetables/".to_owned();
    let id: String = student_id.to_string().to_owned();
    let file_ext: String = ".ics".to_owned();

    base_path.push_str(&id);
    base_path.push_str(&file_ext);

    fetch_timetable(9668);


    println!("With text:\n{base_path}");

    let contents = fs::read_to_string(base_path)
        .expect("{base_path}");

    

    let split_contents = contents.split("\n");

    let free = super::structs::Class {
        id: "Free".to_string(),
        location: " ".to_string(),
        subject:"Free".to_string(),
        period: 0
    };
   

    let class_conversions = HashMap::from([
        ("AA", "Maths AA"),
        ("CP", "Computer Science"),
        ("SP", "Spanish"),
        ("PE", "Physical Education"),
        ("PP", "Philosophy"),
        ("EU", "English Lang Lit"),
        ("TP", "IB Core"),
        ("PH", "Physics"),
    ]);

    let mut current = super::structs::Class {
        id:"err".to_string(),
        location:"err".to_string(),
        subject:"err".to_string(),
        period:0
    };

    let mut timetable = vec![vec![free.clone(),free.clone(),free.clone(),free.clone(),free.clone()]];
    for _ in 1..10 {
        timetable.push(vec![free.clone(),free.clone(),free.clone(),free.clone(),free.clone()]);
    }
    
    let current_time = chrono::offset::Local::now();
    let mut days: usize = current_time.date_naive().weekday().days_since(Weekday::Mon).try_into().unwrap();

    if days >= 5 {
        days = 5;
    } 

    // in case someone has a free 5th (not me though LMAO!!!!)
    let mut four_flag: bool = false;

    for line in split_contents {

        if line.starts_with("UID") {
            let timestamp = line.substring(4, line.chars().count()).to_string();
            current.period = get_period(&timestamp);
        }

        else if line.starts_with("SUMMARY") {
            current.id = line.substring(8,line.chars().count()).to_string();
        }
        
        // once we get here we must be complete parsing the subject
        else if line.starts_with("DESCRIPTION") {

            if four_flag && current.period != 5 {
                days += 1;
                four_flag = false;
            } 

            current.location = line.substring(20,line.chars().count()).to_string();
            let class_acronym = current.id.substring(2,4);
            current.subject = class_conversions[class_acronym].to_string();
            timetable[days][current.period - 1] = current.clone();

            
            if current.period == 5 {
                days += 1;
                four_flag = false;
            }

            if current.period == 4 {
                four_flag = true;
            }

            if days > 9 {
                days = 0;
            }
        }

        

    }

    return timetable;
}


