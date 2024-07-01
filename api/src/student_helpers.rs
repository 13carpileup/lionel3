use std::fs;
use substring::Substring; //don't wanna implement that

pub fn get_classes(student_id: u64) -> Vec<String> {
    let path = format!("timetables/{student_id}.ics");

    // check if timetable exists in directory /timetable/, fetches it if it doesn't
    match fs::metadata(path.clone()) {
        Ok(_) => println!("File exists!"),
        Err(_) => super::timetable::fetch_timetable(student_id),
    }

    let contents = fs::read_to_string(path)
        .expect("{path}");

    let split_contents = contents.split("\n");

    let mut classes: Vec<String> = Vec::new();

    for line in split_contents {
        if line.starts_with("SUMMARY:") {
            classes.push(line.to_string().substring(8, line.chars().count() - 2).to_string())
        }
    }
    
    classes
}