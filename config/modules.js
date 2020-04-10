const express = require('express');
const mongoose = require('mongoose');

// Academic Performance
// Load teaching model
require('../models/AcademicPerformance/TeachingLoad')
const TeachingLoad = mongoose.model('teachingload');

// Load teaching assistant model
require('../models/AcademicPerformance/TeachingAssistant')
const TeachingAssistant = mongoose.model('teachingassistant');

//load new books info model
require('../models/AcademicPerformance/NewBooks');
const NewBooks = mongoose.model('newbooks');

//load added exxperiments info model
require('../models/AcademicPerformance/AddedExp');
const AddedExp = mongoose.model('addedexp');

// Load innovative teaching technique model
require('../models/AcademicPerformance/Innovation')
const Innovation = mongoose.model('innovation');

// Leave record
require('../models/Leave');
const Leave = mongoose.model('leaves');

// Annexure 1
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

// Annexure 2 dbs
// Load paper published in national conference model
require('../models/Annexure-2/PapersPublishedNationalConf');
const PapersPublishedNationalConf = mongoose.model('paper-published-national-conf');

// Load paper published in international conference model
require('../models/Annexure-2/PapersPublishedInternationalConf');
const PapersPublishedInternationalConf = mongoose.model('paper-published-international-conf');

// Load paper published in journals model
require('../models/Annexure-2/PapersPublishedJournals');
const PapersPublishedJournals = mongoose.model('paper-published-journals');

// Load moocs model
require('../models/Annexure-2/Moocs');
const Moocs = mongoose.model('moocs');

// Load swayam model
require('../models/Annexure-2/Swayam');
const Swayam = mongoose.model('swayam');

// Load short term training model
require('../models/Annexure-2/ShortTermTraining');
const ShortTermTraining = mongoose.model('Short-term-training');

// Load seminars model
require('../models/Annexure-2/Seminars');
const Seminars = mongoose.model('seminars');

// Ammexure 3 dbs
// Load resource person model
require('../models/Annexure-3/ResourcePerson');
const ResourcePerson = mongoose.model('resource_person');

// Load resource person model
require('../models/Annexure-3//ContributionToSyllabus');
const ContributionToSyllabus = mongoose.model('Contribution_to_Syllabus');

// Load resource person model
require('../models/Annexure-3//MemberOfUniversityCommitte');
const MemberOfUniversityCommitte = mongoose.model('Member_of_University_Commite');

// Load resource person model
require('../models/Annexure-3//ConsultancyAssignment');
const ConsultancyAssignment = mongoose.model('consultancy_assignment');

// Load resource person model
require('../models/Annexure-3/ExternalProjectsOrCompetition');
const ExternalProjectsOrCompetition = mongoose.model('external_projects_or_competition');

module.exports = {
    TeachingLoad, TeachingAssistant, NewBooks, AddedExp, Innovation,
    Leave, 
    TimeTable, ClassAdvisor, SportsActivities, CulturalActivities, ProjectBasedLearning, Udaan, PlacementActivities, InhousePlacement, StudentOrganizations, IndustrialVisitActivities, AdmissionProcessActivities, ExamAssessmentExternal, ExamActivitiesSupervision, ExamActivitiesCollegeLevel, ITMaintenance, Lakshya, MagazineNewsletter, STTP, DepartmentUGProjects, 
    PapersPublishedNationalConf, PapersPublishedInternationalConf,PapersPublishedJournals, Moocs, Swayam, ShortTermTraining, Seminars, 
    ResourcePerson, ContributionToSyllabus, MemberOfUniversityCommitte, ConsultancyAssignment, ExternalProjectsOrCompetition
}