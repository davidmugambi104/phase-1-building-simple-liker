// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener('DOMContentLoaded', () => {
  const errorModal = document.getElementById('modal');
  const likeButtons = document.querySelectorAll('.like-glyph');

  // Step 1: Add the .hidden class to the error modal
  errorModal.classList.add('hidden');

  // Step 2: Handle click on empty heart
  likeButtons.forEach(button => {
    button.addEventListener('click', () => {
      mimicServerCall()
        .then(() => {
          // Step 2 - Success: Change heart to full and make it red
          button.classList.add('activated-heart');
          button.classList.replace('like-glyph', 'activated-heart');
        })
        .catch(() => {
          // Step 2 - Error: Display error modal
          errorModal.classList.remove('hidden');
          // Display server error message in the modal
          const errorMessage = document.getElementById('modal-message');
          errorMessage.textContent = 'Error: Failed to like post.';
          // Hide the modal after 3 seconds
          setTimeout(() => {
            errorModal.classList.add('hidden');
          }, 3000);
        });
    });
  });

  // Step 3: Handle click on full heart
  // We need to use event delegation since the full heart is added dynamically
  document.addEventListener('click', event => {
    if (event.target.classList.contains('activated-heart')) {
      // Change the heart back to empty
      event.target.classList.remove('activated-heart');
      event.target.classList.replace('activated-heart', 'like-glyph');
    }
  });
});





//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
