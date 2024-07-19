const translations = {
  en: {
    save: `Save`,
    delete: `Delete`,
    cancel: `Cancel`,

    or: `or`,
    hide: `Hide`,
    show: `Show`,
    thanks: `Thanks!`,

    note: `Note`,
    video: `Video`,
    highlight: `Highlight`,
    account: `Account`,

    you_are_all_set: `You're all set!`,
    are_you_sure: `Are you sure you don't want this?`,
    confirm_delete_of: `Confirm Delete of`,

    new_password: `New Password`,
    change_password: `Change Password`,
    current_password: `Current Password`,
    confirm_password: `Confirm New Password`,

    invalid_current_password: `Invalid current password`,
    invalid_new_password: `Must contain uppercase letter, lowercase letter, digit and symbol`,
    invalid_confirm_password: `Confirm password must match`,

    alert_video_deleted: `Your video has been successfully deleted.`,
    alert_password_reset: `Your password has been reset.`,
    alert_goodbye: `We'll be here if you need us again.`,

    help_page_title: `Help Page`,
    help_page_welcome: `Welcome to MyTube! This page answers common questions about how to use the site.`,
    help_page_users: `Users`,
    help_page_videos: `Videos`,
    help_page_notes: `Notes`,
    help_page_highlights: `Highlights`,
    help_page_guide: `We hope this guide helps you navigate and use the MyTube website effectively.`,
    help_page_happy_organizing: `Happy organizing!`,

    help_page_users_q1: `How do I sign up?`,
    help_page_users_a1: `On the right side of the navigation bar, click "Profile" to go to the login page. Then, click "Sign Up" at the bottom right of the form. Fill in the required information and then click "Sign Up" on the bottom left.`,
    help_page_users_q2: `How do I log in?`,
    help_page_users_a2: `On the right side of the navigation bar, click "Profile" to go to the login page. Fill in the required information and then click "Log In".`,
    help_page_users_q3: `How do I update my account information?`,
    help_page_users_a3: `On the right side of the navigation bar, click "Profile". Here you can update your name, username, or email by making any desired changes and clicking "Save". If you don't like the changes, click "Cancel" instead.`,
    help_page_users_q4: `How do I change my password?`,
    help_page_users_a4: `On the right side of the navigation bar, click "Profile". On the bottom right of the profile page, click "Change Password". Fill in the required information and then click "Save" to apply the changes, or "Cancel" if you change your mind.`,
    help_page_users_q5: `How do I delete my account?`,
    help_page_users_a5: `On the right side of the navigation bar, click "Profile". On the bottom left of the profile page, click "Delete Account".`,

    help_page_videos_q1: `What are videos for?`,
    help_page_videos_a1: `Videos are a place for you to assign notes and highlights. They are also a way of storing YouTube videos in a more organized way so you can search and find them later.`,
    help_page_videos_q2: `How do I add a video?`,
    help_page_videos_a2: `On the left side of the navigation bar, click "Add Video". Fill in the required information and then click "Save" to add the video to your videos, or "Cancel" if you change your mind.`,
    help_page_videos_q3: `How do I view my videos?`,
    help_page_videos_a3: `On the left side of the navigation bar, click "My Videos". This will take you to your videos page. Here you can search, sort, and filter them.`,
    help_page_videos_q4: `How do I filter my videos?`,
    help_page_videos_a4: `Below the navigation bar are the search filters. On the left side, "Sort By" allows you to choose the order of results. In the middle, "Keywords or Phrases" allows you to search for videos with specific text in their title or description. On the right side, "Tags" allows you to find videos with specific tags. You can use all three filters together to find exactly what you are looking for.`,
    help_page_videos_q5: `How do I update a video?`,
    help_page_videos_a5: `On the "My Videos" page, click on the video you want to update. On the bottom right of the video page, click "Update Video".`,
    help_page_videos_q6: `How do I delete a video?`,
    help_page_videos_a6: `On the "My Videos" page, click on the video you want to delete. On the bottom right of the video page, click "Delete Video" to remove the video from your videos.`,

    help_page_notes_q1: `How do I view a note?`,
    help_page_notes_a1: `On the video page, notes are displayed below the video. Click on any note title to open and view it.`,
    help_page_notes_q2: `How do I add a note to a video?`,
    help_page_notes_a2: `On the video page, to the right of the video, enter your title and description in the Note Taker, click "Save" to save the note or "Clear" to clear it.`,
    help_page_notes_q3: `How do I update a note?`,
    help_page_notes_a3: `On the video page, below the video, find the note you want to update and click the title to open it. Then click "Update", make your changes, and save.`,
    help_page_notes_q4: `How do I delete a note?`,
    help_page_notes_a4: `On the video page, below the video, find the note you want to delete and click the title to open it. Then click "Delete", and confirm delete.`,

    help_page_highlights_q1: `How do I add a highlight to a video?`,
    help_page_highlights_a1: `On the video page, at the bottom of the Note Taker, click "Record" to record the video at its current time. You can either allow the video to play or skip to the position in the video when you want to end. Then click "Stop", the new name of the record button. Here you can enter a title, adjust the start and end times manually, and click "Save".`,
    help_page_highlights_q2: `How do I view my highlights?`,
    help_page_highlights_a2: `On the video page, below the Note Taker, there is a list of the video highlights. If you click the timestamp on the highlight it will play the video highlight and pause it after the highlight ends, but if you manually change the video position it will cancel not pause at the highlight end time.`,
    help_page_highlights_q3: `How do I update a highlight?`,
    help_page_highlights_a3: `On the video page, below the Note Taker, find the highlight you want to update and click "Update". Make your changes and click "Save".`,
    help_page_highlights_q4: `How do I delete a highlight?`,
    help_page_highlights_a4: `On the video page, below the Note Taker, find the highlight you want to delete and click "Delete".`,
  },
};

export function getTranslation(lang) {
  return (phrase) =>
    translations[lang || "en"][phrase] || `!!PROBLEM!! ${phrase}`;
}