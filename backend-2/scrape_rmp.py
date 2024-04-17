import requests
import re
import time
from bs4 import BeautifulSoup

schools = ["Virginia Tech"]

def get_professors_by_school_and_name(college: int, professor_name: str):
    professor_name.replace(' ', '+')
    #https://www.ratemyprofessors.com/search/professors/1349?q=Patrick%20Sullivan
    url = "https://www.ratemyprofessors.com" \
          "/search/professors/%s?q=%s" % (college, professor_name)
    page = ""
    # Repeat requests until a valid response (status code 200) is received
    while(str(page) != "<Response [200]>"):
        page = requests.get(url)
        if str(page) != "<Response [200]>":
            time.sleep(20)
    # Use regular expressions to extract the professor's ID, department, and last name from the page content
    data = re.findall(r'"legacyId":(\d+)', page.text)
    department = re.findall(r'"department"\s*:\s*"([^"]+)"', page.text)
    lastName = re.findall(r'"lastName":"(.*?)"', page.text)
    ret_index = -1
    # If there is only one department listed and it is 'Computer Science' and the professor's last name matches, return the professor's ID
    for i in range(len(department)):
        if lastName[i] == professor_name.split(" ")[1]: 
            url = "https://www.ratemyprofessors.com/professor/%s" % data[i]
            response = ""
            while(str(response) != "<Response [200]>"):
                response = requests.get(url)
                if str(response) != "<Response [200]>":
                    time.sleep(20)
            html_content = response.content
            soup = BeautifulSoup(html_content, 'html.parser')
            rating_div = soup.find('div', {'class': 'RatingValue__Numerator-qw8sqy-2 liyUjw'})
            if rating_div == None:
                continue
            rating = rating_div.text.strip()
            if rating == "N/A" or rating == "0.0":
                continue
            return data[i]
    # If the professor is not found or their rating is not available, return an empty string
    return ""

def get_stats_for_prof(prof_id: int, profname: str, school_name: str):
    stats = []
    # Use the professor's ID to construct the URL for their Ratemyprofessors page
    url = "https://www.ratemyprofessors.com/professor/%s" % prof_id
    response = ""
    while(str(response) != "<Response [200]>"):
        response = requests.get(url)
        if str(response) != "<Response [200]>":
            time.sleep(20)
    html_content = response.content
    soup = BeautifulSoup(html_content, 'html.parser')

    # Find the name of the school the professor works at
    school_tag = soup.find('title', {'data-react-helmet': 'true'})
    school = school_tag.text.strip()
    if school_name not in school:
        return None


    rating_div = soup.find('div', {'class': 'RatingValue__Numerator-qw8sqy-2 liyUjw'})
    # If the professor has not been rated or has a rating of "N/A", return None
    if rating_div == None:
        return None
    rating = rating_div.text.strip()
    if rating == "N/A":
        return None
    stats.append(rating)

    # Find the professor's difficulty and "would take again" rating
    again_div = soup.findAll("div", class_="FeedbackItem__FeedbackNumber-uof32n-1")
    again = again_div[0].text.strip()
    difficulty = again_div[1].text.strip()
    stats.append(difficulty)
    stats.append(again)

    # Find the number of ratings the professor has
    num_ratings_regex = re.compile(r'Based on\s*<a[^>]*>(\d+)')
    num_ratings = num_ratings_regex.search(response.text)
    num_ratings = num_ratings.group(1)
    stats.append(num_ratings)

    return stats