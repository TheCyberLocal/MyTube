from flask.cli import AppGroup
from .users import seed_users, undo_users
from .tags import seed_tags, undo_tags
from .videos import seed_videos, undo_videos
from .notes import seed_notes, undo_notes
from .highlights import seed_highlights, undo_highlights
from .video_tags import seed_video_tags, undo_video_tags

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_tags()
        undo_videos()
        undo_notes()
        undo_highlights()
        undo_video_tags()
    seed_users()
    seed_tags()
    seed_videos()
    seed_notes()
    seed_highlights()
    seed_video_tags()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_tags()
    undo_videos()
    undo_notes()
    undo_highlights()
    undo_video_tags()
    # Add other undo functions here
