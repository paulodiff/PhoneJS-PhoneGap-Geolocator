MyApp.setup = function (params) {


  
	
	
	var employees = [
        {
            key: 'Managment',
            items : [
                { name: "Bob", hired: 2005 },
                { name: "John", hired: 2007 },
                { name: "Frank", hired: 2001 },
                { name: "Robert", hired: 2007 },
            ]
        },
        {
            key: 'Manufacturing',
            items: [
                    { name: "Paul", hired: 2011 },
                    { name: "Elizabeth", hired: 2000 },
                    { name: "Mary", hired: 2002 },
                    { name: "Michael", hired: 2003 },
                    { name: "George", hired: 2002 },
            ]
        },
        {
            key: 'Sales',
            items: [
                { name: "Deborah", hired: 2000 },
                { name: "Lisa", hired: 1999 },
                { name: "Mark", hired: 2011 },
                { name: "Joseph", hired: 2000 }
            ]
        }
    ];
	
	
	var toolbar = {
            items: [
              {
                  align: "left",
                  widget: "button",
                  options: {
                      type: "back",
                      text: "Back",
                      clickAction: function(e) {
                           MyApp.app.navigate('home');;
                      }
                  }
              },
              {
                  align: "right",
                  widget: "button",
                  options: {
                      icon: "plus",
                      clickAction: viewShown1
                  }
              },
              {
                  align: "right",
                  widget: "dropDownMenu",
                  options: {
                      items: [
                          "Add",
                          "Edit",
                          "Remove"
                      ]
                  }
              },
              {
                  align: "center",
                  text: "Toolbar"
              }
            ]
    };	

	
	var	messaggio = ko.observable('Setup');
	var	titolo = 'Setup111111';
		
	function viewShown1() {
           alert('1backxxxxx1');
		   // get array push item
		   
		   var my_item = {
			 key: 'Managment01'
		   }
		   
		   this.employess.push(my_item);
    };
		
    function viewShown2() {
           alert('2backxxxxx');
    };  
		
	function editGoals() {
		 MyApp.app.navigate('EditList/goal');
	};
	
	
	
	function editExercises() {};
	function editEquipment() {};
    

    return {
		employees: employees,
		toolbar: toolbar,
		
		messaggio: messaggio,
		titolo: titolo,
		
		viewShown1: viewShown1,
		viewShown2: viewShown2,
		
		editGoals: editGoals,
		editExercises: editExercises,
		editEquipment: editEquipment

	};
};