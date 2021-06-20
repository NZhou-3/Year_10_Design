db = firebase.firestore()
// Set "db" to firestore

firebase.auth().onAuthStateChanged((user) => {
  // Every time a user signs in / signs out
  if (user) { // If the user is signed in
    // Set status text to you are  signed in **if youare signed in**

    $('#status').html(`You are signed in with email ${user.email}.`)
    $('#signOutButton').removeClass('hidden')
    $('#signInButton').addClass('hidden')
    $('#forum').removeClass('hidden')
    $('#forum2').removeClass('hidden')

    // Turns on navbar
    document.getElementsByClassName("topnav")[0].style.display = "inline";

    loadPosts()

    var uid = user.uid;
  } else { // If the user is not signed in
    // Set status text to you are not signed in **if youare not signed in**
    $('#status').html(`You are not signed in.`)
    $('#signOutButton').addClass('hidden')
    $('#signInButton').removeClass('hidden')
    $('#forum').addClass('hidden')
    $('#forum2').addClass('hidden')

  }
});


function signIn() {
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  .then(function(result){
    document.getElementsByClassName("topnav")[0].style.display = "inline";
  });
  // enable navbar
  
}

function signOut() {
  firebase.auth().signOut()
  //disable navbar
  .then(function(result){
  document.getElementByClassName("topnav")[0].style.display = "none";
  });

}

async function newPost() {

  title = $('#formGroupExampleInput').val()
  content = $('#contentpost231290382019').val()

  await db.collection('posts').add({
    title: title,
    content: content,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(), // timestamp
    signature: firebase.auth().currentUser.displayName
  })

  window.location.reload()
}

async function loadPosts() {
  $('#posts').empty()

  query = await db.collection('posts')
  .limit(15)
  .orderBy('timestamp', 'desc')
  .get()

  for (let i = 0; i < query.docs.length; i++) {
    const doc = query.docs[i];
    
    var a = document.createElement('div');
    a.classList.add('cards')
    a.innerHTML = `
    <div class="card cards">
      <div class="card-body">
        <h5 class="card-title">${doc.data().title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${doc.data().timestamp.toDate()} written by <b>${doc.data().signature}</b></h6>
        <p class="card-text">${doc.data().content}</p>
      </div>
    </div>
    `
    $('#posts').get(0).appendChild(a)

  }

}