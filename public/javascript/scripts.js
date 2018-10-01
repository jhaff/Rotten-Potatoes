let currentUrl = new URL(window.location.href);
let currentPath = currentUrl.pathname.split('/');
let movieId = currentPath[2];
let reviewId = currentPath[4];

function deleteReview(index) {
    let reviewId = document.getElementById("deleteReview" + index).getAttribute("review-id");
    axios.delete('/admin/reviews/' + reviewId).then(function(response) {
        console.log(response);
        document.getElementById("admin-" + reviewId).remove();
    });
}

window.onload = function() {

    // we get the form from the handlebard/html form
    let newCommentForm = document.getElementById("newComment");
    document.getElementById("newComment").addEventListener("submit", e => {

        e.preventDefault();

        // Serialize the array in JSON
        let comment = $(newCommentForm).serialize();

        // use axios to initialize a post request and send the form data
        axios.post(`/movies/${comment.movieId}/reviews/comments`, comment)
            .then(function(response) {

                // we get the comment on a JSON format from the response
                let newComment = response.data.comment;
                newCommentForm.reset();

                $('#comments').prepend(
                    `
                    <div class="card" id="${response.data.comment._id}">
                        <div class="card-block">
                        <p class="card-text">${newComment.content}</p>
                            <p>

                                <button class="btn btn-link delete-comment"  data-comment-id=${response.data.comment._id}>Delete</button>
                            </p>
                        </div>
                    </div>
                `
                );
            })
            .catch(function(error) {
                console.log(error);
                alert('There was a problem saving your comment. Please try again.')
            });
    });

    document.querySelector('.delete-comment').addEventListener('click', (e) => {
        
        let commentId = $(e.target).attr('data-comment-id');
       
        axios.delete(`/movies/${movieId}/reviews/comments/${commentId}`)
            .then(response => {
                console.log(response);
                $(`#${commentId}`).remove();
            })
            .catch(error => {
                console.log(error);
                alert("DELETE FAILED");
            });
    });
}
