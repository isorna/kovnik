/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  
  app.IMG_PLACEHOLDER = 'data:image/gif;base64,R0lGODdhyADIAOMAAO7u/5aWlqGho9jY5OPj8cLCyqyssLe3vc3N1wAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAyADIAAAE/hDISau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS06kB1tYqA9cUBQEFrgLWAgIqBOEBFNuu1gMs2ugT3d/rAe0r77bsFwMGAQLzEggc8AcQAIJwA+EBuKbQmgF+3iocDHBAXiZ9Fd6dAxhuo4R3/gwnGDgnkqE1BBM0XrN3CSOFgQYM+ouHEsFMAP1i2lQIAN8EhwS6kZPQ74BMnpZcTgiHkoA1AhKxAWDaU+pHqwvrVVVI1ScmpRIwYjxwTqo+r1vTafV6FmtSrRXEak0ooB+8tjzR4v251m0llwSgUnUaAOrJtFMDoESrty9XxYi/wk0sMEBMoRKo7iRK8SiFxu285vQMoIDR0qdNN+rmbxxJlRFLi7u22OG1mDjP4bYb2uFVf+r0CZ+cyOS1oRD/cUM4cN5EA3bDhszqWOHEhBLIZh+qHdnmaFABwIwm9BxLZxAtn6fGvr379/Djy59Pv779+/jz69/Pv7///wAGQyjggAQWaOCBCCao4IIMNujggxBGKOGEFFZo4YUYZqjhhhx26OGHIIYo4ogklmjiiSimqOKKLLbo4oswxijjjDRKEQEAOw==';
  app.LANG = navigator.language;

  app.displayInstalledToast = function() {
    document.querySelector('#caching-complete').show();
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
  });

  // Main area's paper-scroll-header-panel custom condensing transformation of
  // the appName in the middle-container and the bottom title in the bottom-container.
  // The appName is moved to top and shrunk on condensing. The bottom sub title
  // is shrunk to nothing on condensing.
  addEventListener('paper-header-transform', function(e) {
    var appName = document.querySelector('.app-name');
    var middleContainer = document.querySelector('.middle-container');
    var bottomContainer = document.querySelector('.bottom-container');
    var detail = e.detail;
    var heightDiff = detail.height - detail.condensedHeight;
    var yRatio = Math.min(1, detail.y / heightDiff);
    var maxMiddleScale = 0.50;  // appName max size when condensed. The smaller the number the smaller the condensed size.
    var scaleMiddle = Math.max(maxMiddleScale, (heightDiff - detail.y) / (heightDiff / (1-maxMiddleScale))  + maxMiddleScale);
    var scaleBottom = 1 - yRatio;

    // Move/translate middleContainer
    Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer);

    // Scale bottomContainer and bottom sub title to nothing and back
    Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);

    // Scale middleContainer appName
    Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appName);
  });

  // Close drawer after menu item is selected if drawerPanel is narrow
  app.onMenuSelect = function() {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };
  
  // Build scenarios' url's
  app.getScenarioUrl = function (scenarioId) {
    return '/scenarios/' + scenarioId;
  };
  
  // Return scenario data by id
  app.getSecenarioById = function (scenarioId) {
    return app.db_scenarios.items[app.LANG].filter(function (item) {
      return item.id == scenarioId;
    })[0];
  };
  
  // Build objective' url's
  app.getObjectiveUrl = function (objectiveId) {
    return '/objectives/' + objectiveId;
  };
  
  // Return objective data by id
  app.getObjectiveById = function (objectiveId) {
    return app.db_objectives.items[app.LANG].filter(function (item) {
      return item.id == objectiveId;
    })[0];
  };
  
  // Return objective rule names
  app.getObjectiveRuleNames = function (objective) {
    var returnValue = '',
      computedValue = [];
    
    objective.rules.forEach(function (element, index, array) {
      computedValue.push(element.name); 
    });
    
    returnValue = computedValue.join(', ');
    
    return returnValue;
  };
  
  app.showSliderValue = function (e) {
    console.log(e.target.value);
  };
  
  // Return scenario image's url's
  app.getScenarioImageUrl = function (imageUrl) {
    return imageUrl;
  };
  
  // Return a translated string from a boolean string
  app.getBoolean = function (booleanString) {
    return (booleanString === 'true') ? app.i18n('yes', app.LANG, app.ui_dictionary) : app.i18n('no', app.LANG, app.ui_dictionary);
  };
  
  // Return a random scenario url
  app.getRandomScenarioUrl = function () {
    page(app.getScenarioUrl(app.db_scenarios.items[app.LANG][Math.round(Math.random()*7,0)].id));
  };
  
  // Translation filter
  app.i18n = function(key, lang, dictionary) {
      return (dictionary) ? dictionary[key][lang] : app.ui_dictionary[key][lang];
  };
  
  app.translateApp = function () {
    app.LANG = (app.LANG === 'es') ? 'en' : 'es';
    //app.fire('dom-change');
  };
  
  // Returns an array fixture
  app.getArrayFixture = function (arraySize) {
    var returnValue = [],
      i = 0;
    
    for (i = 0; i < arraySize; i++){
      returnValue.push(i);
    }
    
    return returnValue;
  };
  
  // Returns true if number is a multiple of 5
  app.isMod5 = function (numericValue){
    return (numericValue % 5 === 0);
  };

})(document);
