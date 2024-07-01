//imports
use std::str;
use std::thread;
use scraper::{Html, Selector};

#[tokio::main]
async fn fetch_bulletin() -> Result<String, Box<dyn std::error::Error>>  {
    let url = "https://lionel2.kgv.edu.hk/local/mis/bulletin/bulletin.php";

    let response = reqwest::get(url).await?;    
    let bytes_response: axum::body::Bytes = response.bytes().await?;

    let string_response = str::from_utf8(&bytes_response).unwrap();

    Ok(string_response.to_string())
}

fn parse_bulletin(raw: String) -> Vec<super::structs::BulletinPost> {
    let document = Html::parse_document(&raw);

    let mut taglines: Vec<String> = Vec::new();
    let mut texts: Vec<String> = Vec::new();
    let mut authors: Vec<String> = Vec::new();
    let mut dist: Vec<String> = Vec::new();

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

    //get all authors
    selector = Selector::parse("span").unwrap();
    for element in document.select(&selector) {
        let classes = element.value().classes();
        for class in classes {
            if class == "itemauthor" {
                authors.push(element.inner_html());
            }
        }
    }

    //get all target audiences
    // EXAMPLE --- <i>Targeting Yr 11, Crozier, Nightingale, Rowell, Upsdell<br>Sent to Student</i>
    selector = Selector::parse("span").unwrap();
    for element in document.select(&selector) {
        let classes = element.value().classes();
        for class in classes {
            if class == "itemdistribution" {
                dist.push(element.inner_html());
            }
        }
    }

    let mut all_posts: Vec<super::structs::BulletinPost> = Vec::new();
    for i in 0..(taglines.len()) {
        let post = super::structs::BulletinPost {
            tagline: taglines[i].clone(),
            text : texts[i].clone(),
            author : authors[i].clone(),
            target: false,
            target_aud : dist[i].clone(),
        };

        all_posts.push(post);
    }

    all_posts
}

pub fn get_bulletin() -> Vec<super::structs::BulletinPost> {
    println!("Running fetch (timetable):");

    // threading allows for the api to fetch bulletin data without panicking bc of the async function
    thread::spawn(move || {
        let bulletin = fetch_bulletin();

        match bulletin {
            Ok(v) => return parse_bulletin(v),
            Err(_e) => return vec!(),
        }
    }).join().expect("Thread panicked")
}

