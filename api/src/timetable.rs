//imports
use std::fs;
use std::collections::HashMap;
use substring::Substring; //don't wanna implement that


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
    
    let mut days = 1;

    for line in split_contents {

        if line.starts_with("UID") {
            let timestamp = line.substring(4, line.chars().count()).to_string();
            current.period = get_period(&timestamp);
            println!("{timestamp}");
        }

        else if line.starts_with("SUMMARY") {
            current.id = line.substring(8,line.chars().count()).to_string();
        }
        
        // once we get here we must be complete parsing the subject
        else if line.starts_with("DESCRIPTION") {
            current.location = line.substring(20,line.chars().count()).to_string();
            let class_acronym = current.id.substring(2,4);
            current.subject = class_conversions[class_acronym].to_string();
            timetable[days][current.period - 1] = current.clone();

            println!("{days}, {cur}", cur = current.period);

            if current.period == 5 {
                days += 1;
            }

            if days > 9 {
                days = 0;
            }
        }

        

    }

    return timetable;
}

#[tokio::main]
async fn requester() -> Result<(), Box<dyn std::error::Error>> {
    let resp = reqwest::get("https://httpbin.org/ip")
        .await?
        .json::<HashMap<String, String>>()
        .await?;
    println!("HEREREER {resp:#?}");
    Ok(())
}


//get timetable file from lionel and upload to /timetables/
pub async fn fetch_timetable(student_id: u64) {
    let student = super::all_students().into_iter().find(|st| st.id == student_id).unwrap();
    
    let mut url: String = "https://lionel2.kgv.edu.hk/local/mis/calendar/timetable.php/".to_owned();
    let id: String = student_id.to_string().to_owned();
    let suspect: String = student.lionel_string.to_string().to_owned();
    let file_ext: String = ".ics".to_owned();

    url.push_str(&id);
    url.push_str(&suspect);
    url.push_str(&file_ext);

    requester();

}

