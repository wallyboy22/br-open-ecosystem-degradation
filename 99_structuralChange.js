// get woody enchorachment and thinning in brazilian native vegetation 
// gt degradação - mapbiomas- dhemerson.costa@ipam.org.br

// read collection 8
var collection = ee.Image('projects/mapbiomas-workspace/public/collection8/mapbiomas_collection80_integration_v1');

// set native classes
var native_classes = [3, 4, 5, 6, 11, 12];

// ignore classes
var ignore_classes = [27, 33];

// set persistence rule to validate a temporal patch 
var persistence = 3;

// set years to be processed
var years_list = [1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
                  2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
                  2015, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];

// get native vegetation in the last year mask
var collection_last = collection.select('classification_' + years_list[years_list.length - 1])
  .remap({'from': native_classes.concat(ignore_classes),
          'to': ee.List.repeat({'value': 1, 'count': native_classes.concat(ignore_classes).length}),
          'defaultValue': 0 }
          ).selfMask();

// mask the entire collection 



// get palette
var vis = {
    'min': 0,
    'max': 62,
    'palette': require('users/mapbiomas/modules:Palettes.js').get('classification7')
};

// plot
Map.addLayer(collection.select('classification_' + years_list[years_list.length - 1]), vis, 'last year collection');
Map.addLayer(collection_last.randomVisualizer(), {}, 'native vegetation in the last year');
