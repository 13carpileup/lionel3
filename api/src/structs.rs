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
    pub subjects: Vec<String>
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Class {
    pub id: String,
    pub location: String,
    pub subject: String,
    pub period: usize,
}