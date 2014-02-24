'use strict';

(function($LAB, bootstrap) {
    bootstrap();

    $LAB.runQueue()
    .script([
        'scripts/controllers/NavbarCtrl.js',
        'scripts/controllers/HomeCtrl.js',
        'scripts/controllers/DietCtrl.js',
        'scripts/controllers/IntelligenceCtrl.js',
        'scripts/controllers/DiseaseCtrl.js',
        'scripts/controllers/RecordCtrl.js',
        'scripts/controllers/MilkDetailCtrl.js',
        'scripts/controllers/TopicDetailCtrl.js',
        'scripts/controllers/DietGraphCtrl.js',
        'scripts/controllers/MedicalDetailCtrl.js',
        'scripts/controllers/QuestionnaireCtrl.js'
    ]).wait(function() {
        angular.bootstrap(document, ['app']);
    });
})($LAB, bootstrap);
