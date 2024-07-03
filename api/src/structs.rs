use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Student {
    pub id: u64,
    pub name: String,
    pub picture: String,
    pub timetable: String,
    pub year: u8, //7-13
    pub house: char, // R/N/C/U
    pub tutor: String,
    pub subjects: Vec<String>,
    pub lionel_string: String
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Class {
    pub id: String,
    pub location: String,
    pub subject: String,
    pub period: usize,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct BulletinPost {
    pub tagline: String,
    pub text: String,
    pub author: String,
    pub target: bool, // does the post have any specific target audience? (y12/rowell/etc)
    pub target_aud: String
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Homework {
    pub class: String,
    pub due_date: String,
    pub text: String,
    pub time: String
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Event {
    pub text: String,
    pub year: u64,
    pub month: u64,
    pub day: u64
}