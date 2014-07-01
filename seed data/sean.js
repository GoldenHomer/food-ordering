db.assignmentcollection.remove({});

db.assignmentcollection.insert({
   'phase': 'phase1', 
   'sprint': 'sprint1',
   'assignment': [
   	   {'name': 'Bill', 'score': 91},
   	   {'name': 'Jose', 'score': 95},
   	   {'name': 'Peter', 'score': 99},
   	   {'name': 'Sean', 'score': 84},
   	   {'name': 'Taylor', 'score': 89}
   ],
   'questionlist': [
       {'question': 'Why?'},
       {'question': 'When?'}
   ],
   'answerlist': [
       {'answer': 'Because'},
       {'answer': 'Later'}
   ],
   'tasklist': [
       {'task': 'Introduction to HTML5'},
       {'task': 'Tasks: creating HTML5 Web pages with HTML5 techonologies'},
       {'task': 'Overview of HTML5 techonologies'},
       {'task': 'CSS3'},
       {'task': 'SVG'}
   ]
});

db.assignmentcollection.insert({
   'phase': 'phase1', 
   'sprint': 'sprint2',
   'assignment': [
   	   {'name': 'Bill', 'score': 97},
   	   {'name': 'Jose', 'score': 80},
   	   {'name': 'Peter', 'score': 86},
   	   {'name': 'Sean', 'score': 86},
   	   {'name': 'Taylor', 'score': 86}
   ],
   'questionlist': [
       {'question': 'item1'},
       {'question': 'item2'},
       {'question': 'item3'},
       {'question': 'item4'}
   ],
   'answerlist': [
       {'answer': 'item1'},
       {'answer': 'item2'},
       {'answer': 'item3'},
       {'answer': 'item4'}
   ]
});

db.assignmentcollection.insert({
   'phase': 'phase2', 
   'sprint': 'sprint1',
   'assignment': [
   	   {'name': 'Bill', 'score': 97},
   	   {'name': 'Jose', 'score': 90},
   	   {'name': 'Peter', 'score': 92},
   	   {'name': 'Sean', 'score': 88},
   	   {'name': 'Taylor', 'score': 86}
   ],
   'questionlist': [
       {'question': 'item1'},
       {'question': 'item2'},
       {'question': 'item3'},
       {'question': 'item4'},
       {'question': 'item5'}

   ],
   'answerlist': [
       {'answer': 'item1'},
       {'answer': 'item2'},
       {'answer': 'item3'},
       {'answer': 'item4'},
       {'answer': 'item5'}
   ],
   'tasklist': [
       {'task': 'item1'},
       {'task': 'item2'},
       {'task': 'item3'},
       {'task': 'item4'},
       {'task': 'item5'}
   ]
});

db.assignmentcollection.insert({
   'phase': 'phase2', 
   'sprint': 'sprint2',
   'assignment': [
   	   {'name': 'Bill', 'score': 91},
   	   {'name': 'Jose', 'score': 95},
   	   {'name': 'Peter', 'score': 99},
   	   {'name': 'Sean', 'score': 84},
   	   {'name': 'Taylor', 'score': 89}
   ],
   'questionlist': [],
   'answerlist': []
});
db.assignmentcollection.find().pretty();

