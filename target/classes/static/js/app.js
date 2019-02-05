const APIURL = 'http://localhost:8080/api';

$.ajax({
    type: 'GET',
    url: APIURL + '/todo',
    dataType: 'json',
    success: function(response) {
        let d = JSON.parse(response);
        console.log(d);
        console.log('hello')
    },
    error: function(err) {
        console.log(err)
    }
    
})