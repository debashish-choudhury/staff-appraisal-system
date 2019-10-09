const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Load time table model
require('../models/Annexure-1/TimeTable')
const TimeTable = mongoose.model('timetable');

// Load class advisor model
require('../models/Annexure-1/ClassAdvisor')
const ClassAdvisor = mongoose.model('classadvisor');

// Load class advisor model
require('../models/Annexure-1/SportsActivities')
const SportsActivities = mongoose.model('sportsactivities');

// Load class advisor model
require('../models/Annexure-1/CulturalActivities')
const CulturalActivities = mongoose.model('culturalactivities');

// Load PBL model
require('../models/Annexure-1/ProjectBasedLearning')
const ProjectBasedLearning = mongoose.model('projectbasedlearning');

// Load udaan model
require('../models/Annexure-1/Udaan')
const Udaan = mongoose.model('udaan');

// Load plavement activities model
require('../models/Annexure-1/PlacementActivities')
const PlacementActivities = mongoose.model('placementactivities');

// Load inhouse placement model
require('../models/Annexure-1/InhousePlacement')
const InhousePlacement = mongoose.model('inhouseplacement');

// Load student organization model
require('../models/Annexure-1/StudentOrganizations')
const StudentOrganizations = mongoose.model('studentorganizations');

// Load indutrial visit activities model
require('../models/Annexure-1/IndustrialVisitActivities')
const IndustrialVisitActivities = mongoose.model('industrialvisit');

// Load admission process activities model
require('../models/Annexure-1/AdmissionProcessActivities')
const AdmissionProcessActivities = mongoose.model('admissionprocess');

// Load exam assessment external model
require('../models/Annexure-1/ExamAssessmentExternal')
const ExamAssessmentExternal = mongoose.model('examassessmetnexternal');

// Load exam activities supervision model
require('../models/Annexure-1/ExamActivitiesSupervision')
const ExamActivitiesSupervision = mongoose.model('examactivitiessupervision');

// Load exam activities college level model
require('../models/Annexure-1/ExamActivitiesCollegeLevel')
const ExamActivitiesCollegeLevel = mongoose.model('examactivitiescollege');

// Load IT maintenance model
require('../models/Annexure-1/ITMaintenance')
const ITMaintenance = mongoose.model('itmaintenance');

// Load Lakshya model
require('../models/Annexure-1/Lakshya')
const Lakshya = mongoose.model('lakshya');

// Load magazine/newsletter model
require('../models/Annexure-1/MagazineNewsletter')
const MagazineNewsletter = mongoose.model('magazine-newsletter');

// Load STTP model
require('../models/Annexure-1/STTP')
const STTP = mongoose.model('sttp');

// Load Department UG projects model
require('../models/Annexure-1/DepartmentUGProjects')
const DepartmentUGProjects = mongoose.model('department-ug-projects');

// Time table load route
router.get('/timeTable', (req, res) => {
    res.render('annexure-1/timeTable');
});

// Class advisor load route
router.get('/classAdvisor', (req, res) => {
    res.render('annexure-1/classAdvisor');
});

// Sports activity load route
router.get('/sportsActivities', (req, res) => {
    res.render('annexure-1/sportsActivities');
});

// Cultural activity load route
router.get('/culturalActivities', (req, res) => {
    res.render('annexure-1/culturalActivities');
});

// project based learning load route
router.get('/projectBasedLearning', (req, res) => {
    res.render('annexure-1/projectBasedLearning');
});

// udaan load route
router.get('/udaan', (req, res) => {
    res.render('annexure-1/udaan');
});

// Placement activities load route
router.get('/placementActivities', (req, res) => {
    res.render('annexure-1/placementActivities');
});

// Inhouse placement load route
router.get('/inhousePlacement', (req, res) => {
    res.render('annexure-1/inhousePlacement');
});

// student organization load route
router.get('/studentOrganizations', (req, res) => {
    res.render('annexure-1/studentOrganizations');
});

// Industrial visit load route
router.get('/industrialVisitActivities', (req, res) => {
    res.render('annexure-1/industrialVisitActivities');
});

// admission process activities load route
router.get('/admissionProcessActivities', (req, res) => {
    res.render('annexure-1/admissionProcessActivities');
});

// exam assesssment external load route
router.get('/examAssessmentExternal', (req, res) => {
    res.render('annexure-1/examAssessmentExternal');
});

// exam activities supervision route
router.get('/examActivitiesSupervision', (req, res) => {
    res.render('annexure-1/examActivitiesSupervision');
});

// exam activities college level route
router.get('/examActivitiesCollegeLevel', (req, res) => {
    res.render('annexure-1/examActivitiesCollegeLevel');
});

// IT Maintenance level route
router.get('/ITmaintenance', (req, res) => {
    res.render('annexure-1/ITmaintenance');
});

// Load Lakshya route
router.get('/lakshya', (req, res) => {
    res.render('annexure-1/lakshya');
});

// Load magazine/newletter route
router.get('/magazineNewsletter', (req, res) => {
    res.render('annexure-1/magazineNewsletter');
});

// sttp load route
router.get('/conductOfSTTP', (req, res) => {
    res.render('annexure-1/conductOfSTTP');
});

// Dept. UG Project load route
router.get('/departmentUGProjects', (req, res) => {
    res.render('annexure-1/departmentUGProjects');
});

//process time table form
router.post('/timetable', (req, res) => {
    // add preleave data into db
    const timeTableRecords = {
        role: req.body.role,
        department: req.body.department,
        semester: req.body.semester
    }
    new TimeTable(timeTableRecords)
        .save()
        .then(timetable => {
            res.redirect('/annexure-1/timeTable');
        });
});

//process class advisor form
router.post('/classadvisor', (req, res) => {
    // add preleave data into db
    const classAdvisorRecords = {
        class_name: req.body.class_name,
        department: req.body.department,
        semester: req.body.semester,
        duties: req.body.duties
    }
    new ClassAdvisor(classAdvisorRecords)
        .save()
        .then(classAdvisor => {
            res.redirect('/annexure-1/classAdvisor');
        });
});

//process sports activities form
router.post('/sportsActivities', (req, res) => {
    // add preleave data into db
    const sportsActivitiesRecords = {
        sports_name: req.body.sports_name,
        sports_category: req.body.sports_category,
        sports_role: req.body.sports_role,
        sports_ojus_or_other: req.body.sports_ojus_or_other
    }
    new SportsActivities(sportsActivitiesRecords)
        .save()
        .then(sportsactivities => {
            res.redirect('/annexure-1/sportsActivities');
        });
});

//process cultural activities form
router.post('/culturalActivities', (req, res) => {
    // add preleave data into db
    const culturalActivitiesRecords = {
        cultural_name: req.body.cultural_name,
        cultural_category: req.body.cultural_category,
        cultural_role: req.body.cultural_role,
        cultural_ojus_or_other: req.body.cultural_ojus_or_other
    }
    new CulturalActivities(culturalActivitiesRecords)
        .save()
        .then(culturalsactivities => {
            res.redirect('/annexure-1/culturalActivities');
        });
});

//process PBL activities form
router.post('/projectBasedLearning', (req, res) => {
    // add preleave data into db
    const projectBasedLearningRecords = {
        pbl_subject: req.body.pbl_subject,
        pbl_role: req.body.pbl_role,
        pbl_start_date: req.body.pbl_start_date,
        pbl_end_date: req.body.pbl_end_date,
        pbl_description: req.body.pbl_description
    }
    new ProjectBasedLearning(projectBasedLearningRecords)
        .save()
        .then(projectBasedLearning => {
            res.redirect('/annexure-1/projectBasedLearning');
        });
});

//process Udaan activities form
router.post('/udaan', (req, res) => {
    // add preleave data into db
    const udaanRecords = {
        udaan_subject: req.body.udaan_subject,
        udaan_contribution: req.body.udaan_contribution,
        udaan_start_date: req.body.udaan_start_date,
        udaan_end_date: req.body.udaan_end_date
    }
    new Udaan(udaanRecords)
        .save()
        .then(udaan => {
            res.redirect('/annexure-1/udaan');
        });
});

//process placement activities form
router.post('/placementActivities', (req, res) => {
    // add preleave data into db
    const placementActivitiesRecords = {
        placement_role: req.body.placement_role,
        no_of_companies: req.body.no_of_companies,
        no_of_placed_students: req.body.no_of_placed_students,
        department: req.body.department
    }
    new PlacementActivities(placementActivitiesRecords)
        .save()
        .then(placementActivities => {
            res.redirect('/annexure-1/placementActivities');
        });
});

//process inhouse placement form
router.post('/inhousePlacement', (req, res) => {
    // add preleave data into db
    const inhousePlacementRecords = {
        trainings_and_workshops: req.body.trainings_and_workshops,
        class_name: req.body.class_name,
        department: req.body.department,
        no_of_participants: req.body.no_of_participants
    }
    new InhousePlacement(inhousePlacementRecords)
        .save()
        .then(inhousePlacement => {
            res.redirect('/annexure-1/inhousePlacement');
        });
});

//process student organizations form
router.post('/studentOrganizations', (req, res) => {
    // add preleave data into db
    const studentOrganizationRecords = {
        student_organizations_trainings: req.body.student_organizations_trainings,
        class_name: req.body.class_name,
        department: req.body.department,
        no_of_participants: req.body.no_of_participants,
        student_organization_role: req.body.student_organization_role,
        student_event_duration: req.body.student_event_duration,
        student_event_start_date: req.body.student_event_start_date,
        student_event_end_date: req.body.student_event_end_date
    }
    new StudentOrganizations(studentOrganizationRecords)
        .save()
        .then(studentOrganization => {
            res.redirect('/annexure-1/studentOrganizations');
        });
});

//process Industrial visit activities form
router.post('/industrialVisitActivities', (req, res) => {
    // add preleave data into db
    const industrialVisitRecords = {
        industrial_visit_role: req.body.industrial_visit_role,
        class_name: req.body.class_name,
        department: req.body.department,
        industrial_visit_days: req.body.industrial_visit_days,
        industrial_visit_organizer: req.body.industrial_visit_organizer,
        name_of_company: req.body.name_of_company,
        iv_description: req.body.iv_description,
        industrial_visit_hrs: req.body.industrial_visit_hrs,
        iv_start_date: req.body.iv_start_date,
        iv_end_date: req.body.iv_end_date
    }
    new IndustrialVisitActivities(industrialVisitRecords)
        .save()
        .then(industrialVisit => {
            res.redirect('/annexure-1/industrialVisitActivities');
        });
});

//process admission process activities form
router.post('/admissionProcessActivities', (req, res) => {
    // add preleave data into db
    const admissionProcessRecords = {
        admission_role: req.body.admission_role,
        admission_duties: req.body.admission_duties,
        admission_class: req.body.admission_class,
        admission_start_date: req.body.admission_start_date,
        admission_end_date: req.body.admission_end_date
    }
    new AdmissionProcessActivities(admissionProcessRecords)
        .save()
        .then(industrialVisit => {
            res.redirect('/annexure-1/admissionProcessActivities');
        });
});

//process exam assessment external form
router.post('/examAssessmentExternal', (req, res) => {
    // add preleave data into db
    const examAssessmentRecords = {
        exam_role_external: req.body.exam_role_external,
        semester: req.body.semester,
        name_of_college_university: req.body.name_of_college_university,
        exam_subject_external: req.body.exam_subject_external,
        outdoor_activities: req.body.outdoor_activities,
        papers_revaluated: req.body.papers_revaluated
    }
    new ExamAssessmentExternal(examAssessmentRecords)
        .save()
        .then(examAssessment => {
            res.redirect('/annexure-1/examAssessmentExternal');
        });
});

//process exam assessment external form
router.post('/examActivitiesSupervision', (req, res) => {
    // add preleave data into db
    const examActivitiesSupervisionRecords = {
        exam_role: req.body.exam_role,
        exam_name: req.body.exam_name,
        morning_sessions: req.body.morning_sessions,
        evening_sessions: req.body.evening_sessions,
        no_of_supervision_days: req.body.no_of_supervision_days
    }
    new ExamActivitiesSupervision(examActivitiesSupervisionRecords)
        .save()
        .then(examActivitiesSupervision => {
            res.redirect('/annexure-1/examActivitiesSupervision');
        });
});

//process exam activities college level form
router.post('/examActivitiesCollegeLevel', (req, res) => {
    // add preleave data into db
    const examActivitiesCollegeLevel = {
        subject_name: req.body.subject_name,
        semester: req.body.semester,
        exam_type: req.body.exam_type
    }
    new ExamActivitiesCollegeLevel(examActivitiesCollegeLevel)
        .save()
        .then(examActivitiesCollege => {
            res.redirect('/annexure-1/examActivitiesCollegeLevel');
        });
});

//process inhouse placement form
router.post('/ITmaintenance', (req, res) => {
    // add preleave data into db
    const ITmaintenance = {
        class_name: req.body.class_name,
        IT_maintenance_desc: req.body.IT_maintenance_desc,
        IT_maintenance_task: req.body.IT_maintenance_task,
        it_maintenance_date: req.body.it_maintenance_date
    }
    new ITMaintenance(ITmaintenance)
        .save()
        .then(ITmaintenance => {
            res.redirect('/annexure-1/ITmaintenance');
        });
});

//process lakshya form
router.post('/lakshya', (req, res) => {
    // add preleave data into db
    const lakshyaRecords = {
        lakshya_activities: req.body.lakshya_activities,
        lakshya_description: req.body.lakshya_description,
        lakshya_date: req.body.lakshya_date,
        lakshya_no_of_participants: req.body.lakshya_no_of_participants
    }
    new Lakshya(lakshyaRecords)
        .save()
        .then(lakshyaData => {
            res.redirect('/annexure-1/lakshya');
        });
});

//process magazine/newsletter form
router.post('/magazineNewsletter', (req, res) => {
    // add preleave data into db
    const magazineNewsletterRecords = {
        class_name: req.body.class_name,
        magazine_role: req.body.magazine_role,
        magazineNewsletter_type: req.body.magazineNewsletter_type,
        year_of_publication: req.body.year_of_publication
    }
    new MagazineNewsletter(magazineNewsletterRecords)
        .save()
        .then(magazineNewsletter => {
            res.redirect('/annexure-1/magazineNewsletter');
        });
});

//process student organizations form
router.post('/conductOfSTTP', (req, res) => {
    // add preleave data into db
    const conductOfSTTPRecords = {
        sttp_role: req.body.sttp_role,
        no_of_sttp: req.body.no_of_sttp,
        sttp_technology: req.body.sttp_technology,
        sttp_duration: req.body.sttp_duration,
        sttp_start_date: req.body.sttp_start_date,
        sttp_end_date: req.body.sttp_end_date,
        sttp_participants: req.body.sttp_participants,
        department: req.body.department
    }
    new STTP(conductOfSTTPRecords)
        .save()
        .then(sttp => {
            res.redirect('/annexure-1/conductOfSTTP');
        });
});

//process class advisor form
router.post('/departmentUGProjects', (req, res) => {
    // add preleave data into db
    const departmentUGProjectRecords = {
        dept_project_role: req.body.dept_project_role,
        project_title: req.body.project_title,
        project_no_of_students: req.body.project_no_of_students
    }
    new DepartmentUGProjects(departmentUGProjectRecords)
        .save()
        .then(departmentUGProject => {
            res.redirect('/annexure-1/departmentUGProjects');
        });
});

module.exports = router;