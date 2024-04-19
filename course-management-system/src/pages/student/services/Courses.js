import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.js';
import CoursesSearch from '../components/CoursesSearch.js';

function CoursesPage() {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <div className="schedule-page">
            <Sidebar show={showSidebar} toggleSidebar={toggleSidebar} />
            <div className={showSidebar ? "content-with-sidebar" : "content"}>
                <CoursesSearch/>
            </div>
        </div>
    );
}

export default CoursesPage;