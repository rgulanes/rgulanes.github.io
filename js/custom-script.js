$(document).ready(function () {
	var otherJobs = $('#other-jobs'),
      itRelatedJobs = $('#itrelated-jobs'),
      licensesCerts = $('#licenses-certifications'),
      courseAttended = $('#courses-attended'),
      acadCareer = $('#academic-career'),
      programmingRelated = $('#programming-skill'),
      softwareRelated = $('#softwarerelated-skill'),
      otherRelated = $('#otherrelated-skill');

  // Work Experience
  $.get('./json/work-experience.json?v=' + (new Date().getTime()), function (data) {
    var itWork = data.itrelated, otherWork = data.otherjob;

    itRelatedJobs.html('');
    otherJobs.html('');
    $('#current-position').html('');
    $.each(itWork, function (index, info) {
      if (info.show) {
        var duties = '', achievements = '';

        if (info.duties.length) {
          $.each(info.duties, function (i, duty) {
            duties += ('<li>' + duty + '</li>');
          });
        }

        if (info.is_current) {
          $('#current-position').html(info.position);
        }

        if (info.achievements.length) {
          $.each(info.achievements, function (i, achievement) {
            achievements += ('<li>' + achievement + '</li>');
          });
        }

        var html = [
          '<div class="experience margin-b-50">',
          '<h4 class="text-uppercase text-bold">' + info.position + '</h4>',
          '<h5 class="font-yellow text-uppercase text-bold">',
          info.company,
          (info.division ? '<br><small>' + info.division + '</small>' : ''),
          '</h5>',
          '<h6 class="font-lite-black margin-tb-10 text-uppercase">' + info.duration + '</h6>',
          (info.duties.length ? '<p class="margin-tb-10">Summary of Actual Duties:</p>' : ''),
          (info.duties.length ? '<ul class="list margin-b-30 text-sm">' : ''),
          (info.duties.length ? duties : ''),
          (info.duties.length ? '</ul>' : ''),
          (info.achievements.length ? '<p class="margin-tb-10">Key achievement(s):</p>' : ''),
          (info.achievements.length ? '<ul class="list margin-b-30 text-sm">' : ''),
          (info.achievements.length ? achievements : ''),
          (info.achievements.length ? '</ul>' : ''),
          '</div>'
        ].join('');

        itRelatedJobs.append(html);
      }
    });

    $.each(otherWork, function (index, info) {
      if (info.show) {
        var duties = '', achievements = '';

        if(info.duties.length) {
          $.each(info.duties, function (i, duty) {
            duties += ('<li>' + duty + '</li>');
          });
        }

        if (info.is_current) {
          $('#current-position').html(info.position);
        }

        if (info.achievements.length) {
          $.each(info.achievements, function (i, achievement) {
            achievements += ('<li>' + achievement + '</li>');
          });
        }

        var html = [
          '<div class="experience margin-b-50">',
            '<h4 class="text-uppercase text-bold">'+ info.position +'</h4>',
            '<h5 class="font-yellow text-uppercase text-bold">',
              info.company,
              (info.division ? '<br><small>' + info.division + '</small>' : '' ),
            '</h5>',
            '<h6 class="font-lite-black margin-tb-10 text-uppercase">'+ info.duration +'</h6>',
            (info.duties.length ? '<p class="margin-tb-10">Summary of Actual Duties:</p>' : ''),
            (info.duties.length ? '<ul class="list margin-b-30 text-sm">' : ''),
            (info.duties.length ? duties : ''),
            (info.duties.length ? '</ul>' : ''),
            (info.achievements.length ? '<p class="margin-tb-10">Key achievement(s):</p>' : ''),
            (info.achievements.length ? '<ul class="list margin-b-30 text-sm">' : ''),
            (info.achievements.length ? achievements : ''),
            (info.achievements.length ? '</ul>' : ''),
          '</div>'
        ].join('');

        otherJobs.append(html);
      }
    });
  });

  // Licenses and Certifications
  $.get('./json/licenses-certifications.json?v=' + (new Date().getTime()), function (data) {
    licensesCerts.html('');

    $.each(data, function (index, cert) {
      if(cert.show) {
        var html = [
          '<div class="experience margin-b-30">',
            '<h4 class="text-uppercase text-bold">'+ cert.title +'</h4>',
            '<h5 class="font-yellow text-uppercase text-bold">'+ cert.company +'</h5>',
            '<h6 class="font-lite-black text-uppercase">Issued '+ cert.issuance +'</h6>',
          '</div>'
        ].join('');

        licensesCerts.append(html);
      }
    });
  });

  // Courses Attended
  $.get('./json/courses-attended.json?v=' + (new Date().getTime()), function (data) {
    courseAttended.html('');

    $.each(data, function (index, course) {
      if(course.show) {
        var html = [
          '<div class="experience margin-b-30">',
            '<h4 class="text-uppercase text-bold">'+ course.title +'</h4>',
            (course.subtitle ? '<h5 class="text-uppercase"><small>' + course.subtitle + '</small></h5>' : '' ),
            '<h5 class="font-yellow text-uppercase text-bold">',
              course.company,
              (course.division ? '<br/><small>' + course.division + '</small>' : '' ),
            '</h5>',
            '<h6 class="font-lite-black text-uppercase">'+ course.date +'</h6>',
          '</div>'
        ].join('');

        courseAttended.append(html);
      }
    });
  });

  // Education
  $.get('./json/academic-career.json?v=' + (new Date().getTime()), function (data) {
    acadCareer.html('');

    $.each(data, function (index, school) {
      if(school.show) {
        var distinctions = '';

        if(school.distinctions.length) {
          $.each(school.distinctions, function (i, data) {
            var award = [
              '<span class="margin-2 text-sm badge badge-pill text-bold '+ (data.is_honor ? 'badge-success' : 'badge-default') +'">',
                data.name,
              '</span>'
            ].join('');

            distinctions += award;
          });
        }

        var html = [
          '<div class="education margin-b-50">',
            '<h4 class="text-uppercase text-bold">'+ school.name +'</h4>',
          (school.degree ? '<h5 class="font-yellow text-uppercase text-bold">'+ school.degree +'</h5>' : ''),
            '<h6 class="font-lite-black text-uppercase">'+ school.date_graduated +'</h6>',
            (school.distinctions.length ? '<p class="margin-tb-10"><u class="text-sm">Honors and/or Awards:</u> <br>'+ distinctions +'</p>' : ''),
          '</div>'
        ].join('');

        acadCareer.append(html);
      }
    });
  });

  // Skills and Knowledge
  $.get('./json/skills-knowledge.json?v=' + (new Date().getTime()), function (response) {
    programmingRelated.find('div.panel-desc').html('');
    softwareRelated.find('div.panel-desc').html('');
    otherRelated.find('div.panel-desc').html('');

    $.each(response.data, function (index, skill) {
      if(skill.show) {
        var html = [
          '<div class="col-sm-12 col-md-6">',
            '<div class="line-progress margin-b-5" data-prog-percent=".'+ skill.rate +'" data-prog-text="">',
              '<p class="progress-title text-bold">',
                skill.description,
              '</p>',
              '<div></div>',
            '</div>',
          '</div>'
        ].join('');

        switch(skill.classification) {
          case 1 : 
            programmingRelated.find('div.panel-desc').append(html);
            break;
          case 2 : 
            softwareRelated.find('div.panel-desc').append(html);
            break;
          case 3 : 
            otherRelated.find('div.panel-desc').append(html);
            break;
        }
      }
    });
    
    enableLineProgress();
  });
});