var mockData = (function() {

    var data = {
        getMockContacts: getMockContacts,
        getLargeMockContacts: getLargeMockContacts
    };

    return data;

    ////////////

    function getMockContacts() {
        return [
            {
                'id': 1,
                'email': 'john.doe@test.com',
                'firstName': 'John',
                'lastName': 'Doe',
                'phone': '872-750-1127',
                'address': 'P.O. Box 197, 7318 Nascetur St.',
                'city': 'Fresno',
                'state': 'CO',
                'zip': '94787',
                'joinDate': '06/20/2015'
            },
            {
                'id': 2,
                'email': 'jane.doe@test.com',
                'firstName': 'Jane`',
                'lastName': 'Doe',
                'phone': '746-482-4391',
                'state': 'AR'
            },
            {
                'id': 3,
                'email': 'bill.anderson@test.com',
                'firstName': 'Bill',
                'lastName': 'Anderson',
                'phone': '455-159-1000',
                'state': 'CO'
            },
            {
                'id': 4,
                'email': 'jack.smith@test.com',
                'firstName': 'Jack',
                'lastName': 'Smith',
                'phone': '819-948-1563',
                'state': 'WA'
            },
            {
                'id': 5,
                'email': 'jill.johnson@test.com',
                'firstName': 'Jill',
                'lastName': 'Johnson',
                'phone': '866-238-2612',
                'state': 'NY'
            }
        ];
    }

    function getLargeMockContacts() {
        var i, item, name, state, list = [];
        for (i = 1; i <= 25; i++) {
            name = i < 10 ? '0' + i : '' + i;
            state = '' + (i % 5);
            item = {id: i, firstName: name, lastName: name, state: state};
            list.push(item);
        }
        return list;
    }

})();
