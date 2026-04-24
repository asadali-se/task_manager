from django.core.wsgi import get_wsgi_application
import os
import sys
from pathlib import Path

# Add the server directory to Python path
sys.path.insert(0, str(Path(__file__).parent.parent))

# Django setup
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'taskmanager.settings')

import django
from django.conf import settings

# Override database settings from environment variables
if 'DATABASE_URL' in os.environ:
    import dj_database_url
    settings.DATABASES['default'] = dj_database_url.config(conn_max_age=600, ssl_require=True)

# Set SECRET_KEY from environment
if 'SECRET_KEY' in os.environ:
    settings.SECRET_KEY = os.environ['SECRET_KEY']

# Set DEBUG from environment
settings.DEBUG = os.environ.get('DEBUG', 'False') == 'True'

# Set ALLOWED_HOSTS for Vercel
settings.ALLOWED_HOSTS = ['*']

django.setup()

# Run migrations on startup (only once)
try:
    from django.core.management import call_command
    call_command('migrate', '--no-input', verbosity=0)
except Exception as e:
    print(f"Migration warning: {e}")

# Get the WSGI application
application = get_wsgi_application()

# Vercel-compatible handler
class VercelWSGIHandler:
    def __init__(self, app):
        self.app = app

    def __call__(self, event, context):
        # Convert Vercel event to WSGI environ
        path = event.get('path', '/')
        method = event.get('method', 'GET')
        headers = event.get('headers', {})
        query_string = event.get('query', '')

        environ = {
            'REQUEST_METHOD': method,
            'PATH_INFO': path,
            'QUERY_STRING': query_string,
            'CONTENT_TYPE': headers.get('content-type', ''),
            'CONTENT_LENGTH': headers.get('content-length', '0'),
            'SERVER_NAME': 'vercel.app',
            'SERVER_PORT': '443',
            'SERVER_PROTOCOL': 'HTTP/1.1',
            'wsgi.version': (1, 0),
            'wsgi.url_scheme': 'https',
            'wsgi.input': None,
            'wsgi.errors': None,
            'wsgi.multithread': False,
            'wsgi.multiprocess': False,
            'wsgi.run_once': False,
        }

        # Add headers to environ
        for key, value in headers.items():
            key = key.upper().replace('-', '_')
            if key not in ('CONTENT_TYPE', 'CONTENT_LENGTH'):
                environ[f'HTTP_{key}'] = value

        # Response container
        response_data = {}

        def start_response(status, headers):
            response_data['status'] = status
            response_data['headers'] = headers

        # Call the WSGI app
        response_body = self.app(environ, start_response)

        # Convert to Vercel response format
        status_code = int(response_data['status'].split()[0])
        headers_dict = dict(response_data['headers'])

        return {
            'statusCode': status_code,
            'headers': headers_dict,
            'body': b''.join(response_body).decode('utf-8')
        }

# Create the handler instance
handler_instance = VercelWSGIHandler(application)

# Vercel requires a handler function
def handler(event, context):
    return handler_instance(event, context)