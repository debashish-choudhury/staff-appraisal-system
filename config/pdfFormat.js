const modules = require('./modules');

    var loads = [modules.TeachingLoad.findOne({ user: req.user.id }).exec(),
    modules.TeachingAssistant.findOne({ user: req.user.id }).exec(),
    modules.NewBooks.findOne({ user: req.user.id }).exec(),
    modules.AddedExp.findOne({ user: req.user.id }).exec(),
    modules.Innovation.findOne({ user: req.user.id }).exec(),

    modules.Leave.findOne({ user: req.user.id }).exec(),

    modules.TimeTable.findOne({ user: req.user.id }).exec(),
    modules.ClassAdvisor.findOne({ user: req.user.id }).exec(),
    modules.SportsActivities.findOne({ user: req.user.id }).exec(),
    modules.CulturalActivities.findOne({ user: req.user.id }).exec(),
    modules.ProjectBasedLearning.findOne({ user: req.user.id }).exec(),
    modules.Udaan.findOne({ user: req.user.id }).exec(),
    modules.PlacementActivities.findOne({ user: req.user.id }).exec(),
    modules.InhousePlacement.findOne({ user: req.user.id }).exec(),
    modules.StudentOrganizations.findOne({ user: req.user.id }).exec(),
    modules.IndustrialVisitActivities.findOne({ user: req.user.id }).exec(),
    modules.AdmissionProcessActivities.findOne({ user: req.user.id }).exec(),
    modules.ExamAssessmentExternal.findOne({ user: req.user.id }).exec(),
    modules.ExamActivitiesSupervision.findOne({ user: req.user.id }).exec(),
    modules.ExamActivitiesCollegeLevel.findOne({ user: req.user.id }).exec(),
    modules.ITMaintenance.findOne({ user: req.user.id }).exec(),
    modules.Lakshya.findOne({ user: req.user.id }).exec(),
    modules.MagazineNewsletter.findOne({ user: req.user.id }).exec(),
    modules.STTP.findOne({ user: req.user.id }).exec(),
    modules.DepartmentUGProjects.findOne({ user: req.user.id }).exec(),

    modules.PapersPublishedNationalConf.findOne({ user: req.user.id }).exec(),
    modules.PapersPublishedInternationalConf.findOne({ user: req.user.id }).exec(),
    modules.PapersPublishedJournals.findOne({ user: req.user.id }).exec(),
    modules.Moocs.findOne({ user: req.user.id }).exec(),
    modules.Swayam.findOne({ user: req.user.id }).exec(),
    modules.ShortTermTraining.findOne({ user: req.user.id }).exec(),
    modules.Seminars.findOne({ user: req.user.id }).exec(),

    modules.ResourcePerson.findOne({ user: req.user.id }).exec(),
    modules.ContributionToSyllabus.findOne({ user: req.user.id }).exec(),
    modules.MemberOfUniversityCommitte.findOne({ user: req.user.id }).exec(),
    modules.ConsultancyAssignment.findOne({ user: req.user.id }).exec(),
    modules.ExternalProjectsOrCompetition.findOne({ user: req.user.id }).exec()
    ];


// module.exports = loads;