import "./HelpPage.css";

function HelpPage() {
  return (
    <div id="help-page">
      <h1>Help Page</h1>
      <p>
        Welcome to MyTube! This page answers common questions about how to use
        the site.
      </p>

      <div class="segment">
        <h2>Users</h2>

        <div class="question-container">
          <h3>How do I sign up?</h3>
          <p>
            On the right side of the navigation bar, click "Profile" to go to
            the login page. Then, click "Sign Up" at the bottom right of the
            form. Fill in the required information and then click "Sign Up" on
            the bottom left.
          </p>
        </div>

        <div class="question-container">
          <h3>How do I log in?</h3>
          <p>
            On the right side of the navigation bar, click "Profile" to go to
            the login page. Fill in the required information and then click "Log
            In".
          </p>
        </div>

        <div class="question-container">
          <h3>How do I update my account information?</h3>
          <p>
            On the right side of the navigation bar, click "Profile". Here you
            can update your name, username, or email by making any desired
            changes and clicking "Save". If you don't like the changes, click
            "Cancel" instead.
          </p>
        </div>

        <div class="question-container">
          <h3>How do I change my password?</h3>
          <p>
            On the right side of the navigation bar, click "Profile". On the
            bottom right of the profile page, click "Change Password". Fill in
            the required information and then click "Save" to apply the changes,
            or "Cancel" if you change your mind.
          </p>
        </div>

        <div class="question-container">
          <h3>How do I delete my account?</h3>
          <p>
            On the right side of the navigation bar, click "Profile". On the
            bottom left of the profile page, click "Delete Account".
          </p>
        </div>
      </div>

      <div class="segment">
        <h2>Videos</h2>

        <div class="question-container">
          <h3>What are videos for?</h3>
          <p>
            Videos are a place for you to assign notes and highlights. They are
            also a way of storing YouTube videos in a more organized way so you
            can search and find them later.
          </p>
        </div>

        <div class="question-container">
          <h3>How do I add a video?</h3>
          <p>
            On the left side of the navigation bar, click "Add Video". Fill in
            the required information and then click "Save" to add the video to
            your videos, or "Cancel" if you change your mind.
          </p>
        </div>

        <div class="question-container">
          <h3>How do I view my videos?</h3>
          <p>
            On the left side of the navigation bar, click "My Videos". This will
            take you to your videos page. Here you can search, sort, and filter
            them.
          </p>
        </div>

        <div class="question-container">
          <h3>How do I filter my videos?</h3>
          <p>
            Below the navigation bar are the search filters. On the left side,
            "Sort By" allows you to choose the order of results. In the middle,
            "Keywords or Phrases" allows you to search for videos with specific
            text in their title or description. On the right side, "Tags" allows
            you to find videos with specific tags. You can use all three filters
            together to find exactly what you are looking for.
          </p>
        </div>

        <div class="question-container">
          <h3>How do I update a video?</h3>
          <p>
            On the "My Videos" page, click on the video you want to update. On
            the bottom right of the video page, click "Update Video".
          </p>
        </div>

        <div class="question-container">
          <h3>How do I delete a video?</h3>
          <p>
            On the "My Videos" page, click on the video you want to delete. On
            the bottom right of the video page, click "Delete Video" to remove
            the video from your videos.
          </p>
        </div>
      </div>

      <div class="segment">
        <h2>Notes</h2>

        <div class="question-container">
          <h3>How do I view a note?</h3>
          <p>
            On the video page, notes are displayed below the video. Click on any
            note title to open and view it.
          </p>
        </div>

        <div class="question-container">
          <h3>How do I add a note to a video?</h3>
          <p>
            On the video page, to the right of the video, enter your title and
            description in the Note Taker, click "Save" to save the note or
            "Clear" to clear it.
          </p>
        </div>

        <div class="question-container">
          <h3>How do I update a note?</h3>
          <p>
            On the video page, below the video, find the note you want to update
            and click the title to open it. Then click "Update", make your
            changes, and save.
          </p>
        </div>

        <div class="question-container">
          <h3>How do I delete a note?</h3>
          <p>
            On the video page, below the video, find the note you want to delete
            and click the title to open it. Then click "Delete", and confirm
            delete.
          </p>
        </div>
      </div>

      <div class="segment">
        <h2>Highlights</h2>

        <div class="question-container">
          <h3>How do I add a highlight to a video?</h3>
          <p>
            On the video page, at the bottom of the Note Taker, click "Record"
            to record the video at its current time. You can either allow the
            video to play or skip to the position in the video when you want to
            end. Then click "Stop", the new name of the record button. Here you
            can enter a title, adjust the start and end times manually, and
            click "Save".
          </p>
        </div>

        <div class="question-container">
          <h3>How do I view my highlights?</h3>
          <p>
            On the video page, below the Note Taker, there is a list of the
            video highlights. If you click the timestamp on the highlight it
            will play the video highlight and pause it after the highlight ends,
            but if you manually change the video position it will cancel not
            pause at the highlight end time.
          </p>
        </div>

        <div class="question-container">
          <h3>How do I update a highlight?</h3>
          <p>
            On the video page, below the Note Taker, find the highlight you want
            to update and click "Update". Make your changes and click "Save".
          </p>
        </div>

        <div class="question-container">
          <h3>How do I delete a highlight?</h3>
          <p>
            On the video page, below the Note Taker, find the highlight you want
            to delete and click "Delete".
          </p>
        </div>
      </div>

      <p>
        We hope this guide helps you navigate and use the MyTube website
        effectively.
      </p>

      <p>Happy organizing!</p>
    </div>
  );
}

export default HelpPage;
