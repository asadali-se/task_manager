import os
import sys
from pathlib import Path

# Add the server directory to Python path
sys.path.insert(0, str(Path(__file__).parent.parent))

# Django setup
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'taskmanager.settings')

import django
django.setup()

# Run migrations
from django.core.management import call_command

def handler(event, context):
    try:
        call_command('migrate', '--no-input')
        return {
            'statusCode': 200,
            'body': 'Migrations completed successfully'
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Migration failed: {str(e)}'
        }