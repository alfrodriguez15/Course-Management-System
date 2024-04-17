import pandas

data = pandas.read_csv('UDC Grade Distribution 21-24.csv')

subject_list = ['AT', 'MN', 'COS', 'SOC', 'ISC', 'TA', 'UNIV', 'BIOL', 'EDCI',
       'NEUR', 'ALS', 'HNFE', 'HIST', 'ARCH', 'COMM', 'ECE', 'GEOS',
       'LAHS', 'PSCI', 'ART', 'IS', 'ENGL', 'UAP', 'HD', 'GEOG', 'MUS',
       'ACIS', 'SBIO', 'STAT', 'FREC', 'REAL', 'PPE', 'SPES', 'EDTE',
       'AAD', 'MSE', 'PSYC', 'CHEM', 'CAUS', 'RLCL', 'BSE', 'AAEC', 'MS',
       'CS', 'BCHM', 'MATH', 'ENGE', 'AHRM', 'BC', 'ENSC', 'NANO', 'MINE',
       'SPIA', 'PHYS', 'MGT', 'AINS', 'ECON', 'SPAN', 'ITAL', 'JPN',
       'RUS', 'CHN', 'GR', 'GER', 'FR', 'ARBC', 'LAT', 'HEB', 'IDS',
       'ITDS', 'JMC', 'AS', 'NR', 'CLA', 'PHIL', 'FMD', 'LAR', 'HUM',
       'UH', 'HTM', 'LDRS', 'APSC', 'DASC', 'STS', 'PHS', 'RED', 'CMDA',
       'APS', 'AFST', 'WGS', 'ENGR', 'BUS', 'ISE', 'EDCO', 'ENT', 'FA',
       'WATR', 'ME', 'BMES', 'PPWS', 'BDS', 'FST', 'DANC', 'AOE', 'SYSB',
       'PR', 'PSVP', 'CINE', 'CMST', 'ESM', 'ALCE', 'CEM', 'FIW', 'FIN',
       'CHE', 'HORT', 'ADV', 'JUD', 'BMSP', 'BIT', 'CSES', 'CONS', 'STL',
       'EDEP', 'EDCT', 'PM', 'CEE', 'CRIM', 'MKTG', 'NSEG', 'MTRG',
       'BMVS', 'ES', 'GBCB', 'TBMH', 'GIA', 'EDEL', 'PAPA', 'RTM', 'MACR',
       'FL', 'GRAD', 'VM', 'CNST', 'EDHE', 'ASPT', 'EDIT', 'EDP', 'EDRE']

def parse_data(years, sems, subject=None, course=None):
    filtered_data = data[(data['Academic Year'].isin(years)) & (data['Term'].isin(sems))]

    if subject:
        filtered_data = filtered_data[(filtered_data['Subject'] == subject)]
    if course:
        filtered_data = filtered_data[(filtered_data['Course No.'] == int(course))]

    return filtered_data

def sort_data(data, year=False, sem=False, subject=False, course=False):
    sort_columns = []
    if year:
        sort_columns.append('Academic Year')
    if sem:
        sort_columns.append('Term')
    if subject:
        sort_columns.append('Subject')
    if course:
        sort_columns.append('Course No.')

    return data.sort_values(sort_columns)

def get_course_no_list(subject):
    filtered_list = data[data['Subject'] == subject].unique()

def search_by_course_prof(subject, course, prof):
    last_name = prof.split(' ')[-1]
    filtered_data = data[(data['Subject'] == subject) & (data['Course No.'] == course) & (data['Instructor'] == last_name)]
    
    return filtered_data