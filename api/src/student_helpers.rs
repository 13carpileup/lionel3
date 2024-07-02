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

pub fn update_student_data(student_id: u64, lionel_string: String) {
    let students = super::all_students();
    let mut exists: bool = false;

    for student in students {
        if student.id == student_id {
            exists = true;
        }
    }

    if !exists {
        let mut new_student = super::structs::Student {
            id: student_id,
            name: "Name".to_string(),
            picture: "image.jpg".to_string(),
            timetable: format!("{student_id}.ics"),
            year: 32,
            house: 'r',
            tutor: "something".to_string(),
            subjects: vec!(),
            lionel_string: lionel_string
        };

        
    }
}