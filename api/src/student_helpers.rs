use std::fs;
use substring::Substring; //don't wanna implement that
use std::fs::File;
use std::io::Write;
use serde_json::json;
use axum::extract::Json;

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
            let class = line.to_string().substring(8, line.chars().count() - 2).to_string();

            if !classes.contains(&class) {
                classes.push(class);
            }
        }
    }
    
    classes
}

fn get_name(student_id: u64) -> String {
    let path = format!("timetables/{student_id}.ics");

    // check if timetable exists in directory /timetable/, fetches it if it doesn't
    match fs::metadata(path.clone()) {
        Ok(_) => println!("File exists!"),
        Err(_) => super::timetable::fetch_timetable(student_id),
    }

    let contents = fs::read_to_string(path)
        .expect("{path}");

    let split_contents = contents.split("\n");

    let mut name = "Error";

    for line in split_contents {
        if line.starts_with("X-WR-CALNAME:") {
            name = line.substring(13,line.chars().count());
            
            break;
        }
    }

    return name.to_string();
}

fn write_to_file(students: Vec<super::structs::Student>) -> std::io::Result<()> {
    let mut file = File::create("students.json")?;
    let write_val = serde_json::to_string(&students)?;
    fs::write("students.json",write_val.as_bytes())?;
    Ok(())
}

pub fn update_student_data(student_id: u64, lionel_string: String) {
    let mut students = super::all_students();
    let mut exists: bool = false;

    for student in students.clone() {
        if student.id == student_id {
            exists = true;
        }
    }

    let replacement: super::structs::Student;

    if !exists {
        let name = get_name(student_id);
        let name_length = name.chars().count();
        println!("{cur}", cur = name.substring(name_length - 7, name_length - 5));

        replacement = super::structs::Student {
            id: student_id,
            name: name.clone(),
            picture: "ERR".to_string(),
            timetable: format!("{student_id}.ics"),
            year: name.substring(name_length - 7, name_length - 5).parse::<u8>().unwrap(),
            house: name.substring(name_length - 4, name_length - 3).chars().next().expect("panic!! (empty string in name finder)"),
            tutor: name.substring(name_length - 4, name_length - 1).to_string(),
            subjects: get_classes(student_id),
            lionel_string: lionel_string
        };

        students.push(replacement);

        match write_to_file(students) {
            Ok(_v) => println!("Successful Student Update"),
            Err(_e) => println!("Error Updating Student")
        }

    }
}