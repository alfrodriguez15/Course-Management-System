import requests
import re
import time
from bs4 import BeautifulSoup

def get_professors_by_name(professor_name: str):
    professor_name.replace(' ', '+')
    url = "https://www.ratemyprofessors.com" \
          "/search/professors/1349?q=%s" % (professor_name)
    page = ""
    # Repeat requests until a valid response (status code 200) is received
    while(str(page) != "<Response [200]>"):
        page = requests.get(url)
        if str(page) != "<Response [200]>":
            time.sleep(20)

    # Use regular expressions to extract the professor's ID
    id_data = re.findall(r'"legacyId":(\d+)', page.text)
    if not id_data:
        return ""
    
    url = "https://www.ratemyprofessors.com/professor/%s" % id_data[0]
    response = ""
    while(str(response) != "<Response [200]>"):
        response = requests.get(url)
        if str(response) != "<Response [200]>":
            time.sleep(20)

    html_content = response.content
    soup = BeautifulSoup(html_content, 'html.parser')
    rating_div = soup.find('div', {'class': 'RatingValue__Numerator-qw8sqy-2 liyUjw'})
    if rating_div == None or rating_div.text.strip() == "N/A":
        return ""
    return id_data[0]

def get_prof_stats(prof_id: int, profname: str):
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

    # Find the name of the school the professor
    school_tag = soup.find('title', {'data-react-helmet': 'true'})
    school = school_tag.text.strip()
    if 'Virginia Tech' not in school:
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
    wta_div = soup.findAll("div", class_="FeedbackItem__FeedbackNumber-uof32n-1")
    wta = wta_div[0].text.strip()
    difficulty = wta_div[1].text.strip()
    stats.append(difficulty)
    stats.append(wta)

    # Find the number of ratings the professor has
    num_ratings_re = re.compile(r'Based on\s*<a[^>]*>(\d+)')
    num_ratings = num_ratings_re.search(response.text)
    num_ratings = num_ratings.group(1)
    stats.append(num_ratings)

    return stats