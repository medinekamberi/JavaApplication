const APIURL = 'http://localhost:8080/api';

$.ajax({
    type: 'GET',
    url: APIURL + '/todo',
    success: function(response) {
        for(let i = response.length -1; i >= 0; i--) {

            $('#list').append(
                `<li class="list-group-item d-flex align-items-center" id=${response[i].id}>
                    <div style="display: flex; align-items: center; width: 100%">
                        <div style="flex-grow: 4;">
                        ${response[i].title}
                        </div>
                        <div style="flex-grow: 4;">
                        ${response[i].description}
                        </div>
                        <div style="justify-content: space-between; flex-grow: 1; text-align: end;">
                            <button class="btn btn-light" data-toggle="modal" data-target="#edit-modal">Edit</button>
                            <button class="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </li>`
                )
        }
    },
    error: function(err) {
        console.log(err)
    }
})

$('#add').click((e) => {
    e.preventDefault();
    e.stopPropagation();
    let obj = {
        description: $('#inputDescription').val(),
        title: $('#inputTitle').val()
    }
    $.ajax({
        type: 'POST',
        url: APIURL + '/todo',
        data: JSON.stringify(obj),
        dataType: 'json',
        contentType: 'application/json',
        success: (res) => {
            
            $('#list').prepend(
                `<li class="list-group-item d-flex align-items-center" id=${res.id}>
                    <div style="display: flex; align-items: center; width: 100%">
                        <div style="flex-grow: 4;">
                        ${res.title}
                        </div>
                        <div style="flex-grow: 4;">
                        ${res.description}
                        </div>
                        <div style="justify-content: space-between; flex-grow: 1; text-align: end;">
                            <button class="btn btn-light" data-toggle="modal" data-target="#edit-modal">Edit</button>
                            <button class="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </li>`
                )
            $('#inputTitle').val('');
            $('#inputDescription').val('');
        },
        error: (err) => {
            console.log(err);
        }
    })

})

$(document).on('click', '.btn-danger', (e) => {
    let id = $(e.target).parent().parent().parent().attr('id');
    $.ajax({
        type: 'DELETE',
        url: APIURL + '/todo/' + id,
        success: (res) => {
            if (res.id == id) {
                $(e.target).parent().parent().parent().remove();
            }
        },
        error: (err) => {
            console.log(err);
        }
    })
})
let id;
$(document).on('click', '.btn-light', (e) => {
    id = $(e.target).parent().parent().parent().attr('id');
    $.ajax({
        type: 'GET',
        url: APIURL + '/todo/' + id,
        success: (res) => {
            $('#editTitle').val(res.title);
            $('#editDescription').val(res.description);
        },
        error: (err) => {
            console.log(err);
        }
    })
})

$('#saveChanges').click((e) => {
    e.preventDefault();
    e.stopPropagation();
    let obj = {
        title: $('#editTitle').val(),
        description: $('#editDescription').val(),
        id: id 
    };

    $.ajax({
        type: 'PUT',
        url: APIURL + '/todo/' + id,
        contentType: 'application/json',
        data: JSON.stringify(obj),
        dataType: 'json',
        success: (res) => {
            location.reload();
        },
        error: (err) => {
            console.log(err);
        }
    })
})