import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import BasicTabs from './components/Tab.js';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CoursesTable from './components/CoursesTable';

function CoursesPage() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [selectYear, setSelectYear] = useState('');
    const [selectSemester, setSelectSemester] = useState('');
    const [selectCampus, setSelectCampus] = useState('BLACKSBURG');
    const [selectPathway, setSelectPathway] = useState('ALL');
    const [selectSubject, setSelectSubject] = useState('');
    const [selectSectionType, setSelectSectionType] = useState('ALL');
    const [selectCode, setSelectCode] = useState('');
    const [selectCrn, setSelectCrn] = useState('');
    const [selectStatus, setSelectStatus] = useState('ALL');
    const [selectModality, setSelectModality] = useState('ALL');
    const [findError, setFindError] = useState('');
    const [courses, setCourses] = useState([]);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const semester = [
        {
            value: 'SPRING',
            label: 'Spring',
        },
        {
            value: 'SUMMER',
            label: 'Summer',
        },
        {
            value: 'FALL',
            label: 'Fall',
        },
        {
            value: 'WINTER',
            label: 'Winter',
        },
    ];

    const campus = [
        {
            value: 'BLACKSBURG',
            label: 'Blacksburg',
        },
        {
            value: 'VIRTUAL',
            label: 'Virtual',
        },
    ];

    const pathway = [
        {
            value: 'ALL',
            label: 'All',
        },
        {
            value: 'CLE_1',
            label: 'CLE 1',
        },
        {
            value: 'CLE_2',
            label: 'CLE 2',
        },
        {
            value: 'CLE_3',
            label: 'CLE 3',
        },
        {
            value: 'CLE_4',
            label: 'CLE 4',
        },
        {
            value: 'CLE_5',
            label: 'CLE 5',
        },
        {
            value: 'CLE_6',
            label: 'CLE 6',
        },
        {
            value: 'CLE_7',
            label: 'CLE 7',
        },
        {
            value: 'PATH_1A',
            label: 'Path 1A',
        },
        {
            value: 'PATH_1F',
            label: 'Path 1F',
        },
        {
            value: 'PATH_2',
            label: 'Path 2',
        },
        {
            value: 'PATH_3',
            label: 'Path 3',
        },
        {
            value: 'PATH_2',
            label: 'Path 4',
        },
        {
            value: 'PATH_2',
            label: 'Path 5A',
        },
        {
            value: 'PATH_2',
            label: 'Path 5F',
        },
        {
            value: 'PATH_6A',
            label: 'Path 6A',
        },
        {
            value: 'PATH_6D',
            label: 'Path 6D',
        },
        {
            value: 'PATH_7',
            label: 'Path 7',
        },
    ];

    const subject = [
        {
            value: 'AAD',
            label: 'AAD - Architecture and Design',
        },
        {
            value: 'AAEC',
            label: 'AAEC - Agricultural and Applied Economics',
        },
        {
            value: 'ACIS',
            label: 'ACIS - Accounting and Information Systems',
        },
        {
            value: 'ADV',
            label: 'ADV - Advertising',
        },
        {
            value: 'AFST',
            label: 'AFST - Africana Studies',
        },
        {
            value: 'AHRM',
            label: 'AHRM - Apparel, Housing, and Resource Management',
        },
        {
            value: 'AINS',
            label: 'AINS - American Indian Studies',
        },
        {
            value: 'AIS',
            label: 'AIS - Academy of Integrated Science',
        },
        {
            value: 'ALCE',
            label: 'ALCE - Agricultural, Leadership, and Community Education',
        },
        {
            value: 'ALS',
            label: 'ALS - Agricultural and Life Sciences',
        },
        {
            value: 'AOE',
            label: 'AOE - Aerospace and Ocean Engineering',
        },
        {
            value: 'APS',
            label: 'APS - Appalachian Studies',
        },
        {
            value: 'APSC',
            label: 'APSC - Animal and Poultry Sciences',
        },
        {
            value: 'ARBC',
            label: 'ARBC - Arabic',
        },
        {
            value: 'ARCH',
            label: 'ARCH - Architecture',
        },
        {
            value: 'ART',
            label: 'ART - Art and Art History',
        },
        {
            value: 'AS',
            label: 'AS - Military Aerospace Studies',
        },
        {
            value: 'ASPT',
            label: 'ASPT - Alliance for Social, Political, Ethical, and Cultural Thought',
        },
        {
            value: 'AT',
            label: 'AT - Agricultural Technology',
        },
        {
            value: 'BC',
            label: 'BC - Building Construction',
        },
        {
            value: 'BCHM',
            label: 'BCHM - Biochemistry',
        },
        {
            value: 'BDS',
            label: 'BDS - Behavioral Decision Science',
        },
        {
            value: 'BIOL',
            label: 'BIOL - Biological Sciences',
        },
        {
            value: 'BIT',
            label: 'BIT - Business Information Technology',
        },
        {
            value: 'BMES',
            label: 'BMES - Biomedical Engineering and Sciences',
        },
        {
            value: 'BMSP',
            label: 'BMSP - Biomedical Sciences and Pathobiology',
        },
        {
            value: 'BMVS',
            label: 'BMVS - Biomedical and Veterinary Sciences',
        },
        {
            value: 'BSE',
            label: 'BSE - Biological Systems Engineering',
        },
        {
            value: 'BUS',
            label: 'BUS - Business',
        },
        {
            value: 'CEE',
            label: 'CEE - Civil and Environmental Engineering',
        },
        {
            value: 'CEM',
            label: 'CEM - Construction Engineering and Management',
        },
        {
            value: 'CHE',
            label: 'CHE - Chemical Engineering',
        },
        {
            value: 'CHEM',
            label: 'CHEM - Chemistry',
        },
        {
            value: 'CHN',
            label: 'CHN - Chinese',
        },
        {
            value: 'CINE',
            label: 'CINE - Cinema',
        },
        {
            value: 'CLA',
            label: 'CLA - Classical Studies',
        },
        {
            value: 'CMDA',
            label: 'CMDA - Computational Modeling and Data Analytics',
        },
        {
            value: 'CMST',
            label: 'CMST - Communication Studies',
        },
        {
            value: 'CNST',
            label: 'CNST - Construction',
        },
        {
            value: 'COMM',
            label: 'COMM - Communication',
        },
        {
            value: 'CONS',
            label: 'CONS - Consumer Studies',
        },
        {
            value: 'COS',
            label: 'COS - College of Science',
        },
        {
            value: 'CRIM',
            label: 'CRIM - Criminology',
        },
        {
            value: 'CS',
            label: 'CS - Computer Science',
        },
        {
            value: 'CSES',
            label: 'CSES - Crop and Soil Environmental Sciences',
        },
        {
            value: 'DANC',
            label: 'DANC - Dance',
        },
        {
            value: 'DASC',
            label: 'DASC - Dairy Science',
        },
        {
            value: 'ECE',
            label: 'ECE - Electrical and Computer Engineering',
        },
        {
            value: 'ECON',
            label: 'ECON - Economics',
        },
        {
            value: 'EDCI',
            label: 'EDCI - Education, Curriculum and Instruction',
        },
        {
            value: 'EDCO',
            label: 'EDCO - Counselor Education',
        },
        {
            value: 'EDCT',
            label: 'EDCT - Career and Technical Education',
        },
        {
            value: 'EDEL',
            label: 'EDEL - Educational Leadership',
        },
        {
            value: 'EDEP',
            label: 'EDEP - Educational Psychology',
        },
        {
            value: 'EDHE',
            label: 'EDHE - Higher Education',
        },
        {
            value: 'EDIT',
            label: 'EDIT - Instructional Design and Technology',
        },
        {
            value: 'EDP',
            label: 'EDP - Environmental Design and Planning',
        },
        {
            value: 'EDRE',
            label: 'EDRE - Education, Research and Evaluation',
        },
        {
            value: 'EDTE',
            label: 'EDTE - Technology Education',
        },
        {
            value: 'ENGE',
            label: 'ENGE - Engineering Education',
        },
        {
            value: 'ENGL',
            label: 'ENGL - English',
        },
        {
            value: 'ENGR',
            label: 'ENGR - Engineering',
        },
        {
            value: 'ENSC',
            label: 'ENSC - Environmental Science',
        },
        {
            value: 'ENT',
            label: 'ENT - Entomology',
        },
        {
            value: 'ESM',
            label: 'ESM - Engineering Science and Mechanics',
        },
        {
            value: 'FIN',
            label: 'FIN - Finance',
        },
        {
            value: 'FIW',
            label: 'FIW - Fish and Wildlife Conservation',
        },
        {
            value: 'FL',
            label: 'FL - Modern and Classical Languages and Literatures',
        },
        {
            value: 'FMD',
            label: 'FMD - Fashion Merchandising and Design',
        },
        {
            value: 'FR',
            label: 'FR - French',
        },
        {
            value: 'FREC',
            label: 'FREC - Forest Resources and Environmental Conservation',
        },
        {
            value: 'FST',
            label: 'FST - Food Science and Technology',
        },
        {
            value: 'GBCB',
            label: 'GBCB - Genetics, Bioinformatics, and Computational Biology',
        },
        {
            value: 'GEOG',
            label: 'GEOG - Geography',
        },
        {
            value: 'GEOS',
            label: 'GEOS - Geosciences',
        },
        {
            value: 'GER',
            label: 'GER - German',
        },
        {
            value: 'GIA',
            label: 'GIA - Government and International Affairs',
        },
        {
            value: 'GR',
            label: 'GR - Greek',
        },
        {
            value: 'GRAD',
            label: 'GRAD - Graduate School',
        },
        {
            value: 'HD',
            label: 'HD - Human Development',
        },
        {
            value: 'HEB',
            label: 'HEB - Hebrew',
        },
        {
            value: 'HIST',
            label: 'HIST - History',
        },
        {
            value: 'HNFE',
            label: 'HNFE - Human Nutrition, Foods, and Exercise',
        },
        {
            value: 'HORT',
            label: 'HORT - Horticulture',
        },
        {
            value: 'HTM',
            label: 'HTM - Hospitality and Tourism Management',
        },
        {
            value: 'HUM',
            label: 'HUM - Humanities',
        },
        {
            value: 'IDS',
            label: 'IDS - Industrial Design',
        },
        {
            value: 'IS',
            label: 'IS - International Studies',
        },
        {
            value: 'ISC',
            label: 'ISC - Integrated Science',
        },
        {
            value: 'ISE',
            label: 'ISE - Industrial and Systems Engineering',
        },
        {
            value: 'ITAL',
            label: 'ITAL - Italian',
        },
        {
            value: 'ITDS',
            label: 'ITDS - Interior Design',
        },
        {
            value: 'JMC',
            label: 'JMC - Journalism and Mass Communication',
        },
        {
            value: 'JPN',
            label: 'JPN - Japanese',
        },
        {
            value: 'JUD',
            label: 'JUD - Judaic Studies',
        },
        {
            value: 'LAHS',
            label: 'Liberal Arts and Human Sciences',
        },
        {
            value: 'LAR',
            label: 'LAR - Landscape Architecture',
        },
        {
            value: 'LAT',
            label: 'LAT - Latin',
        },
        {
            value: 'LDRS',
            label: 'LDRS - Leadership Studies',
        },
        {
            value: 'MACR',
            label: 'MACR - Macromolecular Science and Engineering',
        },
        {
            value: 'MATH',
            label: 'MATH - Mathematics',
        },
        {
            value: 'ME',
            label: 'ME - Mechanical Engineering',
        },
        {
            value: 'MED',
            label: 'MED - Medicine',
        },
        {
            value: 'MGT',
            label: 'MGT - Management',
        },
        {
            value: 'MINE',
            label: 'MINE - Mining Engineering',
        },
        {
            value: 'MKTG',
            label: 'MKTG - Marketing',
        },
        {
            value: 'MN',
            label: 'MN - Military Navy',
        },
        {
            value: 'MS',
            label: 'MS - Military Science (AROTC)',
        },
        {
            value: 'MSE',
            label: 'MSE - Materials Science and Engineering',
        },
        {
            value: 'MTRG',
            label: 'MTRG - Meteorology',
        },
        {
            value: 'MUS',
            label: 'MUS - Music',
        },
        {
            value: 'NANO',
            label: 'NANO - Nanoscience',
        },
        {
            value: 'NEUR',
            label: 'NEUR - Neuroscience',
        },
        {
            value: 'NR',
            label: 'NR - Natural Resources',
        },
        {
            value: 'NSEG',
            label: 'NSEG - Nuclear Science and Engineering',
        },
        {
            value: 'PAPA',
            label: 'PAPA - Public Administration and Public Affairs',
        },
        {
            value: 'PHIL',
            label: 'PHIL - Philosophy',
        },
        {
            value: 'PHS',
            label: 'PHS - Population Health Sciences',
        },
        {
            value: 'PHYS',
            label: 'PHYS - Physics',
        },
        {
            value: 'PM',
            label: 'PM - Property Management',
        },
        {
            value: 'PORT',
            label: 'PORT - Portuguese',
        },
        {
            value: 'PPE',
            label: 'PPE - Philosophy, Politics, and Economics',
        },
        {
            value: 'PPWS',
            label: 'PPWS - Plant Pathology, Physiology, and Weed Science',
        },
        {
            value: 'PR',
            label: 'PR - Public Relations',
        },
        {
            value: 'PSCI',
            label: 'PSCI - Political Science',
        },
        {
            value: 'PSVP',
            label: 'PSVP - Peace Studies',
        },
        {
            value: 'PSYC',
            label: 'PSYC - Psychology',
        },
        {
            value: 'REAL',
            label: 'REAL - Real Estate',
        },
        {
            value: 'RED',
            label: 'RED - Residential Environments and Design',
        },
        {
            value: 'RLCL',
            label: 'RLCL - Religion and Culture',
        },
        {
            value: 'RTM',
            label: 'RTM - Research in Translational Medicine',
        },
        {
            value: 'RUS',
            label: 'RUS - Russian',
        },
        {
            value: 'SBIO',
            label: 'SBIO - Sustainable Biomaterials',
        },
        {
            value: 'SOC',
            label: 'SOC - Sociology',
        },
        {
            value: 'SPAN',
            label: 'SPAN - Spanish',
        },
        {
            value: 'SPES',
            label: 'SPES - School of Plant and Environmental Sciences',
        },
        {
            value: 'SPIA',
            label: 'SPIA - School of Public and International Affairs',
        },
        {
            value: 'STAT',
            label: 'STAT - Statistics',
        },
        {
            value: 'STL',
            label: 'STL - Science, Technology, and Law',
        },
        {
            value: 'STS',
            label: 'STS - Science and Technology Studies',
        },
        {
            value: 'SYSB',
            label: 'SYSB - Systems Biology',
        },
        {
            value: 'TA',
            label: 'TA - Theatre Arts',
        },
        {
            value: 'TBMH',
            label: 'TBMH - Translational Biology, Medicine, and Health',
        },
        {
            value: 'UAP',
            label: 'UAP - Urban Affairs and Planning',
        },
        {
            value: 'UN',
            label: 'UN - University Honors',
        },
        {
            value: 'UNIV',
            label: 'UNIV - University Course Series',
        },
        {
            value: 'VM',
            label: 'VM - Veterinary Medicine',
        },
        {
            value: 'WATR',
            label: 'WATR - Water',
        },
        {
            value: 'WGS',
            label: 'WGS - Womens and Gender Studies',
        },
    ];

    const sectionType = [
        {
            value: 'ALL',
            label: 'All',
        },
        {
            value: 'INDEPENDENT_STUDY',
            label: 'Independent Study',
        },
        {
            value: 'LAB',
            label: 'Lab',
        },
        {
            value: 'LECTURE',
            label: 'Lecture',
        },
        {
            value: 'RECIATION',
            label: 'Recitation',
        },
        {
            value: 'RESEARCH',
            label: 'Research',
        },
        {
            value: 'ONLINE',
            label: 'Online',
        },
    ];

    const status = [
        {
            value: 'ALL',
            label: 'All',
        },
        {
            value: 'OPEN',
            label: 'Open',
        },
    ];

    const modality = [
        {
            value: 'ALL',
            label: 'All',
        },
        {
            value: 'IN_PERSON',
            label: 'In Person',
        },
        {
            value: 'HYBRID',
            label: 'Hybrid',
        },
        {
            value: 'ONLINE_SYNC',
            label: 'Online Synchrnous',
        },
        {
            value: 'ONLINE_ASYNC',
            label: 'Online Asynchronous',
        },
    ];

    const boxStyle = {
        backgroundColor: 'beige',
        textAlign: 'center',
        padding: '20px',
    };

    const divStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    };

    function handleClickFind() {

        axios.post('http://localhost:5000/courses', {
            selectYear,
            selectSemester,
            selectCampus,
            selectPathway,
            selectSubject,
            selectSectionType,
            selectCode,
            selectCrn,
            selectStatus,
            selectModality,
        })
            .then(response => {
                console.log(response.data); // Log the response from the backend
                setCourses(response.data); // Set the courses in state
                handleDisplayCourses();
            })
            .catch(error => {
                console.error(error); // Log any errors that occur during the request
                if (error.response && error.response.data) {
                    setFindError(error.response.data.message); // Set the error message in state
                }
            });
    }

    function handleDisplayCourses() {
        return (
            <div>
                <CoursesTable courses={courses} />
            </div>
        );
    }

    function handleClickReset() {

        setSelectYear('');
        setSelectSemester('');
        setSelectCampus('BLACKSBURG');
        setSelectPathway('ALL');
        setSelectSubject('');
        setSelectSectionType('ALL');
        setSelectCode('');
        setSelectCrn('');
        setSelectStatus('ALL');
        setSelectModality('ALL');
        setCourses([]);
        setFindError('');
    }

    return (
        <div className="schedule-page">
            <Sidebar show={showSidebar} toggleSidebar={toggleSidebar} />
            <div className={showSidebar ? "content-with-sidebar" : "content"}>
                <Box style={boxStyle}>
                    <h3>Course Search</h3>
                    <div style={divStyle}>
                        <TextField
                            id="select-campus"
                            select
                            label="Campus"
                            // defaultValue="Campus.BLACKSBURG"
                            helperText="Online courses are displayed under all campuses. To view only online courses, select the Virtual campus from the drop down."
                            style={{ margin: '10px' }}
                            value={selectCampus}
                            onChange={(e) => setSelectCampus(e.target.value)}
                        >
                            {campus.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="select-semester"
                            select
                            label="Semester"
                            style={{ margin: '10px', width: '200px' }}
                            value={selectSemester}
                            onChange={(e) => setSelectSemester(e.target.value)}
                        >
                            {semester.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="input-year"
                            label="Year"
                            helperText="Enter only current year. ex: 2024"
                            style={{ margin: '10px', width: '200px' }}
                            value={selectYear}
                            onChange={(e) => setSelectYear(e.target.value)}
                        />
                        <TextField
                            id="select-pathway"
                            select
                            label="Pathway"
                            // defaultValue="ALL"
                            style={{ margin: '10px', width: '200px' }}
                            value={selectPathway}
                            onChange={(e) => setSelectPathway(e.target.value)}
                        >
                            {pathway.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div style={divStyle}>
                        <TextField
                            id="select-subject"
                            select
                            label="Subject"
                            // defaultValue=""
                            style={{ margin: '10px', width: '200px' }}
                            value={selectSubject}
                            onChange={(e) => setSelectSubject(e.target.value)}
                        >
                            {subject.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="input-course-no"
                            label="Course Number"
                            // defaultValue=""
                            helperText="Optional"
                            style={{ margin: '10px', width: '200px' }}
                            value={selectCode}
                            onChange={(e) => setSelectCode(e.target.value)}
                        />
                        <TextField
                            id="input-course-crn"
                            label="Course Request Number (CRN)"
                            // defaultValue=""
                            helperText="Optional"
                            style={{ margin: '10px', width: '300px' }}
                            value={selectCrn}
                            onChange={(e) => setSelectCrn(e.target.value)}
                        />
                        <TextField
                            id="select-modality"
                            select
                            label="Course Modality"
                            // defaultValue="ALL"
                            helperText="Optional"
                            style={{ margin: '10px', width: '200px' }}
                            value={selectModality}
                            onChange={(e) => setSelectModality(e.target.value)}
                        >
                            {modality.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="select-section-type"
                            select
                            label="Section Type"
                            // defaultValue="ALL"
                            style={{ margin: '10px', width: '200px' }}
                            value={selectSectionType}
                            onChange={(e) => setSelectSectionType(e.target.value)}
                        >
                            {sectionType.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div style={divStyle}>
                        <TextField
                            id="select-status"
                            select
                            label="Status"
                            // defaultValue="ALL"
                            style={{ margin: '10px', width: '200px' }}
                            value={selectStatus}
                            onChange={(e) => setSelectStatus(e.target.value)}
                        >
                            {status.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div>
                        <Button className='find-button'
                            variant="primary"
                            style={{ margin: '10px', backgroundColor: 'rgb(160, 43, 82)' }}
                            onClick={handleClickFind}>
                            Find Class Sections
                        </Button>{' '}
                        <Button className='reset-button'
                            variant="primary"
                            style={{ margin: '10px', backgroundColor: 'orange' }}
                            onClick={handleClickReset}>
                            Reset
                        </Button>{' '}
                    </div>
                    {findError && <p className="error">{findError}</p>}
                </Box>
                <Box style={boxStyle}>
                    <div className="courses-container">
                        {handleDisplayCourses()}
                    </div>
                </Box>
            </div>
        </div>
    );
}

export default CoursesPage;