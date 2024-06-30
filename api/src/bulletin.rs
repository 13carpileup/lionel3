//imports
use std::str;
use std::thread;
use scraper::{Html, Selector};

#[tokio::main]
async fn fetch_bulletin() -> Result<String, Box<dyn std::error::Error>>  {
    let url = "https://lionel2.kgv.edu.hk/local/mis/bulletin/bulletin.php";

    let response = reqwest::get(url).await?;    
    let bytes_response: axum::body::Bytes = response.bytes().await?;

    let sparkle_heart = str::from_utf8(&bytes_response).unwrap();

    Ok(sparkle_heart.to_string())
}

fn parse_bulletin(raw: String) -> Vec<super::structs::bulletin_post> {
    let document = Html::parse_document(&raw);

    let mut taglines: Vec<String> = Vec::new();
    let mut texts: Vec<String> = Vec::new();
    let mut authors: Vec<String> = Vec::new();
    let mut years: Vec<u64> = Vec::new();
    let mut houses: Vec<char> = Vec::new();

    //get all taglines
    let mut selector = Selector::parse("h4").unwrap();
    for element in document.select(&selector) {
        let classes = element.value().classes();
        for class in classes {
            if class == "itemheading" {
                taglines.push(element.inner_html());
            }
        }
    }

    //get all texts
    selector = Selector::parse("div").unwrap();
    for element in document.select(&selector) {
        let classes = element.value().classes();
        for class in classes {
            if class == "itemtext" {
                texts.push(element.inner_html());
            }
        }
    }

    //get all years
    selector = Selector::parse("span").unwrap();
    for element in document.select(&selector) {
        let classes = element.value().classes();
        for class in classes {
            if class == "itemauthor" {
                authors.push(element.inner_html());
            }
        }
    }

    let mut all_posts: Vec<super::structs::bulletin_post> = Vec::new();
    for i in 0..(taglines.len()) {
        let post = super::structs::bulletin_post {
            tagline: taglines[i].clone(),
            text : texts[i].clone(),
            author : authors[i].clone(),
            year : 12,
            house : 'r'
        };

        all_posts.push(post);
    }

    all_posts
}

pub fn get_bulletin() -> Vec<super::structs::bulletin_post> {
    println!("Running fetch (timetable):");
    thread::spawn(move || {
        let bulletin = fetch_bulletin();

        match bulletin {
            Ok(v) => return parse_bulletin(v),
            Err(_e) => return vec!(),
        }
    }).join().expect("Thread panicked")
}

